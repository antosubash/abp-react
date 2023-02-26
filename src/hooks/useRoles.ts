import { useQuery } from "react-query";
import { QueryNames } from '@abp/utils/Constants';
import { RoleService } from "@abpreact/proxy";

export const useRoles = (page: number, skip: number, take: number) => {
  return useQuery([QueryNames.GetRoles, page], async () => {
    const data = await RoleService.roleGetList("", "", skip, take);
    return data;
  });
};
