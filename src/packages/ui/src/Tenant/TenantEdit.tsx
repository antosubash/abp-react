import { TenantService, TenantUpdateDto } from '@abpreact/proxy';
import { QueryNames } from '@abpreact/hooks';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '../Shared/hooks/useToast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '../Shared/DialogWrapper';
import { Button } from '../Shared/Button';
import { useForm } from 'react-hook-form';
import { Input } from '../Shared/Input';
import classNames from 'classnames';
import { Checkbox } from '../Shared/Checkbox';

export type TenantEditProps = {
    tenantDto: TenantUpdateDto;
    tenantId: string;
    onDismiss: () => void;
};

export const TenantEdit = ({
    tenantDto,
    tenantId,
    onDismiss
}: TenantEditProps) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const [enableHost, setEnableHost] = useState(false);
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();

    useEffect(() => {
        console.log(
            tenantDto?.extraProperties?.Host,
            'tenantDto?.extraProperties?.Host'
        );
        if (tenantDto?.extraProperties?.Host) {
            setEnableHost(true);
        }
    }, [tenantDto, tenantDto?.extraProperties?.Host]);

    const onSubmit = async (dto: unknown) => {
        const tenant = dto as TenantUpdateDto & { host?: string };

        try {
            await TenantService.tenantUpdate(tenantId, tenant);
            if (enableHost && tenant?.host) {
                await TenantService.tenantAddHost(tenantId, tenant?.host);
            }
            toast({
                title: 'Success',
                description: 'Tenant information updated successfully',
                variant: 'default'
            });
            setOpen(false);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "Tenant update wasn't successfull.",
                    variant: 'destructive'
                });
            }
        }
    };

    const onCloseEvent = () => {
        setOpen(false);
        onDismiss();
    };

    useEffect(() => {
        setOpen(true);
        return () => {
            queryClient.invalidateQueries([QueryNames.GetTenants]);
        };
    }, []);

    return (
        <Dialog open={open} onOpenChange={onCloseEvent}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upate a Tenant Name</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex flex-col space-y-5">
                        <Input
                            required
                            label="Tenant Name"
                            defaultValue={tenantDto.name ?? ''}
                            {...register('name')}
                        />
                    </section>
                    <div
                        className={classNames(
                            'flex items-center space-x-2 pb-2 pt-5'
                        )}
                    >
                        <Checkbox
                            id="enableHost"
                            name="enableHost"
                            variant="subtle"
                            defaultChecked
                            checked={enableHost}
                            onCheckedChange={(checked) =>
                                setEnableHost(!!checked.valueOf())
                            }
                        />
                        <label
                            htmlFor="activeHost"
                            className="text-sm font-medium leading-none "
                        >
                            Enable host
                        </label>
                    </div>
                    {enableHost && (
                        <div className="flex flex-col w-auto pt-5 pb-5">
                            <section className="flex flex-col w-full space-y-5">
                                <Input
                                    required
                                    {...register('host')}
                                    defaultValue={
                                        tenantDto?.extraProperties?.Host
                                    }
                                    label="Hose Name"
                                />
                            </section>
                        </div>
                    )}
                    <DialogFooter className="mt-5">
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                onCloseEvent();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="subtle">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
