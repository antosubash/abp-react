import { AbpApplicationLocalizationService } from "@abpreact/proxy";
import { QueryNames } from "@abp/utils/Constants";
import { useQuery } from "@tanstack/react-query";

export const useTranslation = () => {
  return useQuery([QueryNames.GetTranslations], async () => {
    const data  = await AbpApplicationLocalizationService.abpApplicationLocalizationGet("en")
    return data;
  });
};
