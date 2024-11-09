import { EmailSettingsDto, emailSettingsGet } from '@/client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch email settings using React Query.
 *
 * This hook uses the `useQuery` hook from React Query to fetch email settings data.
 * It returns a `UseQueryResult` containing the email settings data or an error.
 *
 * @returns {UseQueryResult<EmailSettingsDto, unknown>} The result of the email settings query.
 */
export const useEmailing = (): UseQueryResult<EmailSettingsDto, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetEmailing],
    queryFn: async () => {
      const data = await emailSettingsGet()
      return data
    },
  })
}
