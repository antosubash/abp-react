import axiosInstance from "@abp/utils/axiosInstance";
import { QueryNames } from "@abp/utils/Constants";
import { useQuery } from "react-query";
import { getAppConfig } from "@abp/services/AppConfigService";

export const useAppConfig = (clearCache = true) => {
  return useQuery("AppConfig", async () => {
    const { data } = await getAppConfig(clearCache)
    return data;
  });
};
