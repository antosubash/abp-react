import React, { useState } from "react";
import { useRoles } from "hooks/useRoles";
import Loader from "@abp/components/Loader";
import Error from "@abp/components/Error";
import DataTable from "react-data-table-component";
import {
  AdjustmentsHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useQueryClient } from "@tanstack/react-query";

const RoleList = () => {
  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Is Default",
      selector: (row: any) => (row.isDefault ? "yes" : "no"),
    },
    {
      name: "Is Public",
      selector: (row: any) => (row.isPublic ? "yes" : "no"),
    },
    {
      name: "Permissions",
      button: true,
      cell: (row: any) => (
        <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
      ),
    },
    {
      name: "Edit",
      button: true,
      cell: (row: any) => (
        <PencilIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
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
  var { isLoading, data, isError } = useRoles(page, skip, limit);
  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return (
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
  );
};

export default RoleList;
