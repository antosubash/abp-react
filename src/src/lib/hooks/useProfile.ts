import { ProfileDto, profileGet } from '@/client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

export const useProfile = (): UseQueryResult<ProfileDto, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetProfile],
    queryFn: async () => {
      const data = await profileGet()
      return data
    },
  })
}
