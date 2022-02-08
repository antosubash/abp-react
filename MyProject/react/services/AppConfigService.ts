import { ApplicationConfigurationDto } from "@abp/generated/MyProjectModels";
import axiosInstance from "@abp/utils/axiosInstance";

export const getAppConfig = async (clearCache = false) => {
  return await axiosInstance.get<ApplicationConfigurationDto>(
    "/api/abp/application-configuration",
    {
      clearCacheEntry: clearCache,
    }
  );
};
