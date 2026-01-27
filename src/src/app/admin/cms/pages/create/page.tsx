'use client'

import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/shared/components/ui/alert'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useToast } from '@/shared/components/ui/use-toast'

import { pageAdminCreate } from '@/client'
import { PuckEditor } from '@/features/cms/components/puck/PuckEditor'
import { useGrantedPolicies } from '@/features/permissions/hooks/useGrantedPolicies'
import { useAppConfig } from '@/shared/hooks/useAppConfig'
import { Permissions } from '@/shared/lib/utils'

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

export default function CreatePage() {
  const { can } = useGrantedPolicies()
  const { data: appConfig, isLoading: isAppConfigLoading } = useAppConfig()
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
  } = useForm<any>({
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

  const onSubmit = async (data: any) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setFormErrors({})

    try {
      // Ensure content is properly formatted
      let contentToSubmit = data.content

      if (typeof contentToSubmit === 'object') {
        // Update the root title with the page title
        contentToSubmit = {
          ...contentToSubmit,
          root: {
            ...contentToSubmit.root,
            props: {
              ...contentToSubmit.root?.props,
              title: data.title,
            },
          },
        }

        contentToSubmit = JSON.stringify(contentToSubmit)
      } else if (typeof contentToSubmit === 'string') {
      } else {
        console.warn(
          'Content is neither object nor string:',
          typeof contentToSubmit,
          contentToSubmit
        )
        // Fallback to default content
        contentToSubmit = JSON.stringify(getDefaultContent())
      }

      const apiData = {
        title: data.title,
        slug: data.slug,
        layoutName: data.layoutName || '',
        content: contentToSubmit,
        script: data.script || '',
        style: data.style || '',
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
    } catch (error: any) {
      console.error('Error creating page:', error)

      if (error.response?.data?.error?.details) {
        setFormErrors(error.response.data.error.details)
      } else if (error.response?.data?.error?.message) {
        toast({
          title: 'Error',
          description: error.response.data.error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Error',
          description: error.message || 'Failed to create page.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while app config is loading
  if (isAppConfigLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
            <p className="text-muted-foreground">Checking permissions...</p>
          </div>
        </div>
      </div>
    )
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
              } catch (error) {
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
