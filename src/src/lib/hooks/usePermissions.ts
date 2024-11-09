import { GetPermissionListResultDto, permissionsGet } from '@/client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
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
): UseQueryResult<GetPermissionListResultDto, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetPermissions, providerName, providerKey],
    queryFn: async () => {
      const data = await permissionsGet({ providerName, providerKey })
      return data
    },
  })
}
