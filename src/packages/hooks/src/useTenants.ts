import { useQuery } from '@tanstack/react-query';
import { TenantService } from '@abpreact/proxy';
import { QueryNames } from './QueryConstants';

export const useTenants = (page: number, skip: number, take: number) => {
    return useQuery([QueryNames.GetTenants, page], async () => {
        const data = await TenantService.tenantGetList('', '', skip, take);
        return data;
    });
};
