'use client'
import { CreatePageInputDtoReadable, pageAdminCreate } from '@/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type AddPageProps = {
  onDismiss?: () => void
}

export const AddPage = ({ onDismiss }: AddPageProps) => {
  const { can } = useGrantedPolicies()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { handleSubmit, register, reset, formState: { errors } } = useForm<CreatePageInputDtoReadable>()

  const onSubmit = async (data: CreatePageInputDtoReadable) => {
    try {
      await pageAdminCreate({
        body: data,
      })
      toast({
        title: 'Success',
        description: 'Page Created Successfully',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetPages] })
      setOpen(false)
      reset()
      onDismiss?.()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Page creation wasn't successful.",
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <section className="p-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <section className="flex items-center justify-between pb-5">
          <h3 className="title m-1 grow truncate p-0 text-xl font-bold">Page Management</h3>
          {can('CmsKit.Pages.Create') && (
            <Button onClick={() => setOpen(true)}>
              <Plus width={18} height={18} />
              <span className="hidden truncate sm:inline">Create New Page</span>
            </Button>
          )}
        </section>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create a New Page</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex w-full flex-col space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title"
                  required 
                  {...register('title', { required: 'Title is required' })} 
                  placeholder="Page title" 
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input 
                  id="slug"
                  required 
                  {...register('slug', { required: 'Slug is required' })} 
                  placeholder="page-slug" 
                />
                {errors.slug && (
                  <p className="text-sm text-red-500">{errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="layoutName">Layout Name</Label>
                <Input 
                  id="layoutName"
                  {...register('layoutName')} 
                  placeholder="Layout name (optional)" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content"
                  {...register('content')} 
                  placeholder="Page content (HTML)" 
                  rows={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="script">Script</Label>
                <Textarea 
                  id="script"
                  {...register('script')} 
                  placeholder="JavaScript code (optional)" 
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Style</Label>
                <Textarea 
                  id="style"
                  {...register('style')} 
                  placeholder="CSS styles (optional)" 
                  rows={4}
                />
              </div>
            </section>
            <DialogFooter className="mt-5">
              <Button
                type="button"
                variant="outline"
                onClick={(e: { preventDefault: () => void }) => {
                  e.preventDefault()
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
} 