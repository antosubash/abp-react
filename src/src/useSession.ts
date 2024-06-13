import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './lib/hooks/QueryConstants'
import { SessionData } from './lib/session-utils'

export default function useSession() {
  return useQuery({
    queryKey: [QueryNames.GetSession],
    queryFn: async () => {
      const response = await fetch('/session')
      return (await response.json()) as SessionData
    },
  })
}
