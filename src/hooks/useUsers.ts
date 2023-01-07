import { useQuery } from "react-query";
import { QueryNames } from "@abp/utils/Constants";
import { UserService } from "@abp/generated/api";

export const useUsers = (pageIndex: number, pageSize: number) => {
  return useQuery(
    [QueryNames.GetUsers, pageIndex, pageSize],
    async () => {
      var skip = 0;
      if (pageIndex > 0) {
        skip = (pageIndex - 1) * pageSize;
      }
      const data = await UserService.userGetList("", "", skip, pageSize);
      return data;
    },
    { keepPreviousData: true }
  );
};
