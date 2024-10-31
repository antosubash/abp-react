'use client'
import { TenantCreateDto, tenantCreate } from '@/client'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

export const AddTenant = () => {
  const { can } = useGrantedPolicies()
  const [open, setOpen] = useState(false)

  const { toast } = useToast()
  const { handleSubmit, register } = useForm()
  const queryClient = useQueryClient()

  const onSubmit = async (data: unknown) => {
    const newTenant = data as TenantCreateDto
    try {
      await tenantCreate({ requestBody: newTenant })
      toast({
        title: 'Success',
        description: 'Tenant Created Successfully',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetTenants] })
      setOpen(false)
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Tenant creation wasn't successful.",
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <section className="p-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <section className="flex items-center justify-between pb-5">
          <h3 className="title m-1 grow truncate p-0 text-xl font-bold">Tenant Management</h3>
          {can('AbpTenantManagement.Tenants.Create') && (
            <Button onClick={() => setOpen(true)}>
              <Plus width={18} height={18} />
              <span className="hidden truncate sm:inline">Create New Tenant</span>
            </Button>
          )}
        </section>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Tenant</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex w-full flex-col space-y-5">
              <Input required {...register('name')} placeholder="Tenant Name" />
              <Input
                required
                {...register('adminEmailAddress')}
                placeholder="Admin Email Address"
              />
              <Input required {...register('adminPassword')} placeholder="Admin Password" />
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
