import { useUsers } from "hooks/useUsers";
import React, { useState } from "react";
import Loader from "@abp/components/Loader";
import Error from "@abp/components/Error";
import DataTable, { TableColumn } from "react-data-table-component";
import { useTheme } from "next-themes";
import { useQueryClient } from "react-query";
import {
  AdjustmentsIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { IdentityUserDto } from "@abp/generated/MyProjectModels";
const UserList = () => {
  const queryClient = useQueryClient();
  const columns: TableColumn<IdentityUserDto>[] = [
    {
      name: "Username",
      selector: (row: any) => row.userName,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
    },
    {
      name: "Is Active",
      selector: (row: any) => (row.isActive ? "yes" : "no"),
    },
    {
      name: "Permissions",
      button: true,
      cell: (row: any) => (
        <AdjustmentsIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
      ),
    },
    {
      name: "Edit",
      button: true,
      cell: (row: any) => (
        <PencilAltIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
      ),
    },
    {
      name: "Delete",
      button: true,
      cell: (row: any) => (
        <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" />
      ),
    },
  ];

  const { theme } = useTheme();

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
  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return (
    <>
      <DataTable
        theme={theme === "dark" ? "dark" : "default"}
        columns={columns}
        data={data?.items ?? []}
        paginationTotalRows={data?.totalCount}
        progressPending={isLoading}
        pagination
        paginationServer
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </>
  );
};

export default UserList;
