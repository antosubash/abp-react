import { useState, useMemo } from 'react';
import { useRoles } from '@abpreact/hooks';
import {
    PaginationState,
    useReactTable,
    getCoreRowModel,
    ColumnDef
} from '@tanstack/react-table';
import { IdentityRoleDto } from '@abpreact/proxy';
import {
    AdjustmentsHorizontalIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/solid';
import { CustomTable } from '../Shared/CustomTable';
import Loader from '../Shared/Loader';
import Error from '../Shared/Error';
import { useToast } from '../Shared/hooks/useToast';

export const RoleList = () => {
    const { toast } = useToast();
    const defaultColumns: ColumnDef<IdentityRoleDto>[] = [
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
                    cell: (info) => (info.row.original?.isPublic ? 'Yes' : 'No')
                }
            ]
        }
    ];

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        [pageIndex, pageSize, toast]
    );

    const { isLoading, data, isError } = useRoles(pageIndex, pageSize);
    const pageCount = Math.ceil(data?.totalCount! / pageSize);

    const table = useReactTable({
        data: data?.items ?? [],
        pageCount: pageCount ?? 0,
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

    return <CustomTable table={table} />;
};
