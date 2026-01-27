'use client'
import { pageAdminDelete } from '@/client'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { useToast } from '@/shared/components/ui/use-toast'
import { QueryNames } from '@/shared/hooks/QueryConstants'
import { useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'

export type DeletePageProps = {
  page: {
    title: string
    pageId: string
  }
  onDismiss?: () => void
}

export const DeletePage = ({ page, onDismiss }: DeletePageProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      await pageAdminDelete({
        path: { id: page.pageId },
      })
      toast({
        title: 'Success',
        description: 'Page Deleted Successfully',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetPages] })
      onDismiss?.()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: 'Page deletion wasn&apos;t successful.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => onDismiss?.()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-500" />
            Delete Page
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            Are you sure you want to delete the page <strong>{page.title}</strong>?
          </p>
          <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onDismiss?.()}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
