import { useQuery } from "react-query";
import { QueryNames } from "@abp/utils/Constants";
import { UserService } from "@abp/generated/api";

export const useUsers = (page: number = 0, skip: number, take: number) => {
  return useQuery(
    [QueryNames.GetUsers, page],
    async () => {
      const data = await UserService.userGetList("", "", skip, take);
      return data;
    },
    { keepPreviousData: true }
  );
};
