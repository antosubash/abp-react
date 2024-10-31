'use client'
import { IdentityUserCreateDto, userCreate } from '@/client'
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
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'clsx'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type AddUserProps = {}

export const AddUser = ({}: AddUserProps) => {
  const { can } = useGrantedPolicies()
  const [open, setOpen] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [lockoutEnabled, setLockoutEnabled] = useState(true)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { handleSubmit, register } = useForm()
  const onSubmit = async (data: any) => {
    const user = data as IdentityUserCreateDto
    user.isActive = isActive
    user.lockoutEnabled = lockoutEnabled

    try {
      await userCreate({
        requestBody: user,
      })
      toast({
        title: 'Success',
        description: 'User Created Successfully',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetUsers] })
      setOpen(false)
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "User creation wasn't successful.",
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <section className="p-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <section className="flex items-center justify-between pb-5">
          <h3 className="title m-1 grow truncate p-0 text-xl font-bold">User Management</h3>
          {can('AbpIdentity.Users.Create') && (
            <Button onClick={() => setOpen(true)}>
              <Plus width={18} height={18} />
              <span className="hidden truncate sm:inline">Create New User</span>
            </Button>
          )}
        </section>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex w-full flex-col space-y-5">
              <Input required {...register('username')} placeholder="User name" />
              <Input required type="password" {...register('password')} placeholder="Password" />
              <Input placeholder="Name" {...register('name')} />
              <Input placeholder="Surname" {...register('surname')} />
              <Input required placeholder="Email address" {...register('email')} />
              <Input placeholder="Phone Number" {...register('phoneNumber')} />
              <div className={classNames('flex items-center space-x-2 pb-2')}>
                <Checkbox
                  id="isActive"
                  name="isActive"
                  defaultChecked
                  checked={isActive}
                  onCheckedChange={(checked) => setIsActive(!!checked.valueOf())}
                />
                <label htmlFor="isActive" className="text-sm font-medium leading-none">
                  Active
                </label>
              </div>
              <div className={classNames('flex items-center space-x-2 pb-2')}>
                <Checkbox
                  id="lockoutEnabled"
                  name="lockoutEnabled"
                  defaultChecked
                  checked={lockoutEnabled}
                  onCheckedChange={(checked) => setLockoutEnabled(!!checked.valueOf())}
                />
                <label htmlFor="lockoutEnabled" className="text-sm font-medium leading-none">
                  Lock account after failed login attempts
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
