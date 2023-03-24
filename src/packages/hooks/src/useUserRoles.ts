import { UserService } from '@abpreact/proxy';
import { useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';

type UseUserRolesProps = {
    userId: string;
};
export const useUserRoles = ({ userId }: UseUserRolesProps) => {
    return useQuery([QueryNames.GetUserRoles, userId], async () => {
        return await UserService.userGetRoles(userId);
    });
};
