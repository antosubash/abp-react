import { userDelete } from '@/client'
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

type DeleteUserProps = {
  user: { userId: string; username: string }
  onDismiss: () => void
}
export const DeleteUser = ({ user: { userId, username }, onDismiss }: DeleteUserProps) => {
  const { toast } = useToast()
  const [open, setOpen] = useState<boolean>(false)
  const onYesEvent = async () => {
    try {
      await userDelete({ id: userId })
      toast({
        title: 'Success',
        description: `User "${username}" has been deleted successfully.`,
      })
      onDismiss()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: `There was a problem when deleting the user "${username}". Kindly try again.`,
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
            This action cannot be undone. This will permanently delete your this user &quot;
            {username}&quot;
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
