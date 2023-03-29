import { useQuery } from '@tanstack/react-query';
import { TenantService } from '@abpreact/proxy';
import { QueryNames } from './QueryConstants';

export const useTenants = (
    pageIndex: number,
    pageSize: number,
    filter?: string | undefined
) => {
    return useQuery(
        [QueryNames.GetTenants, pageIndex, pageSize, filter],
        async () => {
            let skip = 0;
            if (pageIndex > 0) {
                skip = (pageIndex - 1) * pageSize;
            }
            const data = await TenantService.tenantGetList(
                filter,
                '',
                skip,
                pageSize
            );
            return data;
        },
        {
            keepPreviousData: false,
            cacheTime: undefined,
            refetchOnWindowFocus: false
        }
    );
};
