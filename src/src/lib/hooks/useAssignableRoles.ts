import { userGetAssignableRoles } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

export const useAssignableRoles = () => {
  return useQuery({
    queryKey: [QueryNames.GetAssignableRoles],
    queryFn: async () => {
      const data = await userGetAssignableRoles()
      return data
    },
  })
}
