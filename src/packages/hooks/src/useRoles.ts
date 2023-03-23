import { useQuery } from '@tanstack/react-query';
import { RoleService } from '@abpreact/proxy';
import { QueryNames } from './QueryConstants';

export const useRoles = (page: number, skip: number, take: number) => {
    return useQuery([QueryNames.GetRoles, page], async () => {
        const data = await RoleService.roleGetList('', '', skip, take);
        return data;
    });
};
