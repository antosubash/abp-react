import { QueryNames } from "@abp/utils/Constants";
import { useQuery } from "react-query";
import { AbpApplicationConfigurationService } from "@abpreact/proxy";

export const useAppConfig = () => {
  return useQuery(QueryNames.GetAppConfig, async () => {
    const data  = await AbpApplicationConfigurationService.abpApplicationConfigurationGet()
    return data;
  });
};
