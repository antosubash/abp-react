import { QueryNames } from "@abp/utils/Constants";
import { useQuery } from "react-query";
import { AbpApplicationConfigurationService } from './../generated/api/services/AbpApplicationConfigurationService';

export const useAppConfig = () => {
  return useQuery(QueryNames.GetAppConfig, async () => {
    const data  = await AbpApplicationConfigurationService.abpApplicationConfigurationGet()
    return data;
  });
};
