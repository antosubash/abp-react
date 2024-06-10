import { useState, useMemo } from 'react';
import { IdentityRoleDto, IdentityRoleUpdateDto } from '@abpreact/proxy';

import { PermissionActions } from '../permission/PermissionActions';
import { RoleEdit } from './RoleEdit';
import { DeleteRole } from './DeleteRole';
import { RolePermission } from './RolePermission';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';
import { ColumnDef, PaginationState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRoles } from '@/lib/hooks/useRoles';
import { USER_ROLE } from '@/lib/utils';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import { QueryNames } from '@/lib/hooks/QueryConstants';

export const RoleList = () => {
    const { toast } = useToast();
    const [searchStr, setSearchStr] = useState<string | undefined>();
    const [roleActionDialog, setRoleActionDialog] = useState<{
        roleId: string;
        roleDto: IdentityRoleUpdateDto;
        dialgoType?: 'edit' | 'permission' | 'delete';
    } | null>();

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    },
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
						queryClient.invalidateQueries({ queryKey: [QueryNames.GetRoles]});
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
						queryClient.invalidateQueries({ queryKey: [QueryNames.GetRoles]});
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