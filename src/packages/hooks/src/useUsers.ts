import { useQuery } from '@tanstack/react-query';
import { UserService } from '@abpreact/proxy';
import { QueryNames } from './QueryConstants';

export const useUsers = (
    pageIndex: number,
    pageSize: number,
    filter?: string | undefined,
    sorting?: string | undefined
) => {
    return useQuery(
        [QueryNames.GetUsers, pageIndex, pageSize, filter, sorting],
        async () => {
            let skip = 0;
            if (pageIndex > 0) {
                skip = pageIndex * pageSize;
            }

            const data = await UserService.userGetList(
                filter ? filter : undefined,
                sorting ? sorting : undefined,
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
