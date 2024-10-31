import {emailSettingsSendTestEmail, SendTestEmailInput} from '@/client'
import {QueryNames} from '@/lib/hooks/QueryConstants'
import {useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Button} from '../ui/button'
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '../ui/dialog'
import {Input} from '../ui/input'
import {Textarea} from '../ui/textarea'
import {useToast} from '../ui/use-toast'

export type TestEmailProps = {
  onDismiss: () => void
}

export const TestEmail = ({ onDismiss }: TestEmailProps) => {
  const [open, setOpen] = useState(false)

  const { toast } = useToast()
  const { handleSubmit, register } = useForm()
  const queryClient = useQueryClient()

  useEffect(() => {
    setOpen(true)
  }, [])

  const onSubmit = async (data: unknown) => {
    try {
      const payload = data as SendTestEmailInput
      await emailSettingsSendTestEmail({ requestBody: payload })
      toast({
        title: 'Success',
        description: 'Test email has been sent Successfully',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetRoles] })
      onCloseEvent()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Test email wasn't successful.",
          variant: 'destructive',
        })
      }
    }
  }

  const onCloseEvent = () => {
    setOpen(false)
    onDismiss()
  }

  return (
    <Dialog open={open} onOpenChange={onCloseEvent}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Test Email</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="flex w-full flex-col space-y-5">
            <Input
              required
              {...register('senderEmailAddress')}
              placeholder="Sender Email Address"
            />
            <Input
              required
              {...register('targetEmailAddress')}
              placeholder="Target Email Address"
            />
            <Input required {...register('subject')} placeholder="Subject" />
            <Textarea placeholder="Body" {...register('body')} />
          </section>
          <DialogFooter className="mt-5">
            <Button type="submit">Send</Button>
            <Button
                onClick={(e: { preventDefault: () => void }) => {
                e.preventDefault()
                onCloseEvent()
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
