import { QueryNames, useEmailing } from '@abpreact/hooks';
import {
    EmailSettingsDto,
    EmailSettingsService,
    UpdateEmailSettingsDto
} from '@abpreact/proxy';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../Shared/Button';
import { Checkbox } from '../Shared/Checkbox';
import { useToast } from '../Shared/hooks/useToast';
import { Input } from '../Shared/Input';
import { TestEmail } from './TestEmail';

export const Emailing = () => {
    const { toast } = useToast();
    const { data } = useEmailing();
    const queryClient = useQueryClient();
    const [openTestEmail, setOpenTestEmail] = useState<boolean>(false);
    const { handleSubmit, register } = useForm();

    const [emailSettingDto, setEmailSettingDto] = useState<
        EmailSettingsDto | undefined
    >(data);

    useEffect(() => {
        if (data) {
            setEmailSettingDto({ ...data });
        }
    }, [data]);

    const onChangeEvent = useCallback(
        (e: SyntheticEvent) => {
            const { value, name } = e.target as HTMLInputElement;

            setEmailSettingDto({ ...emailSettingDto, [name]: value });
        },
        [emailSettingDto]
    );

    const onSubmitEvent = async () => {
        try {
            await EmailSettingsService.emailSettingsUpdate({
                ...emailSettingDto
            } as UpdateEmailSettingsDto);
            toast({
                title: 'Success',
                description: 'Email settings updated successfully',
                variant: 'default'
            });
            queryClient.invalidateQueries([QueryNames.GetEmailing]);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "Email settings wasn't successfull.",
                    variant: 'destructive'
                });
            }
        }
    };
    return (
        <section className="emailing p-5 xl:p-10">
            {openTestEmail && (
                <TestEmail onDismiss={() => setOpenTestEmail(false)} />
            )}
            <h3 className="text-xl font-medium">Emailing</h3>
            <hr className="border mt-2" />
            <div className="pt-5">
                <form onSubmit={handleSubmit(onSubmitEvent)}>
                    <div className="space-y-5 mb-5">
                        <Input
                            type="text"
                            {...register('defaultFromDisplayName')}
                            required
                            label="Default from display name"
                            value={
                                emailSettingDto?.defaultFromDisplayName ?? ''
                            }
                            onChange={onChangeEvent}
                        />
                        <Input
                            type="email"
                            {...register('defaultFromAddress')}
                            required
                            label="Default from address"
                            value={emailSettingDto?.defaultFromAddress ?? ''}
                            onChange={onChangeEvent}
                        />
                        <Input
                            type="text"
                            {...register('smtpHost')}
                            label="Host"
                            value={emailSettingDto?.smtpHost ?? ''}
                            onChange={onChangeEvent}
                        />

                        <Input
                            type="number"
                            {...register('smtpPort')}
                            required
                            label="Port"
                            value={emailSettingDto?.smtpPort ?? 0}
                            onChange={onChangeEvent}
                        />

                        <div
                            className={classNames(
                                'flex items-center space-x-2'
                            )}
                        >
                            <Checkbox
                                id="ssl"
                                {...register('smtpEnableSsl')}
                                checked={emailSettingDto?.smtpEnableSsl}
                                onCheckedChange={(checked) => {
                                    setEmailSettingDto({
                                        ...emailSettingDto,
                                        smtpEnableSsl: !!checked.valueOf()
                                    });
                                }}
                            />
                            <label
                                htmlFor="ssl"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Enable ssl
                            </label>
                        </div>

                        <div
                            className={classNames(
                                'flex items-center space-x-2'
                            )}
                        >
                            <Checkbox
                                id="credentials"
                                name="smtpUseDefaultCredentials"
                                checked={
                                    emailSettingDto?.smtpUseDefaultCredentials
                                }
                                onCheckedChange={(checked) =>
                                    setEmailSettingDto({
                                        ...emailSettingDto,
                                        smtpUseDefaultCredentials:
                                            !!checked.valueOf()
                                    })
                                }
                            />
                            <label
                                htmlFor="credentials"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Use default credentials
                            </label>
                        </div>
                        {!emailSettingDto?.smtpUseDefaultCredentials && (
                            <>
                                <Input
                                    type="text"
                                    {...register('smtpDomain')}
                                    label="Domain"
                                    value={emailSettingDto?.smtpDomain ?? ''}
                                    onChange={onChangeEvent}
                                />

                                <Input
                                    type="text"
                                    {...register('smtpUserName')}
                                    label="User name"
                                    value={emailSettingDto?.smtpUserName ?? ''}
                                    onChange={onChangeEvent}
                                />

                                <Input
                                    type="password"
                                    {...register('smtpPassword')}
                                    label="Password"
                                    value={emailSettingDto?.smtpPassword ?? ''}
                                    onChange={onChangeEvent}
                                />
                            </>
                        )}
                    </div>
                    <hr className="border mt-2" />
                    <div className="space-y-5 space-x-5 w-full">
                        <Button type="submit" size="lg" variant="default">
                            Save
                        </Button>
                        <Button
                            variant="default"
                            size="lg"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenTestEmail(true);
                            }}
                        >
                            Send Test Email
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};
