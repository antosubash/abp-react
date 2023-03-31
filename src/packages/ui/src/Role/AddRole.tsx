import { useState } from 'react';
import { IdentityRoleCreateDto, RoleService } from '@abpreact/proxy';
import { QueryNames, useGrantedPolicies } from '@abpreact/hooks';
import classNames from 'classnames';

import { Button } from '../Shared/Button';
import { Checkbox } from '../Shared/Checkbox';
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

export type AddUserProps = {};

export const AddRole = ({}: AddUserProps) => {
    const { can } = useGrantedPolicies();
    const [open, setOpen] = useState(false);
    const [isDefault, setIsDefault] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();
    const queryClient = useQueryClient();
    const onSubmit = async (data: any) => {
        const newRole = data as IdentityRoleCreateDto;
        newRole.isDefault = isDefault;
        newRole.isPublic = isPublic;

        try {
            await RoleService.roleCreate(newRole);
            toast({
                title: 'Success',
                description: 'Role Created Successfully',
                variant: 'default'
            });
            queryClient.invalidateQueries([QueryNames.GetRoles]);
            setOpen(false);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "Role creation wasn't successfull.",
                    variant: 'destructive'
                });
            }
        }
    };

    return (
        <section className="p-3">
            <Dialog open={open} onOpenChange={setOpen}>
                <section className="flex items-center justify-between pb-5">
                    <h3 className="title font-bold text-xl grow p-0 m-1 truncate text-neutral-100">
                        Role Management
                    </h3>
                    {can('AbpIdentity.Roles.Create') && (
                        <Button variant="default" onClick={() => setOpen(true)}>
                            <span className="truncate">Create New Role</span>
                        </Button>
                    )}
                </section>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New Role</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <section className="flex flex-col w-full space-y-5">
                            <Input
                                required
                                {...register('name')}
                                label="Role Name"
                            />

                            <div
                                className={classNames(
                                    'flex items-center space-x-2 pb-2'
                                )}
                            >
                                <Checkbox
                                    id="isDefault"
                                    name="isDefault"
                                    checked={isDefault}
                                    onCheckedChange={(checked) =>
                                        setIsDefault(!!checked.valueOf())
                                    }
                                />
                                <label
                                    htmlFor="isDefault"
                                    className="text-sm font-medium leading-none text-neutral-100"
                                >
                                    Is Default
                                </label>
                            </div>
                            <div
                                className={classNames(
                                    'flex items-center space-x-2 pb-2'
                                )}
                            >
                                <Checkbox
                                    id="isPublic"
                                    name="isPublic"
                                    checked={isPublic}
                                    onCheckedChange={(checked) =>
                                        setIsPublic(!!checked.valueOf())
                                    }
                                />
                                <label
                                    htmlFor="isPublic"
                                    className="text-sm font-medium leading-none text-neutral-100"
                                >
                                    Is Public
                                </label>
                            </div>
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
