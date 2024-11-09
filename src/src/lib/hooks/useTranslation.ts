import { abpApplicationLocalizationGet } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch translation data.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch the translation data
 * asynchronously. The query key used is `QueryNames.GetTranslations`.
 *
 * @returns {UseQueryResult} The result of the query, which includes the translation data and query status.
 */
export const useTranslation = () => {
  return useQuery({
    queryKey: [QueryNames.GetTranslations],
    queryFn: async () => {
      const data = await abpApplicationLocalizationGet({ cultureName: 'en' })
      return data
    },
  })
}
