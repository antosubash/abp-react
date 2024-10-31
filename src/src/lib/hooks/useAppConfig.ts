import {abpApplicationConfigurationGet, ApplicationConfigurationDto} from '@/client'
import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {QueryNames} from './QueryConstants'

export const useAppConfig = (): UseQueryResult<ApplicationConfigurationDto, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetAppConfig],
    queryFn: async () => {
      return abpApplicationConfigurationGet();
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}
