import { FeaturesService } from "@abp/generated/api";
import { QueryNames } from "@abp/utils/Constants";
import { useQuery } from "react-query";

export const useFeatures = (providerName: string | undefined, providerKey: string | undefined) => {
  return useQuery([QueryNames.GetFeatures, providerName], async () => {
    const data = await FeaturesService.featuresGet(providerName, providerKey);
    return data;
  });
};
