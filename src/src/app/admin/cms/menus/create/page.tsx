'use client'
import { menuItemAdminCreate, MenuItemCreateInput } from '@/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { useMenuItems } from '@/lib/hooks/useMenuItems'
import { useQueryClient } from '@tanstack/react-query'
import { 
  ArrowLeft, 
  Save, 
  AlertCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CreateMenuItem() {
  const { can } = useGrantedPolicies()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MenuItemCreateInput>({
    defaultValues: {
      displayName: '',
      url: '',
      icon: '',
      order: 0,
      isActive: true,
      target: '_self',
      elementId: '',
      cssClass: '',
      pageId: '',
      requiredPermissionName: '',
    }
  })

  const watchedDisplayName = watch('displayName')
  
  // Fetch all menu items for parent selection
  const { data: menuItems } = useMenuItems(0, 1000)

  const onSubmit = async (data: MenuItemCreateInput) => {
    setIsSubmitting(true)
    try {
      await menuItemAdminCreate({
        body: data,
      })
      toast({
        title: 'Success',
        description: 'Menu Item Created Successfully',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetMenuItems] })
      router.push('/admin/cms/menus')
    } catch (err: unknown) {
      console.error('Menu item creation error:', err)

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
            description: 'Menu item creation failed. Please check your input and try again.',
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
          description: 'Menu item creation failed. Please try again.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push('/admin/cms/menus')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu Items
        </Button>
        <div className="mt-4">
          <h1 className="text-3xl font-bold">Create Menu Item</h1>
          <p className="text-muted-foreground">Add a new menu item to your website</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Menu Item Information</CardTitle>
            <CardDescription>Basic menu item details and settings</CardDescription>
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
                <Label htmlFor="displayName">Display Name *</Label>
                <Input
                  id="displayName"
                  required
                  {...register('displayName', {
                    required: 'Display name is required',
                    minLength: { value: 1, message: 'Display name must be at least 1 character' },
                    maxLength: { value: 200, message: 'Display name must be less than 200 characters' },
                  })}
                  placeholder="Enter menu item name"
                />
                {errors.displayName && <p className="text-sm text-red-500">{errors.displayName.message}</p>}
                {formErrors.displayName && (
                  <p className="text-sm text-red-500">
                    {Array.isArray(formErrors.displayName) ? formErrors.displayName.join(', ') : formErrors.displayName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  {...register('url')}
                  placeholder="https://example.com"
                />
                {formErrors.url && (
                  <p className="text-sm text-red-500">
                    {Array.isArray(formErrors.url) ? formErrors.url.join(', ') : formErrors.url}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Leave empty if linking to a page
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentId">Parent Menu Item</Label>
              <Select onValueChange={(value) => setValue('parentId', value === 'none' ? null : value)} defaultValue="none">
                <SelectTrigger>
                  <SelectValue placeholder="Select parent menu item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Parent (Top Level)</SelectItem>
                  {menuItems?.items?.map((item) => (
                    <SelectItem key={item.id} value={item.id || ''}>
                      {item.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.parentId && (
                <p className="text-sm text-red-500">
                  {Array.isArray(formErrors.parentId) ? formErrors.parentId.join(', ') : formErrors.parentId}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Select a parent menu item to create a submenu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  {...register('icon')}
                  placeholder="home, user, settings"
                />
                {formErrors.icon && (
                  <p className="text-sm text-red-500">
                    {Array.isArray(formErrors.icon) ? formErrors.icon.join(', ') : formErrors.icon}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Icon name (optional)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  {...register('order', { valueAsNumber: true })}
                  placeholder="0"
                />
                {formErrors.order && (
                  <p className="text-sm text-red-500">
                    {Array.isArray(formErrors.order) ? formErrors.order.join(', ') : formErrors.order}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Display order (lower numbers appear first)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="target">Target</Label>
                <Select onValueChange={(value) => setValue('target', value)} defaultValue="_self">
                  <SelectTrigger>
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Same Window</SelectItem>
                    <SelectItem value="_blank">New Window</SelectItem>
                    <SelectItem value="_parent">Parent Frame</SelectItem>
                    <SelectItem value="_top">Top Frame</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.target && (
                  <p className="text-sm text-red-500">
                    {Array.isArray(formErrors.target) ? formErrors.target.join(', ') : formErrors.target}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cssClass">CSS Class</Label>
                <Input
                  id="cssClass"
                  {...register('cssClass')}
                  placeholder="custom-menu-item"
                />
                {formErrors.cssClass && (
                  <p className="text-sm text-red-500">
                    {Array.isArray(formErrors.cssClass) ? formErrors.cssClass.join(', ') : formErrors.cssClass}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Additional CSS classes
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="elementId">Element ID</Label>
              <Input
                id="elementId"
                {...register('elementId')}
                placeholder="menu-item-1"
              />
              {formErrors.elementId && (
                <p className="text-sm text-red-500">
                  {Array.isArray(formErrors.elementId) ? formErrors.elementId.join(', ') : formErrors.elementId}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                HTML element ID (optional)
              </p>
            </div>

                          <div className="space-y-2">
                <Label htmlFor="requiredPermissionName">Required Permission</Label>
                <Input
                  id="requiredPermissionName"
                  {...register('requiredPermissionName')}
                  placeholder="Permissions.CMSKIT_PAGES_CREATE"
                />
              {formErrors.requiredPermissionName && (
                <p className="text-sm text-red-500">
                  {Array.isArray(formErrors.requiredPermissionName) ? formErrors.requiredPermissionName.join(', ') : formErrors.requiredPermissionName}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Permission required to see this menu item
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={watch('isActive')}
                onCheckedChange={(checked) => setValue('isActive', checked)}
              />
              <Label htmlFor="isActive">Active</Label>
              <p className="text-sm text-muted-foreground ml-2">
                Whether this menu item is visible
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/cms/menus')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Creating...' : 'Create Menu Item'}
          </Button>
        </div>
      </form>
    </div>
  )
} 