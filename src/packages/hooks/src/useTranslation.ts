import { AbpApplicationLocalizationService } from '@abpreact/proxy';
import { useQuery } from '@tanstack/react-query';
import { QueryNames } from './QueryConstants';

export const useTranslation = () => {
    return useQuery([QueryNames.GetTranslations], async () => {
        const data =
            await AbpApplicationLocalizationService.abpApplicationLocalizationGet(
                'en'
            );
        return data;
    });
};
