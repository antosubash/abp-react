"use client";
import { useUsers } from '@/lib/hooks/useUsers';
import { QueryNames } from '@/lib/hooks/QueryConstants';
import { useMemo, useState } from 'react';

import {
    PaginationState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef
} from '@tanstack/react-table';
import { IdentityUserDto, IdentityUserUpdateDto } from '@/client';
import { CustomTable } from '@/components/ui/CustomTable';
import Loader from '@/components/ui/Loader';
import Error from '@/components/ui/Error';

import { useToast } from '@/components/ui/use-toast';
import { UserEdit } from './UserEdit';
import { UserPermission } from './UserPermission';
import { DeleteUser } from './DeleteUser';
import { PermissionActions } from '../permission/PermissionActions';

import { USER_ROLE } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Search } from '@/components/ui/Search';

export const UserList = () => {
    const { toast } = useToast();

    const [searchStr, setSearchStr] = useState<string | undefined>();
    const [userActionDialog, setUserActionDialog] = useState<{
        userId: string;
        userDto: IdentityUserUpdateDto;
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
        [pageIndex, pageSize, toast, searchStr]
    );

    const { isLoading, data, isError } = useUsers(
        pagination.pageIndex,
        pagination.pageSize,
        searchStr
    );

    const queryClient = useQueryClient();

    const defaultColumns: ColumnDef<IdentityUserDto>[] = useMemo(
        () => [
            {
                header: 'User Management',
                columns: [
                    {
                        accessorKey: 'actions',
                        header: 'Actions',
                        cell: (info) => (
                            <PermissionActions
                                actions={[
                                    {
                                        icon: 'permission',
                                        policy: 'AbpIdentity.Users.ManagePermissions',
                                        callback: () => {
                                            setUserActionDialog({
                                                userId: info.row.original
                                                    .id as string,
                                                userDto: info.row
                                                    .original as IdentityUserUpdateDto,
                                                dialgoType: 'permission'
                                            });
                                        }
                                    },
                                    {
                                        icon: 'pencil',
                                        policy: 'AbpIdentity.Users.Update',
                                        callback: () => {
                                            setUserActionDialog({
                                                userId: info.row.original
                                                    .id as string,
                                                userDto: info.row
                                                    .original as IdentityUserUpdateDto,
                                                dialgoType: 'edit'
                                            });
                                        }
                                    },
                                    {
                                        icon: 'trash',
                                        policy: 'AbpIdentity.Users.Delete',
                                        visible:
                                            info.row.original.userName?.includes(
                                                USER_ROLE.ADMIN
                                            ),
                                        callback: () => {
                                            setUserActionDialog({
                                                userId: info.row.original
                                                    .id as string,
                                                userDto: info.row
                                                    .original as IdentityUserUpdateDto,
                                                dialgoType: 'delete'
                                            });
                                        }
                                    }
                                ]}
                            />
                        )
                    },
                    {
                        accessorKey: 'userName',
                        header: 'Username',
                        cell: (info) => info.getValue()
                    },
                    {
                        accessorKey: 'email',
                        header: 'Email',
                        cell: (info) => info.getValue()
                    },
                    {
                        accessorKey: 'isActive',
                        header: 'Active',
                        cell: (info) => (info.getValue() ? 'yes' : 'no')
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
            {userActionDialog && userActionDialog.dialgoType === 'edit' && (
                <UserEdit
                    userId={userActionDialog.userId}
                    userDto={userActionDialog.userDto}
                    onDismiss={() => {
						queryClient.invalidateQueries({ queryKey: [QueryNames.GetUsers]});
                        setUserActionDialog(null);
                    }}
                />
            )}
            {userActionDialog &&
                userActionDialog.dialgoType === 'permission' && (
                    <UserPermission
                        userId={userActionDialog.userId}
                        userDto={userActionDialog.userDto}
                        onDismiss={() => setUserActionDialog(null)}
                    />
                )}
            {userActionDialog && userActionDialog.dialgoType === 'delete' && (
                <DeleteUser
                    user={{
                        username: userActionDialog.userDto.userName!,
                        userId: userActionDialog.userId
                    }}
                    onDismiss={() => {
						queryClient.invalidateQueries({ queryKey: [QueryNames.GetUsers]});
                        setUserActionDialog(null);
                    }}
                />
            )}
            <Search onUpdate={onSearchUpdateEvent} value={searchStr ?? ''} />
            <CustomTable<IdentityUserDto>
                table={table}
                totalCount={data?.totalCount ?? 0}
                pageSize={pageSize}
            />
        </>
    );
};
