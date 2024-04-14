import { FeaturesService, GetFeatureListResultDto } from '@abpreact/proxy';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';

export const useFeatures = (
	providerName: string | undefined,
	providerKey: string | undefined,
): UseQueryResult<GetFeatureListResultDto, unknown> => {
	return useQuery({
		queryKey: [QueryNames.GetFeatures, providerName, providerKey],
		queryFn: async () => {
			const data = await FeaturesService.featuresGet(providerName, providerKey);
			return data;
		},
	});
};
