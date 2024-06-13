'use client'
import { UpdateProfileDto, profileUpdate } from '@/client'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useProfile } from '@/lib/hooks/useProfile'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import Error from '../ui/Error'
import Loader from '../ui/Loader'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

export const ProfileSettings = () => {
  const { data, isLoading, isError } = useProfile()
  const { handleSubmit, register } = useForm()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const onSubmit = async (data: UpdateProfileDto) => {
    try {
      await profileUpdate({ requestBody: data })
      toast({
        title: 'Success',
        description: 'Profile has been updated successfully.',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetProfile] })
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Profile update wasn't successful.",
          variant: 'destructive',
        })
      }
    }
  }

  if (isLoading) return <Loader />
  if (isError) return <Error />

  return (
    <section className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Input
          type="text"
          defaultValue={data?.userName!}
          required
          placeholder="User name"
          {...register('userName')}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            type="text"
            defaultValue={data?.name!}
            required
            placeholder="Name"
            {...register('name')}
          />
          <Input
            type="text"
            defaultValue={data?.surname!}
            required
            placeholder="Surname"
            {...register('surname')}
          />
        </div>
        <Input
          type="email"
          defaultValue={data?.email!}
          required
          placeholder="Email address"
          {...register('email')}
        />
        <Input
          type="text"
          defaultValue={data?.phoneNumber!}
          required
          placeholder="Phone number"
          {...register('phoneNumber')}
        />

        <Button type="submit">Save</Button>
      </form>
    </section>
  )
}
