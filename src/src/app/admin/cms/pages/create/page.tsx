'use client'
import { CreatePageInputDto, pageAdminCreate } from '@/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { Permissions } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Edit3, 
  Settings, 
  FileText, 
  Code, 
  Palette,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'

// Rich text editor component
const RichTextEditor = ({ value, onChange, placeholder }: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) => {
  const [isPreview, setIsPreview] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'b' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      const textarea = e.target as HTMLTextAreaElement
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = value
      const before = text.substring(0, start)
      const selected = text.substring(start, end)
      const after = text.substring(end)
      onChange(before + `<strong>${selected}</strong>` + after)
    }
  }

  if (isPreview) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Content Preview</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsPreview(false)}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
        <div 
          className="border rounded-md p-4 min-h-[300px] bg-background"
          dangerouslySetInnerHTML={{ __html: value || '<p class="text-muted-foreground">No content to preview</p>' }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Content</Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const textarea = document.getElementById('content') as HTMLTextAreaElement
              if (textarea) {
                const start = textarea.selectionStart
                const end = textarea.selectionEnd
                const text = value
                const before = text.substring(0, start)
                const selected = text.substring(start, end)
                const after = text.substring(end)
                onChange(before + `<strong>${selected}</strong>` + after)
              }
            }}
            className="text-xs"
          >
            <strong>B</strong>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsPreview(true)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>
      <Textarea
        id="content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Enter page content (HTML supported)"}
        rows={12}
        className="font-mono text-sm"
      />
      <p className="text-sm text-muted-foreground">
        Use HTML tags for formatting. Ctrl+B to bold selected text.
      </p>
    </div>
  )
}

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

export default function CreatePage() {
  const { can } = useGrantedPolicies()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const [activeTab, setActiveTab] = useState('content')
  const [isPublished, setIsPublished] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<CreatePageInputDto>({
    defaultValues: {
      title: '',
      slug: '',
      layoutName: '',
      content: '',
      script: '',
      style: '',
    }
  })

  const watchedTitle = watch('title')
  const watchedSlug = watch('slug')

  // Auto-generate slug from title
  useEffect(() => {
    if (watchedTitle && !watchedSlug) {
      const generatedSlug = generateSlug(watchedTitle)
      setValue('slug', generatedSlug)
    }
  }, [watchedTitle, watchedSlug, setValue])

  // Track unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(isDirty)
  }, [isDirty])

  // Save draft to localStorage
  const saveDraft = useCallback(() => {
    const formData = watch()
    localStorage.setItem('page-draft', JSON.stringify(formData))
    toast({
      title: 'Draft Saved',
      description: 'Your changes have been saved as a draft.',
      variant: 'default',
    })
  }, [watch, toast])

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('page-draft')
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft)
        Object.entries(draftData).forEach(([key, value]) => {
          if (key in draftData && value !== undefined) {
            setValue(key as keyof CreatePageInputDto, value as any)
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
  }, [setValue, toast])

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

  const onSubmit = async (data: CreatePageInputDto) => {
    if (!can(Permissions.CMSKIT_PAGES_CREATE)) {
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

      if (response.error) {
        toast({
          title: 'Error',
          description: response.error.toString(),
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Success',
          description: `Page ${isPublished ? 'Published' : 'Created'} Successfully`,
          variant: 'default',
        })
        queryClient.invalidateQueries({ queryKey: [QueryNames.GetPages] })
        setFormErrors({})
        localStorage.removeItem('page-draft') // Clear draft after successful save
        router.push('/admin/cms')
      }
    } catch (err: unknown) {
      console.error('Page creation error:', err)

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
            description: 'Page creation failed. Please check your input and try again.',
            variant: 'destructive',
          })
        }
      } else if (err instanceof Error) {
        toast({
          title: 'Error',
          description: err.message,
          variant: 'destructive',
        })
      } else {
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
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={() => router.push('/admin/cms')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CMS
          </Button>
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Unsaved Changes
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={saveDraft}
              disabled={!hasUnsavedChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create New Page</h1>
            <p className="text-muted-foreground">Add a new page to your website</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="publish-status"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
              <Label htmlFor="publish-status">
                {isPublished ? 'Published' : 'Draft'}
              </Label>
            </div>
            <Badge variant={isPublished ? 'default' : 'secondary'}>
              {isPublished ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Published
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3 mr-1" />
                  Draft
                </>
              )}
            </Badge>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Alert */}
      {hasUnsavedChanges && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You have unsaved changes. Press Ctrl+S to save as draft, or submit the form to publish.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Advanced
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Information</CardTitle>
                <CardDescription>Basic page details and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* General error display */}
                {Object.keys(formErrors).length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <ul className="mt-2 space-y-1">
                        {Object.entries(formErrors).map(([field, messages]) => (
                          <li key={field}>
                            <strong>{field}:</strong>{' '}
                            {Array.isArray(messages) ? messages.join(', ') : messages}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
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
                        maxLength: { value: 200, message: 'Title must be less than 200 characters' },
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
                        minLength: { value: 1, message: 'Slug must be at least 1 character' },
                        maxLength: { value: 100, message: 'Slug must be less than 100 characters' },
                      })}
                      placeholder="page-slug"
                    />
                    {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
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

                <Separator />

                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder="Enter page content (HTML supported)"
                    />
                  )}
                />
                {formErrors.content && (
                  <p className="text-sm text-red-500">
                    {Array.isArray(formErrors.content)
                      ? formErrors.content.join(', ')
                      : formErrors.content}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>



          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Custom JavaScript and CSS for this page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="script">JavaScript</Label>
                    <Textarea
                      id="script"
                      {...register('script')}
                      placeholder="JavaScript code (optional)"
                      rows={8}
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
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <p className="text-sm text-muted-foreground">Custom CSS styles for this page</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Preview</CardTitle>
                <CardDescription>See how your page will look when published</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-background">
                  <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-2">{watchedTitle || 'Page Title'}</h1>
                    <p className="text-sm text-muted-foreground">
                      Slug: /{watchedSlug || 'page-slug'}
                    </p>
                  </div>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: (watch('content') || '') || '<p class="text-muted-foreground">No content to preview</p>' 
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t mt-6">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/cms')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={saveDraft}
              disabled={!hasUnsavedChanges || isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting 
              ? 'Creating...' 
              : isPublished 
                ? 'Publish Page' 
                : 'Create Page'
            }
          </Button>
        </div>
      </form>
    </div>
  )
}
