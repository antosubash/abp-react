import { commentAdminDelete } from '@/client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'

type DeleteCommentProps = {
  comment: { commentId: string; text: string }
  onDismiss: () => void
}
export const DeleteComment = ({ comment: { commentId, text }, onDismiss }: DeleteCommentProps) => {
  const { toast } = useToast()
  const [open, setOpen] = useState<boolean>(false)
  const onYesEvent = async () => {
    try {
      await commentAdminDelete({
        path: { id: commentId },
      })
      toast({
        title: 'Success',
        description: `Comment has been deleted successfully.`,
      })
      onDismiss()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: `There was a problem when deleting the comment. Kindly try again.`,
          variant: 'destructive',
        })
      }
    }
  }

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this comment: &quot;
            {text.length > 100 ? `${text.substring(0, 100)}...` : text}&quot;
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDismiss}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onYesEvent}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 