import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';
import { GetFeatureListResultDto, featuresGet } from '@/client';

export const useFeatures = (
	providerName: string | undefined,
	providerKey: string | undefined,
): UseQueryResult<GetFeatureListResultDto, unknown> => {
	return useQuery({
		queryKey: [QueryNames.GetFeatures, providerName, providerKey],
		queryFn: async () => {
			const data = await featuresGet({ providerName, providerKey });
			return data;
		},
	});
};
