'use client'
import { IdentityRoleCreateDto, roleCreate } from '@/client'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

export type AddUserProps = {}

export const AddRole = ({}: AddUserProps) => {
  const { can } = useGrantedPolicies()
  const [open, setOpen] = useState(false)
  const [isDefault, setIsDefault] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const { toast } = useToast()
  const { handleSubmit, register } = useForm()
  const queryClient = useQueryClient()
  const onSubmit = async (data: any) => {
    const newRole = data as IdentityRoleCreateDto
    newRole.isDefault = isDefault
    newRole.isPublic = isPublic

    try {
      await roleCreate({ requestBody: newRole })
      toast({
        title: 'Success',
        description: 'Role Created Successfully',
        variant: 'default',
      })
      await queryClient.invalidateQueries({queryKey: [QueryNames.GetRoles]})
      setOpen(false)
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Role creation wasn't successful.",
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <section className="p-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <section className="flex items-center justify-between pb-5">
          <h3 className="title m-1 grow truncate p-0 text-xl font-bold">Role Management</h3>
          {can('AbpIdentity.Roles.Create') && (
            <Button onClick={() => setOpen(true)}>
              <Plus width={18} height={18} />
              <span className="hidden truncate sm:inline">Create New Role</span>
            </Button>
          )}
        </section>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Role</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex w-full flex-col space-y-5">
              <Input required {...register('name')} placeholder="Role Name" />

              <div className={clsx('flex items-center space-x-2 pb-2')}>
                <Checkbox
                  id="isDefault"
                  name="isDefault"
                  checked={isDefault}
                  onCheckedChange={(checked) => setIsDefault(!!checked.valueOf())}
                />
                <label htmlFor="isDefault" className="text-sm font-medium leading-none">
                  Is Default
                </label>
              </div>
              <div className={clsx('flex items-center space-x-2 pb-2')}>
                <Checkbox
                  id="isPublic"
                  name="isPublic"
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(!!checked.valueOf())}
                />
                <label htmlFor="isPublic" className="text-sm font-medium leading-none">
                  Is Public
                </label>
              </div>
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
