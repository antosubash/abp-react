import { ListResultDtoOfIdentityRoleDto } from "@abp/generated/MyProjectModels";
import { useRequest } from "./useRequest";

export const useTenants = (skip: number, take: number) => {
  const url = `/api/multi-tenancy/tenants?SkipCount=${skip}&MaxResultCount=${take}`;
  const { data, error } = useRequest<ListResultDtoOfIdentityRoleDto>(url);
  return {
    tenants: data?.items,
    isLoading: !error && !data,
    isError: error,
  };
}