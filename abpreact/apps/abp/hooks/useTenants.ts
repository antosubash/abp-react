import { useQuery } from "@tanstack/react-query";
import { QueryNames } from '@abp/utils/Constants';
import { TenantService } from "@abpreact/proxy";

export const useTenants = (page: number, skip: number, take: number) => {
  return useQuery([QueryNames.GetTenants, page], async () => {
    const data = await TenantService.tenantGetList("", "",skip, take);
    return data;
  });
}