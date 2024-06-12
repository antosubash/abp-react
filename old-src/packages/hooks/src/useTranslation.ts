import { AbpApplicationLocalizationService } from '@abpreact/proxy';
import { useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';

export const useTranslation = () => {
    return useQuery(
		{
			queryKey: [QueryNames.GetTranslations],
			queryFn: async () => {
				const data = await AbpApplicationLocalizationService.abpApplicationLocalizationGet("en");
				return data;
			},
		}
	);
};
