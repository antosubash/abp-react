import { useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';
import { userGetRoles } from '@/client';

type UseUserRolesProps = {
    userId: string;
};
export const useUserRoles = ({ userId }: UseUserRolesProps) => {
	return useQuery({
		queryKey: [QueryNames.GetUserRoles, userId],
		queryFn: async () => {
			const data = await userGetRoles({ id: userId});
			return data;
		},
	});
};
