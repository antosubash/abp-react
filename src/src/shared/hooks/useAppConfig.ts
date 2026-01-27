/**
 * Custom hook to fetch the application configuration using React Query.
 * It uses the `abpApplicationConfigurationGet` function to retrieve the configuration data.
 * The data is considered fresh for 1 hour (staleTime: 60 * 60 * 1000).
 */
import { abpApplicationConfigurationGet, ApplicationConfigurationDto } from '@/client'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

export const useAppConfig = (): UseQueryResult<ApplicationConfigurationDto, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetAppConfig],
    queryFn: async () => {
      try {
        const response = await abpApplicationConfigurationGet()
        const data = response.data

        // Ensure we return a valid configuration object even if the API returns undefined
        if (!data) {
          console.warn('App config API returned undefined, using default configuration')
          return {
            localization: undefined,
            auth: undefined,
            setting: undefined,
            currentUser: undefined,
            features: undefined,
            globalFeatures: undefined,
            multiTenancy: undefined,
            currentTenant: undefined,
            timing: undefined,
            clock: undefined,
            objectExtensions: undefined,
            extraProperties: undefined,
          } as ApplicationConfigurationDto
        }

        return data
      } catch (error) {
        console.error('Error fetching app config:', error)
        // Return a minimal valid configuration on error
        return {
          localization: undefined,
          auth: undefined,
          setting: undefined,
          currentUser: undefined,
          features: undefined,
          globalFeatures: undefined,
          multiTenancy: undefined,
          currentTenant: undefined,
          timing: undefined,
          clock: undefined,
          objectExtensions: undefined,
          extraProperties: undefined,
        } as ApplicationConfigurationDto
      }
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}
