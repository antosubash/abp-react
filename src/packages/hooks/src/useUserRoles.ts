import { UserService } from '@abpreact/proxy';
import { useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';

type UseUserRolesProps = {
    userId: string;
};
export const useUserRoles = ({ userId }: UseUserRolesProps) => {
	return useQuery({
		queryKey: [QueryNames.GetUserRoles, userId],
		queryFn: async () => {
			const data = await UserService.userGetRoles(userId);
			return data;
		},
	});
};
