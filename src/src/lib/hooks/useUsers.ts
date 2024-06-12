import { useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';
import { userGetList } from '@/client';

export const useUsers = (
	pageIndex: number,
	pageSize: number,
	filter?: string | undefined,
	sorting?: string | undefined,
) => {
	return useQuery({
		queryKey: [QueryNames.GetUsers, pageIndex, pageSize, filter, sorting],
		queryFn: async () => {
			let skip = 0;
			if (pageIndex > 0) {
				skip = pageIndex * pageSize;
			}
			const data = await userGetList(
				{
					maxResultCount: pageSize,
					skipCount: skip,
					filter: filter,
					sorting: sorting,
				}
			);
			return data;
		},
	});
};
