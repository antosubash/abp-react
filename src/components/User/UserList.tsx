import { useUsers } from "hooks/useUsers";
import React, { useState } from "react";
import Loader from "@abp/components/Loader";
import Error from "@abp/components/Error";
import DataTable, { TableColumn } from "react-data-table-component";
import { useTheme } from "next-themes";
import { useQueryClient } from "react-query";
import {
  AdjustmentsHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
} from "@tanstack/react-table";
import { IdentityUserDto } from "@abp/generated/api";
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

  var [skip, setSkip] = useState<number>(0);
  var [limit, setLimit] = useState<number>(10);
  var [page, setPage] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setPage(page);
    var skip = (page - 1) * limit;
    setSkip(skip);
  };

  const handlePerRowsChange = async (newPerPage: number, _page: number) => {
    setLimit(newPerPage);
  };

  var { isLoading, data, isError } = useUsers(page, skip, limit);

  const table = useReactTable({
    data: data?.items!,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return (
    <>
      <div className="p-2">
        <table className="min-w-full divide-y text-left divide-gray-200 table-fixed dark:divide-gray-700">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="pb-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
