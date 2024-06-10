import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
	ApplicationConfigurationDto,
	abpApplicationConfigurationGet,
} from "@/client";
import { QueryNames } from "./QueryConstants";

export const useAppConfig = (): UseQueryResult<
	ApplicationConfigurationDto,
	unknown
> => {
	return useQuery({
		queryKey: [QueryNames.GetAppConfig],
		queryFn: async () => {
			const data =
				await abpApplicationConfigurationGet();
			return data;
		},
		staleTime: 60 * 60 * 1000, // 1 hour
	});
};
