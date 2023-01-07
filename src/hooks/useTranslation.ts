import { AbpApplicationLocalizationService } from "@abp/generated/api";
import { QueryNames } from "@abp/utils/Constants";
import { useQuery } from "react-query";

export const useTranslation = () => {
  return useQuery(QueryNames.GetTranslations, async () => {
    const data  = await AbpApplicationLocalizationService.abpApplicationLocalizationGet("en")
    return data;
  });
};
