import { FeaturesService } from "@abpreact/proxy";
import { QueryNames } from "@abp/utils/Constants";
import { useQuery } from "@tanstack/react-query";

export const useFeatures = (providerName: string | undefined, providerKey: string | undefined) => {
  return useQuery([QueryNames.GetFeatures, providerName], async () => {
    const data = await FeaturesService.featuresGet(providerName, providerKey);
    return data;
  });
};
