import { roleDelete } from '@/client'
import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { useToast } from '../ui/use-toast'

type DeleteRoleProps = {
  role: { roleId: string; roleName: string }
  onDismiss: () => void
}
export const DeleteRole = ({ role: { roleId, roleName }, onDismiss }: DeleteRoleProps) => {
  const { toast } = useToast()
  const [open, setOpen] = useState<boolean>(false)
  const onYesEvent = async () => {
    try {
      await roleDelete({ id: roleId })
      toast({
        title: 'Success',
        description: `Role "${roleName}" has been deleted successfully.`,
      })
      onDismiss()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: `There was a problem when deleting the role ${roleName}. Kindly try again.`,
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
            This action cannot be undone. This will permanently delete your role name &quot;
            {roleName}&quot;
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
