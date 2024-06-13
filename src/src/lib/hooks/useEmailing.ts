import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'
import { EmailSettingsDto, emailSettingsGet } from '@/client'

export const useEmailing = (): UseQueryResult<EmailSettingsDto, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetEmailing],
    queryFn: async () => {
      const data = await emailSettingsGet()
      return data
    },
  })
}
