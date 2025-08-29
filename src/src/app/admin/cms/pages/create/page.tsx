'use client'

import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { pageAdminCreate } from '@/client'
import { PuckEditor } from '@/components/puck/PuckEditor'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { Permissions } from '@/lib/utils'

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Default content structure for new pages
const getDefaultContent = () => ({
  content: [],
  root: {
    props: {
      title: 'New Page',
    },
  },
  zones: {},
})

// Define proper types
interface PageFormData {
  title: string
  slug: string
  layoutName: string
  content: Record<string, unknown>
  script: string
  style: string
}

interface ApiError {
  error?: {
    details?: Record<string, string[]>
    message?: string
  }
}

export default function CreatePage() {
  const { can } = useGrantedPolicies()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<PageFormData>({
    defaultValues: {
      title: '',
      slug: '',
      layoutName: '',
      content: getDefaultContent(),
      script: '',
      style: '',
    },
  })

  const watchedTitle = watch('title')
  const watchedSlug = watch('slug')

  // Auto-generate slug from title
  if (watchedTitle && !watchedSlug) {
    const generatedSlug = generateSlug(watchedTitle)
    setValue('slug', generatedSlug)
  }

  const onSubmit = async (data: PageFormData) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setFormErrors({})

    try {
      // Ensure content is properly formatted
      let contentToSubmit: string

      if (typeof data.content === 'object' && data.content !== null) {
        // Update the root title with the page title
        const updatedContent = {
          ...data.content,
          root: {
            ...(data.content.root as Record<string, unknown>),
            props: {
              ...((data.content.root as Record<string, unknown>)?.props as Record<string, unknown>),
              title: data.title,
            },
          },
        }

        contentToSubmit = JSON.stringify(updatedContent)
      } else {
        console.warn('Content is not an object:', typeof data.content, data.content)
        // Fallback to default content
        contentToSubmit = JSON.stringify(getDefaultContent())
      }

      const apiData = {
        title: data.title,
        slug: data.slug,
        layoutName: data.layoutName || null,
        content: contentToSubmit,
        script: data.script || null,
        style: data.style || null,
      }

      await pageAdminCreate({
        body: apiData,
      })

      toast({
        title: 'Success',
        description: 'Page created successfully.',
        variant: 'default',
      })

      // Invalidate and refetch pages list
      queryClient.invalidateQueries({ queryKey: ['pages'] })

      // Remove the redirect - stay on the current page
      // router.push('/admin/cms/pages')
    } catch (error: unknown) {
      console.error('Error creating page:', error)
      setFormErrors({})

      if (error && typeof error === 'object' && 'error' in error) {
        const errorData = error as ApiError
        if (errorData.error?.details) {
          setFormErrors(errorData.error.details)
        }
      }

      toast({
        title: 'Error',
        description: 'Failed to create page. Please check your input and try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!can(Permissions.CMSKIT_PAGES_CREATE)) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You do not have permission to create pages.</p>
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
    <div className="min-h-screen w-full bg-background">
      {/* Simple Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/admin/cms/pages')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pages
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Create New Page</h1>
              <p className="text-sm text-muted-foreground">Visual page builder</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Creating...' : 'Create Page'}
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
                  maxLength: {
                    value: 100,
                    message: 'Slug must be less than 100 characters',
                  },
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
            // Ensure we pass proper Puck data structure to the editor
            let puckData = field.value
            if (typeof field.value === 'string') {
              try {
                puckData = JSON.parse(field.value)
              } catch (_error) {
                console.warn('Failed to parse content as JSON, using default')
                puckData = getDefaultContent()
              }
            }

            return (
              <PuckEditor
                data={puckData}
                onChange={(newData) => {
                  // Store as JSON string in the form
                  const dataToStore =
                    typeof newData === 'string' ? newData : JSON.stringify(newData)
                  field.onChange(dataToStore)
                }}
                onSave={(data) => {
                  const dataToStore = typeof data === 'string' ? data : JSON.stringify(data)
                  field.onChange(dataToStore)
                  handleSubmit(onSubmit)()
                }}
              />
            )
          }}
        />
      </div>
    </div>
  )
}
