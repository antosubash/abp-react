import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IdentityUserUpdateDto, UserService } from '@abpreact/proxy';
import { useToast } from '../Shared/hooks/useToast';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '../Shared/DialogWrapper';
import { Button } from '../Shared/Button';
import { Input } from '../Shared/Input';

type UserEditProps = {
    userDto: IdentityUserUpdateDto;
    userId: string;
    onDismiss: () => void;
};
export const UserEdit = ({ userDto, userId, onDismiss }: UserEditProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();

    const onSubmit = async (data: unknown) => {
        const user = data as IdentityUserUpdateDto;
        try {
            await UserService.userUpdate(userId, { ...userDto, ...user });
            toast({
                title: 'Success',
                description: 'User Updated Successfully',
                variant: 'default'
            });
            setOpen(false);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "User update wasn't successfull.",
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
                    <DialogTitle>Upate a User: {userDto.userName}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex flex-col space-y-5">
                        <Input
                            required
                            placeholder="Name"
                            defaultValue={userDto.name ?? ''}
                            {...register('name')}
                        />

                        <Input
                            required
                            placeholder="Surname"
                            defaultValue={userDto.surname ?? ''}
                            {...register('surname')}
                        />
                        <Input
                            required
                            placeholder="Email"
                            defaultValue={userDto.email ?? ''}
                            {...register('email')}
                        />
                        <Input
                            required
                            placeholder="Phone Number"
                            defaultValue={userDto.phoneNumber ?? ''}
                            {...register('phoneNumber')}
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
