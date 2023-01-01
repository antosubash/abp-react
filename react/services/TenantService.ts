import { PagedResultDtoOfTenantDto, TenantCreateDto, TenantDto, TenantUpdateDto } from "@abp/generated/MyProjectModels"
import axiosInstance from "@abp/utils/axiosInstance"

export const getTenants = async (skip: number = 0, take: number = 100) => {
    return await axiosInstance.get<PagedResultDtoOfTenantDto>(`/api/multi-tenancy/tenants?SkipCount=${skip}&MaxResultCount=${take}`)
}

export const getTenant = async (id: string) => {
    return await axiosInstance.get<TenantDto>(`/api/multi-tenancy/tenants/${id}`);
}

export const createTenant = async (tenant: TenantCreateDto) => {
    return await axiosInstance.post<TenantDto>(`/api/multi-tenancy/tenants`, tenant);
}

export const updateTenant = async (id: string, tenant: TenantUpdateDto) => {
    return await axiosInstance.put<TenantDto>(`/api/multi-tenancy/tenants/${id}`, tenant);
}

export const deleteTenant = async (id: string) => {
    return await axiosInstance.delete(`/api/multi-tenancy/tenants/${id}`);
}