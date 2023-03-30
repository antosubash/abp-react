import { QueryNames, useProfile } from '@abpreact/hooks';
import { ProfileService, UpdateProfileDto } from '@abpreact/proxy';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '../Shared/Button';
import Error from '../Shared/Error';
import { useToast } from '../Shared/hooks/useToast';
import { Input } from '../Shared/Input';
import Loader from '../Shared/Loader';

export const ProfileSettings = () => {
    const { data, isLoading, isError } = useProfile();
    const { handleSubmit, register } = useForm();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const onSubmit = async (data: UpdateProfileDto) => {
        try {
            await ProfileService.profileUpdate(data);
            toast({
                title: 'Success',
                description: 'Profile has been updated successfully.',
                variant: 'default'
            });
            queryClient.invalidateQueries([QueryNames.GetProfile]);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast({
                    title: 'Failed',
                    description: "Profile update wasn't successful.",
                    variant: 'destructive'
                });
            }
        }
    };

    if (isLoading) return <Loader />;
    if (isError) return <Error />;

    return (
        <section className="mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <Input
                    type="text"
                    defaultValue={data.userName!}
                    required
                    label="User name"
                    {...register('userName')}
                />
                <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                        type="text"
                        defaultValue={data.name!}
                        required
                        label="Name"
                        {...register('name')}
                    />
                    <Input
                        type="text"
                        defaultValue={data.surname!}
                        required
                        label="Surname"
                        {...register('surname')}
                    />
                </div>
                <Input
                    type="email"
                    defaultValue={data.email!}
                    required
                    label="Email address"
                    {...register('email')}
                />
                <Input
                    type="text"
                    defaultValue={data.phoneNumber!}
                    required
                    label="Phone number"
                    {...register('phoneNumber')}
                />

                <Button variant="subtle" type="submit">
                    Save
                </Button>
            </form>
        </section>
    );
};
