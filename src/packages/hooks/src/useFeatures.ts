import { FeaturesService } from "@abpreact/proxy";
import { useQuery } from "@tanstack/react-query";
import { QueryNames } from "./QueryConstants";

export const useFeatures = (providerName: string | undefined, providerKey: string | undefined) => {
  return useQuery([QueryNames.GetFeatures, providerName], async () => {
    const data = await FeaturesService.featuresGet(providerName, providerKey);
    return data;
  });
};
