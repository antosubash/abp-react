import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'
import { GetPermissionListResultDto, permissionsGet } from '@/client'

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
