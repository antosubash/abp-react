import { useQuery } from '@tanstack/react-query';
import { RoleService } from '@abpreact/proxy';
import { QueryNames } from './QueryConstants';

export const useRoles = (
    pageIndex: number,
    pageSize: number,
    filter?: string | undefined,
    sorting?: string | undefined
) => {
    return useQuery(
        [QueryNames.GetRoles, pageIndex, pageSize, filter, sorting],
        async () => {
            let skip = 0;
            if (pageIndex > 0) {
                skip = (pageIndex - 1) * pageSize;
            }
            const data = await RoleService.roleGetList(
                filter ?? undefined,
                sorting ?? undefined,
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
