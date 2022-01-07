import { PagedResultDtoOfIdentityUserDto } from "@abp/generated/MyProjectModels";
import axiosInstance from "@abp/utils/axiosInstance";

export const getUsers = async () => {
    return await axiosInstance.get<PagedResultDtoOfIdentityUserDto>('/api/identity/users');
}