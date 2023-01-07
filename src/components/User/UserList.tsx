import { useUsers } from "hooks/useUsers";
import React from "react";
import Loader from "@abp/components/Loader";
import Error from "@abp/components/Error";
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
        <div className="h-2" />
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          {isLoading ? "Loading..." : null}
        </div>
        <div>{table.getRowModel().rows.length} Rows</div>
        <div>
          {/* <button onClick={() => rerender()}>Force Rerender</button> */}
        </div>
        <pre>{JSON.stringify(pagination, null, 2)}</pre>
      </div>
    </>
  );
};

export default UserList;
