import { useQuery } from "react-query";
import { QueryNames } from '@abp/utils/Constants';
import { getRoles } from "@abp/services/RoleService";

export const useRoles = (page: number, skip: number, take: number) => {
  return useQuery([QueryNames.GetRoles, page], async () => {
    const { data } = await getRoles(skip, take);
    return data;
  });
};
