import {useEffect, useState} from 'react'
import {Button} from '../ui/button'
import {Dialog, DialogContent, DialogFooter, DialogTitle} from '../ui/dialog'

type FeaturesProps = {
  onDismiss: () => void
}
export const Features = ({ onDismiss }: FeaturesProps) => {
  const [open, setOpen] = useState(false)
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
        <DialogTitle>Features</DialogTitle>
        <article>
          <p>There isn&apos;t any available feature.</p>
        </article>
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
      </DialogContent>
    </Dialog>
  )
}
