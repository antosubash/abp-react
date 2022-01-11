import { ListResultDtoOfIdentityRoleDto } from "@abp/generated/MyProjectModels";
import { useRequest } from "./useRequest";

export const useRoles = (skip: number, take: number) => {
  const url = `/api/identity/roles?SkipCount=${skip}&MaxResultCount=${take}`;
  const { data, error } = useRequest<ListResultDtoOfIdentityRoleDto>(url);
  return {
    roles: data?.items,
    isLoading: !error && !data,
    isError: error,
  };
};
