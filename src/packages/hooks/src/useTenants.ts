import { useQuery } from '@tanstack/react-query';
import { TenantService } from '@abpreact/proxy';
import { QueryNames } from './QueryConstants';

export const useTenants = (
	pageIndex: number,
	pageSize: number,
	filter?: string | undefined,
	sorting?: string | undefined,
) => {
	return useQuery({
		queryKey: [QueryNames.GetTenants, pageIndex, pageSize, filter, sorting],
		queryFn: async () => {
			let skip = 0;
			if (pageIndex > 0) {
				skip = pageIndex * pageSize;
			}
			const data = await TenantService.tenantGetList(
				filter ? filter : undefined,
				sorting ? sorting : undefined,
				skip,
				pageSize,
			);
			return data;
		},
	});
};
