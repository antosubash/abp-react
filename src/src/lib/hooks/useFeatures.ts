import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { featuresGet, type GetFeatureListResultDto } from '@/client'
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
): UseQueryResult<GetFeatureListResultDto | undefined, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetFeatures, providerName, providerKey],
    queryFn: async () => {
      const { data } = await featuresGet({
        query: { providerName, providerKey },
      })
      return data
    },
  })
}
