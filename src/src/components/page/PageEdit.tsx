'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  pageAdminUpdate,
  type UpdatePageInputDto,
  type VoloCmsKitAdminPagesPageDto,
} from '@/client'
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

export type PageEditProps = {
  pageId: string
  pageDto: VoloCmsKitAdminPagesPageDto
  onDismiss?: () => void
}

export const PageEdit = ({ pageId, pageDto, onDismiss }: PageEditProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UpdatePageInputDto>()

  useEffect(() => {
    if (pageDto) {
      reset({
        title: pageDto.title || '',
        slug: pageDto.slug || '',
        layoutName: pageDto.layoutName,
        content: pageDto.content,
        script: pageDto.script,
        style: pageDto.style,
        concurrencyStamp: pageDto.concurrencyStamp,
      })
    }
  }, [pageDto, reset])

  const onSubmit = async (data: UpdatePageInputDto) => {
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
      onDismiss?.()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: 'Page update wasn&apos;t successful.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => onDismiss?.()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Page</DialogTitle>
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
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                required
                {...register('slug', { required: 'Slug is required' })}
                placeholder="page-slug"
              />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
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
            <Button type="button" variant="outline" onClick={() => onDismiss?.()}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
