import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { IdentityRoleUpdateDto, RoleService } from '@abpreact/proxy';
import { useToast } from '../Shared/hooks/useToast';
import { Checkbox } from '../Shared/Checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '../Shared/DialogWrapper';
import { Button } from '../Shared/Button';
import { Input } from '../Shared/Input';
import { USER_ROLE } from '../utils';

type RoleEditProps = {
    roleDto: IdentityRoleUpdateDto;
    roleId: string;
    onDismiss: () => void;
};
export const RoleEdit = ({ roleDto, roleId, onDismiss }: RoleEditProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();
    const [isDefault, setIsDefault] = useState(roleDto.isDefault);
    const [isPublic, setIsPublic] = useState(roleDto.isPublic);

    const onSubmit = async (data: unknown) => {
        const role = data as IdentityRoleUpdateDto;
        role.isDefault = isDefault;
        role.isPublic = isPublic;
        try {
            await RoleService.roleUpdate(roleId, { ...roleDto, ...role });
            toast({
                title: 'Success',
                description: 'Role Updated Successfully',
                variant: 'default'
            });
            setOpen(false);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "Role update wasn't successfull.",
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
    }, []);

    return (
        <Dialog open={open} onOpenChange={onCloseEvent}>
            <DialogContent className="text-white">
                <DialogHeader>
                    <DialogTitle>Upate a Role: {roleDto.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex flex-col space-y-5">
                        <Input
                            required
                            placeholder="Name"
                            disabled={roleDto.name.includes(USER_ROLE.ADMIN)}
                            defaultValue={roleDto.name ?? ''}
                            {...register('name')}
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
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Is Public
                            </label>
                        </div>
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
