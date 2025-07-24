'use client'
import { menuItemAdminDelete } from '@/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

interface DeleteMenuItemProps {
  menuItem: {
    displayName: string
    menuItemId: string
  }
  onDismiss: () => void
}

export const DeleteMenuItem = ({ menuItem, onDismiss }: DeleteMenuItemProps) => {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await menuItemAdminDelete({
        path: { id: menuItem.menuItemId },
      })
      toast({
        title: 'Success',
        description: 'Menu item deleted successfully',
        variant: 'default',
      })
      onDismiss()
    } catch (error) {
      console.error('Error deleting menu item:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete menu item. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open onOpenChange={onDismiss}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Menu Item
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the menu item &quot;{menuItem.displayName}&quot;? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onDismiss} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
