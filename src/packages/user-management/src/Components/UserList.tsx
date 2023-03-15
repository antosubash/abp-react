import React from "react";
import {
  AdjustmentsHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { IdentityUserDto } from "@abpreact/proxy";
import { CustomTable } from "@abpreact/shared";
import { Loader } from "@abpreact/shared";
import { Error } from "@abpreact/shared";
import { useUsers } from "../Hooks/useUsers";

export const UserList = () => {
  const defaultColumns = React.useMemo<ColumnDef<IdentityUserDto>[]>(
    () => [
      {
        header: "User Management",
        columns: [
          {
            accessorKey: "userName",
            header: "Username",
            cell: (info: { getValue: () => any; }) => info.getValue(),
          },
          {
            accessorKey: "email",
            header: "Email",
            cell: (info: { getValue: () => any; }) => info.getValue(),
          },
          {
            accessorKey: "isActive",
            header: "Active",
            cell: (info: { getValue: () => any; }) => (info.getValue() ? "yes" : "no"),
          },
          {
            accessorKey: "permissions",
            header: "Permissions",
            cell: (info: any) => (
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
            ),
          },
          {
            accessorKey: "edit",
            header: "Edit",
            cell: (info: any) => (
              <PencilIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
            ),
          },
          {
            accessorKey: "delete",
            header: "Delete",
            cell: (info: any) => (
              <TrashIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
            ),
          },
        ],
      },
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const defaultData = React.useMemo(() => [], []);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  var { isLoading, data, isError } = useUsers(pageIndex, pageSize);
  var pageCount = Math.ceil(data?.totalCount! / pageSize);
  const table = useReactTable({
    data: data?.items || defaultData,
    pageCount: pageCount || 0,
    state: {
      pagination,
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
  });
  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return (
    <div className="p-2">
      <CustomTable table={table} />
    </div>
  );
};
