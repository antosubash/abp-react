import { ListResultDtoOfUserData } from "@abp/generated/MyProjectModels";
import { useRequest } from "./useRequest";

export const useUsers = (skip: number, take: number) => {
  const url = `/api/identity/users?SkipCount=${skip}&MaxResultCount=${take}`;
  const { data, error } = useRequest<ListResultDtoOfUserData>(url);
  return {
    users: data?.items,
    isLoading: !error && !data,
    isError: error,
  };
};
