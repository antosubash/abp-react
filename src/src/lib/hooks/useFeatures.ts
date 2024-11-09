import { GetFeatureListResultDto, featuresGet } from '@/client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch feature list based on provider name and provider key.
 *
 * @param providerName - The name of the provider.
 * @param providerKey - The key of the provider.
 * @returns A query result containing the feature list.
 */
export const useFeatures = (
  providerName: string | undefined,
  providerKey: string | undefined
): UseQueryResult<GetFeatureListResultDto, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetFeatures, providerName, providerKey],
    queryFn: async () => {
      const data = await featuresGet({ providerName, providerKey })
      return data
    },
  })
}
