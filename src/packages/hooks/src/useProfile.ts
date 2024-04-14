import { ProfileService, ProfileDto } from '@abpreact/proxy';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';

export const useProfile = (): UseQueryResult<ProfileDto, unknown> => {
	return useQuery({
		queryKey: [QueryNames.GetProfile],
		queryFn: async () => {
			const data = await ProfileService.profileGet();
			return data;
		},
	});
};
