import { userGetRoles } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

type UseUserRolesProps = {
  userId: string
}
export const useUserRoles = ({ userId }: UseUserRolesProps) => {
  return useQuery({
    queryKey: [QueryNames.GetUserRoles, userId],
    queryFn: async () => {
      const data = await userGetRoles({ id: userId })
      return data
    },
  })
}
