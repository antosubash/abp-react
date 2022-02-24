import { ListResultDtoOfIdentityRoleDto } from "@abp/generated/MyProjectModels";
import axiosInstance from "@abp/utils/axiosInstance";
import { useQuery } from "react-query";
import { QueryNames } from '@abp/utils/Constants';

export const useRoles = (skip: number, take: number) => {
  const url = `/api/identity/roles?SkipCount=${skip}&MaxResultCount=${take}`;
  return useQuery(QueryNames.GetRoles, async () => {
    const { data } = await axiosInstance.get<ListResultDtoOfIdentityRoleDto>(
      url,
      {
        clearCacheEntry: true,
      }
    );
    return data;
  });
};
