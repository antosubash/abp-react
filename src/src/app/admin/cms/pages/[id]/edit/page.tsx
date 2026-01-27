'use client'
import { pageAdminUpdate, UpdatePageInputDto, VoloCmsKitAdminPagesPageDto } from '@/client'
import { PuckEditor } from '@/features/cms/components/puck/PuckEditor'
import { htmlToPuckData, isPuckData } from '@/features/cms/components/puck/utils'
import { usePage } from '@/features/cms/hooks/usePages'
import { useGrantedPolicies } from '@/features/permissions/hooks/useGrantedPolicies'
import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Error,
  Input,
  Label,
  useToast,
} from '@/shared/components/ui'
import { QueryNames } from '@/shared/hooks/QueryConstants'
import { Permissions } from '@/shared/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Clock, Eye, RefreshCw, Save } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

// Auto-slug generation utility
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-|-$/g, '')
}

export default function EditPage() {
  const { can } = useGrantedPolicies()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const params = useParams()
  const pageId = params.id as string

  // Force re-render when pageId changes
  const key = `edit-page-${pageId}`
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isFormLoaded, setIsFormLoaded] = useState(false)

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<any>({
    defaultValues: {
      title: '',
      slug: '',
      layoutName: '',
      content: '',
      script: '',
      style: '',
      concurrencyStamp: '',
    },
  })

  const { data: page, isLoading, isError, error, refetch } = usePage(pageId)
  const watchedTitle = watch('title')
  const watchedSlug = watch('slug')

  // Reset form loaded state when pageId changes
  useEffect(() => {
    setIsFormLoaded(false)
  }, [pageId])

  // Auto-generate slug from title (only if slug is empty or matches old title)
  useEffect(() => {
    if (
      watchedTitle &&
      page &&
      (!watchedSlug ||
        watchedSlug === generateSlug((page as VoloCmsKitAdminPagesPageDto).title || ''))
    ) {
      const generatedSlug = generateSlug(watchedTitle)
      setValue('slug', generatedSlug)
    }
  }, [watchedTitle, watchedSlug, page, setValue])

  // Track unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(isDirty)
  }, [isDirty])

  // Load page data into form
  useEffect(() => {
    if (page) {
      const pageData = page as VoloCmsKitAdminPagesPageDto

      // Convert content to Puck data if it's HTML
      let puckContent: any = pageData.content

      if (typeof pageData.content === 'string') {
        try {
          // Try to parse as JSON first
          const parsed = JSON.parse(pageData.content)
          if (isPuckData(parsed)) {
            puckContent = parsed
          } else {
            // Convert HTML to Puck data
            puckContent = htmlToPuckData(pageData.content)
          }
        } catch (error) {
          // If not JSON, convert HTML to Puck data
          puckContent = htmlToPuckData(pageData.content)
        }
      } else if (pageData.content && typeof pageData.content === 'object') {
        // If it's already an object, ensure it's properly formatted
        puckContent = isPuckData(pageData.content)
          ? pageData.content
          : {
              content: [],
              root: { props: { title: pageData.title || 'New Page' } },
              zones: {},
            }
      } else {
        // Default empty Puck data with welcome block
        puckContent = {
          content: [],
          root: { props: { title: pageData.title || 'New Page' } },
          zones: {},
        }
      }

      // Ensure content is a string for the form
      const contentString =
        typeof puckContent === 'string' ? puckContent : JSON.stringify(puckContent)

      reset({
        title: pageData.title || '',
        slug: pageData.slug || '',
        layoutName: pageData.layoutName || '',
        content: contentString,
        script: pageData.script || '',
        style: pageData.style || '',
        concurrencyStamp: pageData.concurrencyStamp || '',
      })
      setIsFormLoaded(true)
    }
  }, [page, reset])

  // Save draft to localStorage
  const saveDraft = useCallback(() => {
    const formData = watch()
    localStorage.setItem(`page-draft-${pageId}`, JSON.stringify(formData))
    toast({
      title: 'Draft Saved',
      description: 'Your changes have been saved as a draft.',
      variant: 'default',
    })
  }, [watch, pageId, toast])

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem(`page-draft-${pageId}`)
    if (savedDraft && !page) {
      try {
        const draftData = JSON.parse(savedDraft)
        Object.entries(draftData).forEach(([key, value]) => {
          if (key in draftData && value !== undefined) {
            setValue(key as keyof UpdatePageInputDto, value as any)
          }
        })
        toast({
          title: 'Draft Loaded',
          description: 'Your previous draft has been loaded.',
          variant: 'default',
        })
      } catch (error) {
        console.error('Error loading draft:', error)
      }
    }
  }, [setValue, pageId, page, toast])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (hasUnsavedChanges) {
          saveDraft()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [hasUnsavedChanges, saveDraft])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  const onSubmit = async (data: any) => {
    if (!can(Permissions.CMSKIT_PAGES_UPDATE)) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to update pages.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const apiData = { ...data }
      await pageAdminUpdate({
        path: { id: pageId },
        body: apiData,
      })
      toast({
        title: 'Success',
        description: 'Page Updated Successfully',
        variant: 'default',
      })
      // Invalidate both the specific page and the pages list
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetPage, pageId] })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetPages] })
      localStorage.removeItem(`page-draft-${pageId}`) // Clear draft after successful save

      // Remove the redirect - stay on the current page
      // router.push('/admin/cms')
    } catch (err: unknown) {
      console.error('Page update error:', err)

      if (err && typeof err === 'object' && 'error' in err) {
        const errorData = err as any
        if (errorData.error?.details) {
          setFormErrors(errorData.error.details)
          const errorMessages = Object.entries(errorData.error.details)
            .map(
              ([field, messages]) =>
                `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
            )
            .join('\n')

          toast({
            title: 'Validation Error',
            description: errorMessages,
            variant: 'destructive',
          })
        } else if (errorData.error?.message) {
          toast({
            title: 'Error',
            description: errorData.error.message,
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Failed',
            description: 'Page update failed. Please check your input and try again.',
            variant: 'destructive',
          })
        }
      } else if (err instanceof Error) {
        toast({
          title: 'Error',
          description: (err as Error).message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Failed',
          description: 'Page update failed. Please try again.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading page data...</p>
          <p className="text-sm text-muted-foreground mt-2">Page ID: {pageId}</p>
        </div>
      </div>
    )
  }
  if (isError) {
    console.error('Page loading error:', error)
    return <Error />
  }

  if (!page && !isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you are looking for doesn&apos;t exist or failed to load.
            </p>
            <div className="flex gap-2 justify-center mt-4">
              <Button onClick={() => router.push('/admin/cms')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to CMS
              </Button>
              <Button variant="outline" onClick={() => refetch()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!can(Permissions.CMSKIT_PAGES_UPDATE)) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You do not have permission to update pages.</p>
            <Button onClick={() => router.push('/admin/cms')} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to CMS
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div key={key} className="min-h-screen w-full bg-background">
      {/* Simple Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/admin/cms')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Edit Page</h1>
              <p className="text-sm text-muted-foreground">Visual page builder</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Unsaved Changes
              </Badge>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                refetch()
              }}
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {isLoading ? 'Loading...' : 'Refresh'}
            </Button>

            {page && (page as VoloCmsKitAdminPagesPageDto).slug && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const slug = (page as VoloCmsKitAdminPagesPageDto).slug
                  if (slug) {
                    window.open(`/pages/${slug}`, '_blank')
                  }
                }}
                disabled={!page || !(page as VoloCmsKitAdminPagesPageDto).slug}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Page
              </Button>
            )}

            <Button size="sm" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="border-b bg-background p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                required
                {...register('title', {
                  required: 'Title is required',
                  minLength: { value: 1, message: 'Title must be at least 1 character' },
                  maxLength: {
                    value: 200,
                    message: 'Title must be less than 200 characters',
                  },
                })}
                placeholder="Enter page title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message?.toString()}</p>
              )}
              {formErrors.title && (
                <p className="text-sm text-red-500">
                  {Array.isArray(formErrors.title) ? formErrors.title.join(', ') : formErrors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                required
                {...register('slug', {
                  required: 'Slug is required',
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: 'Slug can only contain lowercase letters, numbers, and hyphens',
                  },
                  minLength: { value: 1, message: 'Slug must be at least 1 character' },
                  maxLength: { value: 100, message: 'Slug must be less than 100 characters' },
                })}
                placeholder="page-slug"
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message?.toString()}</p>
              )}
              {formErrors.slug && (
                <p className="text-sm text-red-500">
                  {Array.isArray(formErrors.slug) ? formErrors.slug.join(', ') : formErrors.slug}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Auto-generated from title. You can customize it.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="layoutName">Layout Name</Label>
            <Input
              id="layoutName"
              {...register('layoutName')}
              placeholder="Layout name (optional)"
            />
            {formErrors.layoutName && (
              <p className="text-sm text-red-500">
                {Array.isArray(formErrors.layoutName)
                  ? formErrors.layoutName.join(', ')
                  : formErrors.layoutName}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Specify a custom layout template for this page
            </p>
          </div>

          {/* General error display */}
          {Object.keys(formErrors).length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>Please fix the errors above before submitting.</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Main Content - Puck Editor */}
      <div className="w-full">
        <Controller
          name="content"
          control={control}
          render={({ field }) => {
            if (!isFormLoaded) {
              return (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading page content...</p>
                  </div>
                </div>
              )
            }

            // Ensure we pass proper Puck data structure to the editor
            let puckData = field.value
            if (typeof field.value === 'string') {
              try {
                puckData = JSON.parse(field.value)
              } catch (error) {
                console.warn('Failed to parse content as JSON, using default')
                puckData = {
                  content: [],
                  root: { props: { title: 'New Page' } },
                  zones: {},
                }
              }
            }

            const contentKey = field.value ? JSON.stringify(field.value).slice(0, 50) : 'empty'
            return (
              <PuckEditor
                key={`puck-editor-${contentKey}`} // Force re-render when content changes
                data={puckData}
                onChange={(newData) => {
                  // Store as JSON string in the form
                  const dataToStore =
                    typeof newData === 'string' ? newData : JSON.stringify(newData)
                  field.onChange(dataToStore)
                }}
              />
            )
          }}
        />
      </div>
    </div>
  )
}
