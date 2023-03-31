import { useState } from 'react';
import { TenantCreateDto, TenantService } from '@abpreact/proxy';
import { QueryNames, useGrantedPolicies } from '@abpreact/hooks';

import { Button } from '../Shared/Button';

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

export const AddTenant = () => {
    const { can } = useGrantedPolicies();
    const [open, setOpen] = useState(false);

    const { toast } = useToast();
    const { handleSubmit, register } = useForm();
    const queryClient = useQueryClient();

    const onSubmit = async (data: unknown) => {
        const newTenant = data as TenantCreateDto;
        try {
            await TenantService.tenantCreate(newTenant);
            toast({
                title: 'Success',
                description: 'Tenant Created Successfully',
                variant: 'default'
            });
            queryClient.invalidateQueries([QueryNames.GetTenants]);
            setOpen(false);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "Tenant creation wasn't successfull.",
                    variant: 'destructive'
                });
            }
        }
    };

    return (
        <section className="p-3">
            <Dialog open={open} onOpenChange={setOpen}>
                <section className="flex items-center justify-between pb-5">
                    <h3 className="title font-bold text-xl grow p-0 m-1 truncate">
                        Tenant Management
                    </h3>
                    {can('AbpTenantManagement.Tenants.Create') && (
                        <Button variant="default" onClick={() => setOpen(true)}>
                            <span className="truncate">Create New Tenant</span>
                        </Button>
                    )}
                </section>
                <DialogContent className="text-white">
                    <DialogHeader>
                        <DialogTitle>Create a New Tenant</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <section className="flex flex-col w-full space-y-5">
                            <Input
                                required
                                {...register('name')}
                                label="Tenant Name"
                            />
                            <Input
                                required
                                {...register('adminEmailAddress')}
                                label="Admin Email Address"
                            />
                            <Input
                                required
                                {...register('adminPassword')}
                                label="Admin Password"
                            />
                        </section>
                        <DialogFooter className="mt-5">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
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
        </section>
    );
};
