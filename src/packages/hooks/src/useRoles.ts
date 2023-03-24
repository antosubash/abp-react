import { useQuery } from '@tanstack/react-query';
import { RoleService } from '@abpreact/proxy';
import { QueryNames } from './QueryConstants';

export const useRoles = (pageIndex: number, pageSize: number) => {
    return useQuery([QueryNames.GetRoles, pageIndex, pageSize], async () => {
        let skip = 0;
        if (pageIndex > 0) {
            skip = (pageIndex - 1) * pageSize;
        }
        const data = await RoleService.roleGetList('', '', skip, pageSize);
        return data;
    });
};
