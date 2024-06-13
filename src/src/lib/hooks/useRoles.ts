import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'
import { roleGetList } from '@/client'

export const useRoles = (
  pageIndex: number,
  pageSize: number,
  filter?: string | undefined,
  sorting?: string | undefined
) => {
  return useQuery({
    queryKey: [QueryNames.GetRoles, pageIndex, pageSize, filter, sorting],
    queryFn: async () => {
      let skip = 0
      if (pageIndex > 0) {
        skip = pageIndex * pageSize
      }
      const data = await roleGetList({
        maxResultCount: pageSize,
        skipCount: skip,
        filter: filter,
        sorting: sorting,
      })
      return data
    },
  })
}
