import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IdentityUserCreateDto, UserService } from '@abpreact/proxy';
import { QueryNames } from '@abpreact/hooks';
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

export type AddUserProps = {};

export const AddUser = ({}: AddUserProps) => {
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
            await queryClient.invalidateQueries([QueryNames.GetUsers]);
            toast({
                title: 'Success',
                description: 'User Created Successfully',
                variant: 'default'
            });
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
                <section className="flex flex-col sm:flex-row sm:items-center pb-5">
                    <h3 className="text-center sm:text-left title font-bold text-xl grow p-0 m-1">
                        User Management
                    </h3>
                    <Button variant="default" onClick={() => setOpen(true)}>
                        Create New User
                    </Button>
                </section>
                <DialogContent className="text-white">
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
                                    defaultChecked
                                    checked={isActive}
                                    onCheckedChange={(checked) =>
                                        setIsActive(!!checked.valueOf())
                                    }
                                />
                                <label
                                    htmlFor="isActive"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                                    defaultChecked
                                    checked={lockoutEnabled}
                                    onCheckedChange={(checked) =>
                                        setLockoutEnabled(!!checked.valueOf())
                                    }
                                />
                                <label
                                    htmlFor="lockoutEnabled"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Lock account after failed login attempts
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
        </section>
    );
};
