import { TenantUpdateDto, tenantAddHost, tenantUpdate } from '@/client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'clsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export type TenantEditProps = {
  tenantDto: TenantUpdateDto
  tenantId: string
  onDismiss: () => void
}

export const TenantEdit = ({ tenantDto, tenantId, onDismiss }: TenantEditProps) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const [enableHost, setEnableHost] = useState(false)
  const { toast } = useToast()
  const { handleSubmit, register } = useForm()

  useEffect(() => {
    if (tenantDto?.extraProperties?.Host) {
      setEnableHost(true)
    }
  }, [tenantDto, tenantDto?.extraProperties?.Host])

  const onSubmit = async (dto: unknown) => {
    const tenant = dto as TenantUpdateDto & { host?: string }

    try {
      await tenantUpdate({
        id: tenantId,
        requestBody: tenant,
      })
      if (enableHost && tenant?.host) {
        await tenantAddHost({
          id: tenantId,
          host: tenant.host,
        })
      }
      toast({
        title: 'Success',
        description: 'Tenant information updated successfully',
        variant: 'default',
      })
      setOpen(false)
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Tenant update wasn't successfull.",
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
    return () => {
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetTenants] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog open={open} onOpenChange={onCloseEvent}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update a Tenant Name</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="flex flex-col space-y-5">
            <Input
              required
              placeholder="Tenant Name"
              defaultValue={tenantDto.name ?? ''}
              {...register('name')}
            />
          </section>
          <div className={classNames('flex items-center space-x-2 pb-2 pt-5')}>
            <Checkbox
              id="enableHost"
              name="enableHost"
              defaultChecked
              checked={enableHost}
              onCheckedChange={(checked) => setEnableHost(!!checked.valueOf())}
            />
            <label htmlFor="activeHost" className="text-sm font-medium leading-none">
              Enable host
            </label>
          </div>
          {enableHost && (
            <div className="flex w-auto flex-col pb-5 pt-5">
              <section className="flex w-full flex-col space-y-5">
                <Input required {...register('host')} placeholder="Hose Name" />
              </section>
            </div>
          )}
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
