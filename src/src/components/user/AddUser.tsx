import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IdentityUserCreateDto, UserService } from '@abpreact/proxy';
import { QueryNames, useGrantedPolicies } from '@abpreact/hooks';
import classNames from 'classnames';
import { Plus } from 'lucide-react';

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

export type AddUserProps = {};

export const AddUser = ({}: AddUserProps) => {
    const { can } = useGrantedPolicies();
    const [open, setOpen] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [lockoutEnabled, setLockoutEnabled] = useState(true);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { handleSubmit, register } = useForm();
    const onSubmit = async (data: any) => {
        const user = data as IdentityUserCreateDto;
        user.isActive = isActive;
        user.lockoutEnabled = lockoutEnabled;

        try {
            await UserService.userCreate(user);
            toast({
                title: 'Success',
                description: 'User Created Successfully',
                variant: 'default'
            });
			queryClient.invalidateQueries({ queryKey: [QueryNames.GetUsers]});
            setOpen(false);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "User creation wasn't successfull.",
                    variant: 'destructive'
                });
            }
        }
    };

    return (
        <section className="p-3">
            <Dialog open={open} onOpenChange={setOpen}>
                <section className="flex items-center justify-between pb-5">
                    <h3 className="title text-xl grow p-0 m-1 truncate">
                        User Management
                    </h3>
                    {can('AbpIdentity.Users.Create') && (
                        <Button variant="subtle" onClick={() => setOpen(true)}>
                            <Plus width={18} height={18} />
                            <span className="truncate hidden sm:inline">
                                Create New User
                            </span>
                        </Button>
                    )}
                </section>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New User</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <section className="flex flex-col w-full space-y-5">
                            <Input
                                required
                                {...register('username')}
                                label="User name"
                            />
                            <Input
                                required
                                type="password"
                                {...register('password')}
                                label="Password"
                            />
                            <Input label="Name" {...register('name')} />
                            <Input label="Surname" {...register('surname')} />
                            <Input
                                required
                                label="Email address"
                                {...register('email')}
                            />
                            <Input
                                label="Phone Number"
                                {...register('phoneNumber')}
                            />
                            <div
                                className={classNames(
                                    'flex items-center space-x-2 pb-2'
                                )}
                            >
                                <Checkbox
                                    id="isActive"
                                    name="isActive"
                                    variant="subtle"
                                    defaultChecked
                                    checked={isActive}
                                    onCheckedChange={(checked) =>
                                        setIsActive(!!checked.valueOf())
                                    }
                                />
                                <label
                                    htmlFor="isActive"
                                    className="text-sm font-medium leading-none "
                                >
                                    Active
                                </label>
                            </div>
                            <div
                                className={classNames(
                                    'flex items-center space-x-2 pb-2'
                                )}
                            >
                                <Checkbox
                                    id="lockoutEnabled"
                                    name="lockoutEnabled"
                                    variant="subtle"
                                    defaultChecked
                                    checked={lockoutEnabled}
                                    onCheckedChange={(checked) =>
                                        setLockoutEnabled(!!checked.valueOf())
                                    }
                                />
                                <label
                                    htmlFor="lockoutEnabled"
                                    className="text-sm font-medium leading-none "
                                >
                                    Lock account after failed login attempts
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
