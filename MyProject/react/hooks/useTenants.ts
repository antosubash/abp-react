import { useQuery } from "react-query";
import { QueryNames } from '@abp/utils/Constants';
import { getTenants } from "@abp/services/TenantService";

export const useTenants = (skip: number, take: number) => {
  return useQuery(QueryNames.GetTenants, async () => {
    const { data } = await getTenants(skip, take);
    return data;
  });
}