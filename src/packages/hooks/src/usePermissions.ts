import { PermissionsService, GetPermissionListResultDto } from "@abpreact/proxy";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { QueryNames } from "./QueryConstants";

export const usePermissions = (
  providerName: string | undefined,
  providerKey: string | undefined
): UseQueryResult<GetPermissionListResultDto, unknown> => {
  return useQuery([QueryNames.GetPermissions, providerName], async () => {
    const data = await PermissionsService.permissionsGet(providerName, providerKey);
    return data;
  });
};
