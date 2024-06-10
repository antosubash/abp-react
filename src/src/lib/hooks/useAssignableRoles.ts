import { useQuery } from '@tanstack/react-query';
import { userGetAssignableRoles } from '@/client';
import { QueryNames } from './QueryConstants';

export const useAssignableRoles = () => {
	return useQuery({
		queryKey: [QueryNames.GetAssignableRoles],
		queryFn: async () => {
			const data = await userGetAssignableRoles();
			return data;
		},
	});
};
