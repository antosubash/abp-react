import { commentPublicUpdate, CommentWithAuthorDto, UpdateCommentInput } from '@/client'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

type CommentEditProps = {
  commentDto: CommentWithAuthorDto
  commentId: string
  onDismiss: () => void
}
export const CommentEdit = ({ commentDto, commentId, onDismiss }: CommentEditProps) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { handleSubmit, register } = useForm()

  const onSubmit = async (data: unknown) => {
    const comment = data as UpdateCommentInput
    try {
      await commentPublicUpdate({
        path: { id: commentId },
        body: comment,
      })
      toast({
        title: 'Success',
        description: 'Comment Updated Successfully',
        variant: 'default',
      })
      onCloseEvent()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Comment update wasn't successful.",
          variant: 'destructive',
        })
      }
    }
  }

  const onCloseEvent = () => {
    setOpen(false)
    onDismiss()
  }

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Dialog open={open} onOpenChange={onCloseEvent}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Comment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="flex flex-col space-y-5">
            <Textarea
              required
              placeholder="Comment text"
              defaultValue={commentDto.text ?? ''}
              {...register('text')}
              rows={4}
            />
          </section>

          <DialogFooter className="mt-5">
            <Button
              onClick={(e: { preventDefault: () => void }) => {
                e.preventDefault()
                onCloseEvent()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
