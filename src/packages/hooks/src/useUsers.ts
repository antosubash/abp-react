import { useQuery } from "@tanstack/react-query";
import { UserService } from "@abpreact/proxy";
import { QueryNames } from "./QueryConstants";

export const useUsers = (pageIndex: number, pageSize: number) => {
  return useQuery(
    [QueryNames.GetUsers, pageIndex, pageSize],
    async () => {
      let skip = 0;
      if (pageIndex > 0) {
        skip = (pageIndex - 1) * pageSize;
      }
      const data = await UserService.userGetList("", "", skip, pageSize);
      return data;
    },
    {
      refetchInterval: 2000,
    }
  );
};
