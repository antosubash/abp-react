import { QueryNames } from "@abp/utils/Constants";
import { useQuery } from "react-query";
import { getFeatures } from "@abp/services/FeatureService";

export const useFeatures = (providerName: string | undefined, providerKey: string | undefined) => {
  return useQuery([QueryNames.GetFeatures, providerName], async () => {
    const { data } = await getFeatures(providerName, providerKey);
    return data;
  });
};
