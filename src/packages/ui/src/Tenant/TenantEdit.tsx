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
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();

    const onSubmit = async (dto: unknown) => {
        const tenant = dto as TenantUpdateDto;
        try {
            await TenantService.tenantUpdate(tenantId, tenant);
            toast({
                title: 'Success',
                description: 'Tenant name Updated Successfully',
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
            <DialogContent className="text-white">
                <DialogHeader>
                    <DialogTitle>Upate a Tenant Name</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex flex-col space-y-5">
                        <Input
                            required
                            placeholder="Tenant Name"
                            defaultValue={tenantDto.name ?? ''}
                            {...register('name')}
                        />
                    </section>
                    <DialogFooter className="mt-5">
                        <Button type="submit" variant="outline">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
