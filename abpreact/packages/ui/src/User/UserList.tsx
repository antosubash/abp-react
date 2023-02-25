import { useUsers } from "@abpreact/hooks";
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
import CustomTable from "../Shared/CustomTable";
import Loader from "../Shared/Loader";
import Error from "../Shared/Error";

const UserList = () => {
  const defaultColumns = React.useMemo<ColumnDef<IdentityUserDto>[]>(
    () => [
      {
        header: "User Management",
        columns: [
          {
            accessorKey: "userName",
            header: "Username",
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "email",
            header: "Email",
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "isActive",
            header: "Active",
            cell: (info) => (info.getValue() ? "yes" : "no"),
          },
          {
            accessorKey: "permissions",
            header: "Permissions",
            cell: (info) => (
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
            ),
          },
          {
            accessorKey: "edit",
            header: "Edit",
            cell: (info) => (
              <PencilIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
            ),
          },
          {
            accessorKey: "delete",
            header: "Delete",
            cell: (info) => (
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

export default UserList;
