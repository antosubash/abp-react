import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 } from 'uuid'
import {
  type FeatureGroupDto,
  featuresDelete,
  featuresUpdate,
  type UpdateFeaturesDto,
} from '@/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useFeatures } from '@/lib/hooks/useFeatures'
import { PermissionProvider, Permissions } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { useToast } from '../ui/use-toast'

export type FeatureListProps = {
  onDismiss: () => void
  tenantId: string
}

export const FeatureList = ({ onDismiss, tenantId }: FeatureListProps) => {
  const { data } = useFeatures(PermissionProvider.T, tenantId)
  const queryClient = useQueryClient()
  const [enableSetting, setEnableSetting] = useState<boolean>(false)
  const [enableEmailSetting, setEnableEmailSetting] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const { handleSubmit } = useForm()
  const { toast } = useToast()

  const onCloseEvent = () => {
    setOpen(false)
    onDismiss()
  }

  useEffect(() => {
    setOpen(true)
    data?.groups?.forEach((g) => {
      g.features?.forEach((f) => {
        if (f.name === Permissions.SETTINGS_EMAILING && f.value === 'true') {
          setEnableSetting(true)
        } else if (f.name === Permissions.SETTINGS_EMAILING_TEST && f.value === 'true') {
          setEnableEmailSetting(true)
        }
      })
    })
    return () => {
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetFeatures] }).then()
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetTenants] }).then()
      queryClient.invalidateQueries({ queryKey: [PermissionProvider.T] }).then()
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [data, queryClient.invalidateQueries])

  const onCheckedEvent = (value: boolean, name: string) => {
    if (name === Permissions.SETTINGS_EMAILING) {
      setEnableSetting(value)
    } else if (name === Permissions.SETTINGS_EMAILING_TEST) {
      setEnableEmailSetting(value)
    }
  }

  const onSubmit = async () => {
    try {
      const featureUpdateDto = {} as UpdateFeaturesDto
      featureUpdateDto.features = [
        {
          name: Permissions.SETTINGS_EMAILING,
          value: enableSetting.toString(),
        },
        {
          name: Permissions.SETTINGS_EMAILING_TEST,
          value: enableEmailSetting.toString(),
        },
      ]

      await featuresUpdate({
        body: featureUpdateDto,
        query: { providerKey: PermissionProvider.T, providerName: tenantId },
      })
      toast({
        title: 'Success',
        description: 'Features Update Successfully',
        variant: 'default',
      })
      onCloseEvent()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: 'Feature update failed.',
          variant: 'destructive',
        })
      }
    }
  }

  const onResetToDefaultEvent = async () => {
    try {
      await featuresDelete({
        query: { providerKey: PermissionProvider.T, providerName: tenantId },
      })
      toast({
        title: 'Success',
        description: 'Features has been set to default.',
        variant: 'default',
      })
      onCloseEvent()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: 'Failed',
          description: 'Features wasn&apos;t able to reset tp default.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <section className="p-3">
      <Dialog open={open} onOpenChange={onCloseEvent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Features</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 items-baseline gap-2 sm:grid-cols-[12rem_minmax(10rem,1fr)_auto]">
              <div className="p-3">
                {data?.groups?.map((el: FeatureGroupDto) => (
                  <span key={v4()}>{el.displayName}</span>
                ))}
              </div>
              <div className="mt-5 p-3">
                {data?.groups?.map((el: FeatureGroupDto) => (
                  <div key={v4()}>
                    <h3 className="text-xl font-medium">{el.displayName}</h3>
                    <hr className="mt-2 w-full pb-2" />
                    {el.features?.map((feature) => (
                      <div key={v4()} className="mt-2 text-base">
                        <Checkbox
                          id={`${feature.name}_enable`}
                          name={feature.name!}
                          checked={
                            feature.name === Permissions.SETTINGS_EMAILING
                              ? enableSetting
                              : enableEmailSetting
                          }
                          onCheckedChange={(checked) =>
                            onCheckedEvent(!!checked.valueOf(), feature.name!)
                          }
                        />
                        <label
                          htmlFor={`${feature.name}_enable`}
                          className="text-sm font-medium leading-none"
                        >
                          <span className="pl-2">{feature.displayName}</span>
                        </label>
                        <p className="pl-6 pt-1 text-xs">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="mt-5">
              <Button
                onClick={async (e: { preventDefault: () => void }) => {
                  e.preventDefault()
                  await onResetToDefaultEvent()
                }}
              >
                Reset to default
              </Button>
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
    </section>
  )
}
