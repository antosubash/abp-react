'use client'
import { VoloCmsKitAdminPagesPageDtoReadable, pageAdminUpdate, UpdatePageInputDtoWritable } from '@/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { usePage } from '@/lib/hooks/usePages'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'
import Loader from '@/components/ui/Loader'
import Error from '@/components/ui/Error'

export default function EditPage() {
  const { can } = useGrantedPolicies()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const params = useParams()
  const pageId = params.id as string
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<UpdatePageInputDtoWritable>()

  const { data: page, isLoading, isError } = usePage(pageId)

  useEffect(() => {
    if (page) {
      const pageData = page as VoloCmsKitAdminPagesPageDtoReadable
      reset({
        title: pageData.title || '',
        slug: pageData.slug || '',
        layoutName: pageData.layoutName,
        content: pageData.content,
        script: pageData.script,
        style: pageData.style,
        concurrencyStamp: pageData.concurrencyStamp,
      })
    }
  }, [page, reset])

  const onSubmit = async (data: UpdatePageInputDtoWritable) => {
    if (!can('CmsKit.Pages.Update')) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to update pages.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await pageAdminUpdate({
        path: { id: pageId },
        body: data,
      })
      toast({
        title: 'Success',
        description: 'Page Updated Successfully',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetPages] })
      router.push('/admin/cms')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Page update wasn't successful.",
          variant: 'destructive',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <Loader />
  if (isError) return <Error />

  if (!page) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">The page you are looking for doesn&apos;t exist.</p>
            <Button 
              onClick={() => router.push('/admin/cms')}
              className="mt-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to CMS
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!can('CmsKit.Pages.Update')) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You do not have permission to update pages.</p>
            <Button 
              onClick={() => router.push('/admin/cms')}
              className="mt-4"
            >
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
        <Button 
          variant="ghost" 
          onClick={() => router.push('/admin/cms')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to CMS
        </Button>
        <h1 className="text-3xl font-bold">Edit Page</h1>
        <p className="text-muted-foreground">Update page content and settings</p>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title"
                required 
                {...register('title', { 
                  required: 'Title is required',
                  minLength: { value: 1, message: 'Title must be at least 1 character' }
                })} 
                placeholder="Enter page title" 
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
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
                    message: 'Slug can only contain lowercase letters, numbers, and hyphens' 
                  }
                })} 
                placeholder="page-slug" 
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message}</p>
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
              <p className="text-sm text-muted-foreground">
                Custom JavaScript for this page
              </p>
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
              <p className="text-sm text-muted-foreground">
                Custom CSS styles for this page
              </p>
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
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 