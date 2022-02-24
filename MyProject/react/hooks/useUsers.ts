import { ListResultDtoOfUserData } from "@abp/generated/MyProjectModels";
import { useQuery } from "react-query";
import axiosInstance  from '@abp/utils/axiosInstance';
import { QueryNames } from '@abp/utils/Constants';

export const useUsers = (skip: number, take: number) => {
  const url = `/api/identity/users?SkipCount=${skip}&MaxResultCount=${take}`;
  return useQuery(QueryNames.GetUsers, async () => {
    const { data } = await axiosInstance.get<ListResultDtoOfUserData>(url, {
      clearCacheEntry: true,
    });
    return data;
  });
};
