import { useEffect, useState } from 'react';
import { EmailSettingsService, SendTestEmailInput } from '@abpreact/proxy';
import { QueryNames, useGrantedPolicies } from '@abpreact/hooks';

import { Button } from '../Shared/Button';
import { Textarea } from '../Shared/Textarea';

import { useToast } from '../Shared/hooks/useToast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '../Shared/DialogWrapper';
import { Input } from '../Shared/Input';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

export type TestEmailProps = {
    onDismiss: () => void;
};

export const TestEmail = ({ onDismiss }: TestEmailProps) => {
    const { can } = useGrantedPolicies();
    const [open, setOpen] = useState(false);

    const { toast } = useToast();
    const { handleSubmit, register } = useForm();
    const queryClient = useQueryClient();

    useEffect(() => {
        setOpen(true);
    }, []);

    const onSubmit = async (data: unknown) => {
        try {
            const payload = data as SendTestEmailInput;
            await EmailSettingsService.emailSettingsSendTestEmail(payload);
            toast({
                title: 'Success',
                description: 'Test email has been sent Successfully',
                variant: 'default'
            });
            queryClient.invalidateQueries([QueryNames.GetRoles]);
            onCloseEvent();
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "Test email wasn't successfull.",
                    variant: 'destructive'
                });
            }
        }
    };

    const onCloseEvent = () => {
        setOpen(false);
        onDismiss();
    };

    return (
        <Dialog open={open} onOpenChange={onCloseEvent}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send Test Email</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex flex-col w-full space-y-5">
                        <Input
                            required
                            {...register('senderEmailAddress')}
                            label="Sender Email Address"
                        />
                        <Input
                            required
                            {...register('targetEmailAddress')}
                            label="Target Email Address"
                        />
                        <Input
                            required
                            {...register('subject')}
                            label="Subject"
                        />
                        <Textarea label="Body" {...register('body')} />
                    </section>
                    <DialogFooter className="mt-5">
                        <Button type="submit" variant="subtle">
                            Send
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                onCloseEvent();
                            }}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
