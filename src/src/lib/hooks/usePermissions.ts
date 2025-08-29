import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type GetPermissionListResultDto, permissionsGet } from '@/client'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch permissions based on provider name and provider key.
 *
 * @param providerName - The name of the provider.
 * @param providerKey - The key of the provider.
 * @returns A `UseQueryResult` containing the permission list result.
 */
export const usePermissions = (
  providerName: string | undefined,
  providerKey: string | undefined
): UseQueryResult<GetPermissionListResultDto | undefined, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetPermissions, providerName, providerKey],
    queryFn: async () => {
      if (!providerName || !providerKey) {
        return { groups: [] }
      }
      try {
        const { data } = await permissionsGet({
          query: { providerName, providerKey },
        })
        return data || { groups: [] }
      } catch (error) {
        console.error('Error fetching permissions:', error)
        return { groups: [] }
      }
    },
    enabled: !!providerName && !!providerKey,
  })
}
