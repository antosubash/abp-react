'use client'
import { CreatePageInputDtoReadable, pageAdminCreate } from '@/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
    formState: { errors },
  } = useForm<CreatePageInputDtoReadable>()

  const onSubmit = async (data: CreatePageInputDtoReadable) => {
    if (!can('CmsKit.Pages.Create')) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to create pages.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await pageAdminCreate({
        body: data,
      })
      console.log(response)
      if (response.error) {
        toast({
          title: 'Error',
          description: response.error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Success',
          description: 'Page Created Successfully',
          variant: 'default',
        })
        queryClient.invalidateQueries({ queryKey: [QueryNames.GetPages] })
        setFormErrors({}) // Clear any previous form errors
        router.push('/admin/cms')
      }
    } catch (err: unknown) {
      console.error('Page creation error:', err)

      // Handle different types of errors
      if (err && typeof err === 'object' && 'error' in err) {
        const errorData = err as any
        if (errorData.error?.details) {
          // Set form errors for validation
          setFormErrors(errorData.error.details)

          // Display validation errors
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
          // Display general error message
          toast({
            title: 'Error',
            description: errorData.error.message,
            variant: 'destructive',
          })
        } else {
          // Fallback error message
          toast({
            title: 'Failed',
            description: 'Page creation failed. Please check your input and try again.',
            variant: 'destructive',
          })
        }
      } else if (err instanceof Error) {
        // Handle standard Error objects
        toast({
          title: 'Error',
          description: err.message,
          variant: 'destructive',
        })
      } else {
        // Generic error fallback
        toast({
          title: 'Failed',
          description: 'Page creation failed. Please try again.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!can('CmsKit.Pages.Create')) {
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
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push('/admin/cms')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to CMS
        </Button>
        <h1 className="text-3xl font-bold">Create New Page</h1>
        <p className="text-muted-foreground">Add a new page to your website</p>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* General error display */}
          {Object.keys(formErrors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
              <ul className="mt-2 text-sm text-red-700">
                {Object.entries(formErrors).map(([field, messages]) => (
                  <li key={field}>
                    <strong>{field}:</strong>{' '}
                    {Array.isArray(messages) ? messages.join(', ') : messages}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                required
                {...register('title', {
                  required: 'Title is required',
                  minLength: { value: 1, message: 'Title must be at least 1 character' },
                })}
                placeholder="Enter page title"
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
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
                })}
                placeholder="page-slug"
              />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
              {formErrors.slug && (
                <p className="text-sm text-red-500">
                  {Array.isArray(formErrors.slug) ? formErrors.slug.join(', ') : formErrors.slug}
                </p>
              )}
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

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...register('content')}
              placeholder="Enter page content (HTML supported)"
              rows={12}
              className="font-mono text-sm"
            />
            {formErrors.content && (
              <p className="text-sm text-red-500">
                {Array.isArray(formErrors.content)
                  ? formErrors.content.join(', ')
                  : formErrors.content}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              You can use HTML tags for formatting. The content will be rendered as HTML.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="script">JavaScript</Label>
              <Textarea
                id="script"
                {...register('script')}
                placeholder="JavaScript code (optional)"
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">Custom JavaScript for this page</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">CSS Styles</Label>
              <Textarea
                id="style"
                {...register('style')}
                placeholder="CSS styles (optional)"
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">Custom CSS styles for this page</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/cms')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Creating...' : 'Create Page'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
