import { useQuery } from "@tanstack/react-query";
import { AbpApplicationConfigurationService } from "@abpreact/proxy";
import { QueryNames } from "./QueryConstants";

export const useAppConfig = () => {
  return useQuery([QueryNames.GetAppConfig], async () => {
    const data =
      await AbpApplicationConfigurationService.abpApplicationConfigurationGet();
    return data;
  });
};
