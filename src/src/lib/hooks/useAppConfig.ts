/**
 * Custom hook to fetch the application configuration using React Query.
 * It uses the `abpApplicationConfigurationGet` function to retrieve the configuration data.
 * The data is considered fresh for 1 hour (staleTime: 60 * 60 * 1000).
 */
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
