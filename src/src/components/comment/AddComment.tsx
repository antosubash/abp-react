'use client'
import { CreateCommentInputReadable, commentPublicCreate } from '@/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type AddCommentProps = {
  entityType: string
  entityId: string
}

export const AddComment = ({ entityType, entityId }: AddCommentProps) => {
  const { can } = useGrantedPolicies()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { handleSubmit, register, reset } = useForm()

  const onSubmit = async (data: any) => {
    const comment = data as CreateCommentInputReadable
    comment.idempotencyToken = crypto.randomUUID()

    try {
      await commentPublicCreate({
        path: { entityType, entityId },
        body: comment,
      })
      toast({
        title: 'Success',
        description: 'Comment Created Successfully',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetComments] })
      setOpen(false)
      reset()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Comment creation wasn't successful.",
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <section className="p-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <section className="flex items-center justify-between pb-5">
          <h3 className="title m-1 grow truncate p-0 text-xl font-bold">Comment Management</h3>
          {can('CmsKit.Comments.Create') && (
            <Button onClick={() => setOpen(true)}>
              <Plus width={18} height={18} />
              <span className="hidden truncate sm:inline">Create New Comment</span>
            </Button>
          )}
        </section>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Comment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex w-full flex-col space-y-5">
              <Textarea 
                required 
                {...register('text')} 
                placeholder="Comment text" 
                rows={4}
              />
            </section>
            <DialogFooter className="mt-5">
              <Button
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