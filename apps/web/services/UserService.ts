import { IdentityUserCreateDto, IdentityUserDto, IdentityUserUpdateDto, ListResultDtoOfIdentityRoleDto, PagedResultDtoOfIdentityUserDto } from "@abp/generated/MyProjectModels";
import axiosInstance from "@abp/utils/axiosInstance";

export const getUsers = async (skip: number = 0, take: number = 100) => {
  return await axiosInstance.get<PagedResultDtoOfIdentityUserDto>(
    `/api/identity/users?SkipCount=${skip}&MaxResultCount=${take}`
  );
};

export const getUser = async (id: string) => {
    return await axiosInstance.get<IdentityUserDto>(`/api/identity/users/${id}`);
}

export const createUser = async (user: IdentityUserCreateDto) => {
    return await axiosInstance.post<IdentityUserDto>(`/api/identity/users`, user);
}

export const updateUser = async (id: string, user: IdentityUserUpdateDto) => {
    return await axiosInstance.put<IdentityUserDto>(`/api/identity/users/${id}`, user);
}

export const deleteUser = async (id: string) => {
    return await axiosInstance.delete(`/api/identity/users/${id}`);
}

export const getUserRoles = async (id: string) => {
    return await axiosInstance.get<ListResultDtoOfIdentityRoleDto>(`/api/identity/users/${id}/roles`);
}

export const updateUserRole = async (id: string, roleNames: string[]) => {
    return await axiosInstance.put(`/api/identity/users/${id}/roles`, { roleNames });
}

export const getAssignedRoles = async (id: string) => {
    return await axiosInstance.get<ListResultDtoOfIdentityRoleDto>(`/api/identity/users/${id}/assignable-roles`);
}