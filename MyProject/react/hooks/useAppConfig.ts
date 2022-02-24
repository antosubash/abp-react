import { QueryNames } from "@abp/utils/Constants";
import { useQuery } from "react-query";
import { getAppConfig } from "@abp/services/AppConfigService";

export const useAppConfig = () => {
  return useQuery(QueryNames.GetAppConfig, async () => {
    const { data } = await getAppConfig()
    return data;
  });
};
