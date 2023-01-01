import { useQuery } from "react-query";
import { QueryNames } from "@abp/utils/Constants";
import { getUsers } from "@abp/services/UserService";

export const useUsers = (page: number = 0, skip: number, take: number) => {
  return useQuery(
    [QueryNames.GetUsers, page],
    async () => {
      const { data } = await getUsers(skip, take);
      return data;
    },
    { keepPreviousData: true }
  );
};
