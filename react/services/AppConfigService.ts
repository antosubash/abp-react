import { ApplicationConfigurationDto } from "@abp/generated/MyProjectModels";
import axiosInstance from "@abp/utils/axiosInstance";

export const getAppConfig = async () => {
  return await axiosInstance.get<ApplicationConfigurationDto>(
    "/api/abp/application-configuration"
  );
};
