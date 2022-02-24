import axiosInstance from "@abp/utils/axiosInstance";
import { useQuery } from "react-query";
import { PagedResultDtoOfTenantDto } from '@abp/generated/MyProjectModels';
import { QueryNames } from '@abp/utils/Constants';

export const useTenants = (skip: number, take: number) => {
  const url = `/api/multi-tenancy/tenants?SkipCount=${skip}&MaxResultCount=${take}`;
  return useQuery(QueryNames.GetTenants, async () => {
    const { data } = await axiosInstance.get<PagedResultDtoOfTenantDto>(url, {
      clearCacheEntry: true,
    });
    return data;
  });
}