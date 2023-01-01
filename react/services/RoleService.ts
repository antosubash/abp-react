import { IdentityRoleCreateDto, IdentityRoleDto, IdentityRoleUpdateDto, PagedResultDtoOfIdentityRoleDto } from "@abp/generated/MyProjectModels";
import axiosInstance from "@abp/utils/axiosInstance";

export const getRoles = async (skip: number = 0, take: number = 100) => {
  return await axiosInstance.get<PagedResultDtoOfIdentityRoleDto>(
    `/api/identity/roles?SkipCount=${skip}&MaxResultCount=${take}`
  );
};

export const getRole = async (id: string) => {
    return await axiosInstance.get<IdentityRoleDto>(`/api/identity/roles/${id}`);
}

export const createRole = async (role: IdentityRoleCreateDto) => {
    return await axiosInstance.post<IdentityRoleDto>(`/api/identity/roles`, role);
}

export const updateRole = async (id: string, role: IdentityRoleUpdateDto) => {
    return await axiosInstance.put<IdentityRoleDto>(`/api/identity/roles/${id}`, role);
}

export const deleteRole = async (id: string) => {
    return await axiosInstance.delete(`/api/identity/roles/${id}`);
}

