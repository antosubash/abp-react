'use client'
import { ProfileChangePasswordData, profileChangePassword } from '@/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

export const ChangePassword = () => {
  const { toast } = useToast()
  const { handleSubmit, register } = useForm()
  const [password, setPassword] = useState<{
    newPassword: string
    confirmNewPassword: string
  }>({
    newPassword: '',
    confirmNewPassword: '',
  })

  const onSubmit = async (data: unknown) => {
    if (shouldDisabled()) {
      toast({
        title: 'Password Incorrect',
        description: 'Please check New Password and Confirm New Password',
        variant: 'destructive',
      })
      return
    }
    try {
      const requestBody = data as ProfileChangePasswordData
      await profileChangePassword(requestBody)
      toast({
        title: 'Success',
        description: 'Password has been updated successfully.',
        variant: 'default',
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Password update wasn't successful.",
          variant: 'destructive',
        })
      }
    }
  }
  const shouldDisabled = () => {
    if (!password.newPassword.trim() || !password.confirmNewPassword.trim()) {
      return true
    } else if (password.newPassword.trim() !== password.confirmNewPassword.trim()) {
      return true
    }

    return false
  }
  return (
    <section className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Input
          type="password"
          required
          {...register('currentPassword')}
          placeholder="Current password"
        />
        <Input
          type="password"
          {...register('newPassword')}
          placeholder="New password"
          onChange={(e) =>
            setPassword({
              ...password,
              newPassword: e.target.value,
            })
          }
        />
        <Input
          type="password"
          {...register('confirmNewPassword')}
          placeholder="Confirm new password"
          onChange={(e) => {
            setPassword({
              ...password,
              confirmNewPassword: e.target.value,
            })
          }}
        />

        <Button type="submit">Save</Button>
      </form>
    </section>
  )
}
