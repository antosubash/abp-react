'use client'
import { EmailSettingsDto, EmailSettingsUpdateData, emailSettingsUpdate } from '@/client'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useEmailing } from '@/lib/hooks/useEmailing'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { TestEmail } from './TestEmail'

export const Emailing = () => {
  const { toast } = useToast()
  const { data } = useEmailing()
  const queryClient = useQueryClient()
  const [openTestEmail, setOpenTestEmail] = useState<boolean>(false)
  const { handleSubmit, register } = useForm()

  const [emailSettingDto, setEmailSettingDto] = useState<EmailSettingsDto | undefined>(data)

  useEffect(() => {
    if (data) {
      setEmailSettingDto({ ...data })
    }
  }, [data])

  const onChangeEvent = useCallback(
    (e: SyntheticEvent) => {
      const { value, name } = e.target as HTMLInputElement

      setEmailSettingDto({ ...emailSettingDto, [name]: value })
    },
    [emailSettingDto]
  )

  const onSubmitEvent = async () => {
    try {
      await emailSettingsUpdate({
        ...emailSettingDto,
      } as EmailSettingsUpdateData)
      toast({
        title: 'Success',
        description: 'Email settings updated successfully',
        variant: 'default',
      })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetEmailing] })
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: "Email settings wasn't successfull.",
          variant: 'destructive',
        })
      }
    }
  }
  return (
    <section className="emailing p-5 xl:p-10">
      {openTestEmail && <TestEmail onDismiss={() => setOpenTestEmail(false)} />}
      <h3 className="text-xl font-medium">Emailing</h3>
      <hr className="mt-2 border" />
      <div className="pt-5">
        <form onSubmit={handleSubmit(onSubmitEvent)}>
          <div className="mb-5 space-y-5">
            <Input
              type="text"
              {...register('defaultFromDisplayName')}
              required
              placeholder="Default from display name"
              value={emailSettingDto?.defaultFromDisplayName ?? ''}
              onChange={onChangeEvent}
            />
            <Input
              type="email"
              {...register('defaultFromAddress')}
              required
              placeholder="Default from address"
              value={emailSettingDto?.defaultFromAddress ?? ''}
              onChange={onChangeEvent}
            />
            <Input
              type="text"
              {...register('smtpHost')}
              placeholder="Host"
              value={emailSettingDto?.smtpHost ?? ''}
              onChange={onChangeEvent}
            />

            <Input
              type="number"
              {...register('smtpPort')}
              required
              placeholder="Port"
              value={emailSettingDto?.smtpPort ?? 0}
              onChange={onChangeEvent}
            />

            <div className={clsx('flex items-center space-x-2')}>
              <Checkbox
                id="ssl"
                {...register('smtpEnableSsl')}
                checked={emailSettingDto?.smtpEnableSsl}
                onCheckedChange={(checked) => {
                  setEmailSettingDto({
                    ...emailSettingDto,
                    smtpEnableSsl: !!checked.valueOf(),
                  })
                }}
              />
              <label htmlFor="ssl" className="text-sm font-medium leading-none">
                Enable ssl
              </label>
            </div>

            <div className={clsx('flex items-center space-x-2')}>
              <Checkbox
                id="credentials"
                name="smtpUseDefaultCredentials"
                checked={emailSettingDto?.smtpUseDefaultCredentials}
                onCheckedChange={(checked) =>
                  setEmailSettingDto({
                    ...emailSettingDto,
                    smtpUseDefaultCredentials: !!checked.valueOf(),
                  })
                }
              />
              <label htmlFor="credentials" className="text-sm font-medium leading-none">
                Use default credentials
              </label>
            </div>
            {!emailSettingDto?.smtpUseDefaultCredentials && (
              <>
                <Input
                  type="text"
                  {...register('smtpDomain')}
                  placeholder="Domain"
                  value={emailSettingDto?.smtpDomain ?? ''}
                  onChange={onChangeEvent}
                />

                <Input
                  type="text"
                  {...register('smtpUserName')}
                  placeholder="User name"
                  value={emailSettingDto?.smtpUserName ?? ''}
                  onChange={onChangeEvent}
                />

                <Input
                  type="password"
                  {...register('smtpPassword')}
                  placeholder="Password"
                  value={emailSettingDto?.smtpPassword ?? ''}
                  onChange={onChangeEvent}
                />
              </>
            )}
          </div>
          <hr className="mt-2 border" />
          <div className="w-full space-x-5 space-y-5">
            <Button type="submit">Save</Button>
            <Button
              variant="default"
              onClick={(e: { preventDefault: () => void }) => {
                e.preventDefault()
                setOpenTestEmail(true)
              }}
            >
              Send Test Email
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
