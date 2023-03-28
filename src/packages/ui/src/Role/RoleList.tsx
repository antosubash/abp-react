import { useState, useMemo } from 'react';
import { QueryNames, useRoles } from '@abpreact/hooks';
import {
    PaginationState,
    useReactTable,
    getCoreRowModel,
    ColumnDef
} from '@tanstack/react-table';
import { IdentityRoleDto, IdentityRoleUpdateDto } from '@abpreact/proxy';

import { PermissionActions } from '../Permission/PermissionActions';
import { CustomTable } from '../Shared/CustomTable';
import Loader from '../Shared/Loader';
import Error from '../Shared/Error';
import { useToast } from '../Shared/hooks/useToast';
import { USER_ROLE } from '../utils';
import { RoleEdit } from './RoleEdit';
import { DeleteRole } from './DeleteRole';
import { RolePermission } from './RolePermission';
import { useQueryClient } from '@tanstack/react-query';
import { Search } from '../Shared/Search';

export const RoleList = () => {
    const { toast } = useToast();
    const [searchStr, setSearchStr] = useState<string | undefined>();
    const [roleActionDialog, setRoleActionDialog] = useState<{
        roleId: string;
        roleDto: IdentityRoleUpdateDto;
        dialgoType?: 'edit' | 'permission' | 'delete';
    } | null>();

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10
    });

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        [pageIndex, pageSize, toast]
    );

    const { isLoading, data, isError } = useRoles(
        pageIndex,
        pageSize,
        searchStr
    );
    const queryClient = useQueryClient();

    const defaultColumns: ColumnDef<IdentityRoleDto>[] = useMemo(
        () => [
            {
                header: 'Role Management',
                columns: [
                    {
                        accessorKey: 'name',
                        header: 'Name',
                        cell: (info) => info.getValue()
                    },
                    {
                        accessorKey: 'is_default',
                        header: 'Is Default',
                        cell: (info) =>
                            info.row.original?.isDefault ? 'Yes' : 'No'
                    },
                    {
                        accessorKey: 'is_public',
                        header: 'Is Public',
                        cell: (info) =>
                            info.row.original?.isPublic ? 'Yes' : 'No'
                    },
                    {
                        accessorKey: 'actions',
                        header: 'Actions',
                        cell: (info) => {
                            console.log(info.row);
                            return (
                                <PermissionActions
                                    actions={[
                                        {
                                            icon: 'permission',
                                            policy: 'AbpIdentity.Roles.ManagePermissions',
                                            callback: () => {
                                                setRoleActionDialog({
                                                    roleId: info.row.original
                                                        .id as string,
                                                    roleDto: info.row
                                                        .original as IdentityRoleUpdateDto,
                                                    dialgoType: 'permission'
                                                });
                                            }
                                        },
                                        {
                                            icon: 'pencil',
                                            policy: 'AbpIdentity.Roles.Update',
                                            callback: () => {
                                                setRoleActionDialog({
                                                    roleId: info.row.original
                                                        .id as string,
                                                    roleDto: info.row
                                                        .original as IdentityRoleUpdateDto,
                                                    dialgoType: 'edit'
                                                });
                                            }
                                        },
                                        {
                                            icon: 'trash',
                                            policy: 'AbpIdentity.Roles.Delete',
                                            visible:
                                                info.row.original.name?.includes(
                                                    USER_ROLE.ADMIN
                                                ),
                                            callback: () => {
                                                setRoleActionDialog({
                                                    roleId: info.row.original
                                                        .id as string,
                                                    roleDto: info.row
                                                        .original as IdentityRoleUpdateDto,
                                                    dialgoType: 'delete'
                                                });
                                            }
                                        }
                                    ]}
                                />
                            );
                        }
                    }
                ]
            }
        ],
        []
    );

    const onSearchUpdateEvent = (value: string) => {
        setSearchStr(value);
    };

    const table = useReactTable({
        data: data?.items ?? [],
        pageCount: data?.totalCount ?? -1,
        state: {
            pagination
        },
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        manualPagination: true
    });

    if (isLoading) return <Loader />;
    if (isError) return <Error />;

    return (
        <>
            {roleActionDialog?.dialgoType === 'edit' && (
                <RoleEdit
                    roleId={roleActionDialog.roleId}
                    roleDto={roleActionDialog.roleDto}
                    onDismiss={() => {
                        queryClient.invalidateQueries([QueryNames.GetRoles]);
                        setRoleActionDialog(null);
                    }}
                />
            )}
            {roleActionDialog?.dialgoType === 'delete' && (
                <DeleteRole
                    role={{
                        roleId: roleActionDialog.roleId,
                        roleName: roleActionDialog.roleDto.name
                    }}
                    onDismiss={() => {
                        queryClient.invalidateQueries([QueryNames.GetRoles]);
                        setRoleActionDialog(null);
                    }}
                />
            )}
            {roleActionDialog &&
                roleActionDialog.dialgoType === 'permission' && (
                    <RolePermission
                        roleDto={roleActionDialog.roleDto}
                        onDismiss={() => setRoleActionDialog(null)}
                    />
                )}

            <Search onUpdate={onSearchUpdateEvent} value={searchStr ?? ''} />
            <CustomTable<IdentityRoleDto>
                table={table}
                totalCount={data?.totalCount ?? 0}
                pageSize={pageSize}
            />
        </>
    );
};
