import { useUsers, useCurrentUser, QueryNames } from '@abpreact/hooks';
import { useMemo, useState } from 'react';

import {
    PaginationState,
    useReactTable,
    getCoreRowModel,
    ColumnDef
} from '@tanstack/react-table';
import { IdentityUserDto, IdentityUserUpdateDto } from '@abpreact/proxy';
import { CustomTable } from '../Shared/CustomTable';
import Loader from '../Shared/Loader';
import Error from '../Shared/Error';

import { useToast } from '../Shared/hooks/useToast';
import { UserEdit } from './UserEdit';
import { UserPermission } from './UserPermission';
import { DeleteUser } from './DeleteUser';
import { PermissionActions } from '../Permission/PermissionActions';

import { USER_ROLE } from '../utils';
import { useQueryClient } from '@tanstack/react-query';

export const UserList = () => {
    const { toast } = useToast();
    const currentUser = useCurrentUser();
    const [userActionDialog, setUserActionDialog] = useState<{
        userId: string;
        userDto: IdentityUserUpdateDto;
        dialgoType?: 'edit' | 'permission' | 'delete';
    } | null>();

    const myselfHasAdmin = currentUser?.roles?.includes(USER_ROLE.ADMIN);

    const defaultColumns: ColumnDef<IdentityUserDto>[] = useMemo(
        () => [
            {
                header: 'User Management',
                columns: [
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
                    },
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
                                            myselfHasAdmin &&
                                            info.row.original.id ===
                                                currentUser?.id,
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
                    }
                ]
            }
        ],
        []
    );

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const defaultData = useMemo(() => [], []);

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        [pageIndex, pageSize, toast]
    );

    const { isLoading, data, isError } = useUsers(pageIndex, pageSize);
    const queryClient = useQueryClient();
    const pageCount = Math.ceil(data?.totalCount! / pageSize);

    const table = useReactTable({
        data: data?.items || defaultData,
        pageCount: pageCount || 0,
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
                        queryClient.invalidateQueries([QueryNames.GetUsers]);
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
                        queryClient.invalidateQueries([QueryNames.GetUsers]);
                        setUserActionDialog(null);
                    }}
                />
            )}
            <CustomTable table={table} />
        </>
    );
};
