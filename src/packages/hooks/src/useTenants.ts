import { useQuery } from '@tanstack/react-query';
import { TenantService } from '@abpreact/proxy';
import { QueryNames } from './QueryConstants';

export const useTenants = (pageIndex: number, pageSize: number) => {
    return useQuery([QueryNames.GetTenants, pageIndex, pageSize], async () => {
        let skip = 0;
        if (pageIndex > 0) {
            skip = (pageIndex - 1) * pageSize;
        }
        const data = await TenantService.tenantGetList('', '', skip, pageSize);
        return data;
    });
};
