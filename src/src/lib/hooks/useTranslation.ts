import { abpApplicationLocalizationGet } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

export const useTranslation = () => {
  return useQuery({
    queryKey: [QueryNames.GetTranslations],
    queryFn: async () => {
      const data = await abpApplicationLocalizationGet({ cultureName: 'en' })
      return data
    },
  })
}
