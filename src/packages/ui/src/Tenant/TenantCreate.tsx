import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../Shared/DialogWrapper';
import { useQueryClient } from '@tanstack/react-query';
import { QueryNames } from '@abpreact/hooks';
import { Input } from '../Shared/Input';
import { Button } from '../Shared/Button';
import { TenantCreateDto, TenantService } from '@abpreact/proxy';

export type TenantCreateProps = {};

export const TenantCreate = ({}: TenantCreateProps) => {
    const queryClient = useQueryClient();
    const onSubmit = async (data: any) => {
        var tenant = data as TenantCreateDto;
        var created = await TenantService.tenantCreate(tenant);
        if (created) {
            queryClient.invalidateQueries([QueryNames.GetTenants]);
        }
    };

    return (
        <section className="p-3">
            <Dialog>
                <DialogTrigger className="flex items-center pb-5" asChild>
                    <h3 className="title font-bold text-xl grow p-0 m-1">
                        Tenant Management
                    </h3>
                    <Button variant="default">Create New Tenant</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New Tenant</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>
                        <Input
                            required
                            placeholder="Enter your tenant name"
                            name="name"
                        />
                        <Input
                            required
                            placeholder="yourmail@provider.com"
                            name="adminEmailAddress"
                            type="email"
                        />
                        <Input
                            required
                            placeholder="Password"
                            name="adminPassword"
                            type="password"
                        />
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
};
