import { useUsers } from '@abpreact/hooks';
import { useMemo, useState } from 'react';

import {
    AdjustmentsHorizontalIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/solid';
import {
    PaginationState,
    useReactTable,
    getCoreRowModel,
    ColumnDef
} from '@tanstack/react-table';
import {
    IdentityUserDto,
    UserService,
    IdentityUserUpdateDto
} from '@abpreact/proxy';
import { CustomTable } from '../Shared/CustomTable';
import Loader from '../Shared/Loader';
import Error from '../Shared/Error';
import { Button } from '../Shared/Button';

import { useToast } from '../Shared/hooks/useToast';
import { ToastAction } from '../Shared/Toast';
import { UserEdit } from './UserEdit';
import { UserPermission } from './UserPermission';

export const UserList = () => {
    const { toast } = useToast();
    const [userActionDialog, setUserActionDialog] = useState<{
        userId: string;
        userDto: IdentityUserUpdateDto;
        dialgoType?: 'edit' | 'permission';
    } | null>();

    const onDeletUserEvent = ({
        name,
        uuid
    }: {
        name: string;
        uuid: string;
    }): void => {
        toast({
            title: 'Are you sure?',
            description: `You are about delete a user ${name}`,
            action: (
                <ToastAction
                    altText="confirm"
                    onClick={async () => {
                        try {
                            await UserService.userDelete(uuid);
                            toast({
                                title: 'Success',
                                description: `User ${name} has been deleted successfully.`
                            });
                        } catch (err: unknown) {
                            if (err instanceof Error) {
                                toast({
                                    title: 'Failed',
                                    description: `There was a problem when deleting the user ${name}. Kindly try again.`,
                                    variant: 'destructive'
                                });
                            }
                        }
                    }}
                >
                    Confirm
                </ToastAction>
            )
        });
    };

    const defaultColumns = useMemo<ColumnDef<IdentityUserDto>[]>(
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
                            <section className="flex items-center space-x-2">
                                <Button
                                    variant="subtle"
                                    onClick={() => {
                                        setUserActionDialog({
                                            userId: info.row.original
                                                .id as string,
                                            userDto: info.row
                                                .original as IdentityUserUpdateDto,
                                            dialgoType: 'permission'
                                        });
                                    }}
                                >
                                    <AdjustmentsHorizontalIcon
                                        width={15}
                                        height={15}
                                        className="text-white"
                                    />
                                </Button>
                                <Button
                                    variant="subtle"
                                    onClick={() =>
                                        setUserActionDialog({
                                            userId: info.row.original
                                                .id as string,
                                            userDto: info.row
                                                .original as IdentityUserUpdateDto,
                                            dialgoType: 'edit'
                                        })
                                    }
                                >
                                    <PencilIcon
                                        width={15}
                                        height={15}
                                        className="text-white"
                                    />
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        onDeletUserEvent({
                                            name: info.row.original
                                                ?.userName as string,
                                            uuid: info.row.original.id as string
                                        })
                                    }
                                >
                                    <TrashIcon width={15} height={15} />
                                </Button>
                            </section>
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
            {userActionDialog && userActionDialog?.dialgoType === 'edit' && (
                <UserEdit
                    userId={userActionDialog.userId}
                    userDto={userActionDialog.userDto}
                    onDismiss={() => setUserActionDialog(null)}
                />
            )}
            {userActionDialog &&
                userActionDialog?.dialgoType === 'permission' && (
                    <UserPermission
                        userDto={userActionDialog.userDto}
                        onDismiss={() => setUserActionDialog(null)}
                    />
                )}
            <CustomTable table={table} />
        </>
    );
};
