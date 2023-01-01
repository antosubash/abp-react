import { GetFeatureListResultDto } from "@abp/generated/MyProjectModels";
import axiosInstance from "@abp/utils/axiosInstance";

export const getFeatures = async (
  providerName: string | undefined,
  providerKey: string | undefined
) => {
  if (providerKey && providerName) {
    return await axiosInstance.get<GetFeatureListResultDto>(
      `/api/feature-management/features?providerName=${providerName}&providerKey=${providerKey}`
    );
  }

  if(providerName){
    return await axiosInstance.get<GetFeatureListResultDto>(
      `/api/feature-management/features?providerName=${providerName}`
    );
  }

  throw new Error("providerName is required");
};
