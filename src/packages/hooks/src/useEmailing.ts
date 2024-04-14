import { EmailSettingsService, EmailSettingsDto } from '@abpreact/proxy';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';

export const useEmailing = (): UseQueryResult<EmailSettingsDto, unknown> => {
	return useQuery({
		queryKey: [QueryNames.GetEmailing],
		queryFn: async () => {
			const data = await EmailSettingsService.emailSettingsGet();
			return data;
		},
	});
};
