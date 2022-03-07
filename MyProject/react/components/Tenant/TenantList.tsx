import React, { useState } from "react";
import Loader from "@abp/components/Loader";
import Error from "@abp/components/Error";
import { useTenants } from "hooks/useTenants";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  AdjustmentsIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { useQueryClient } from "react-query";
import { useTheme } from "next-themes";
type Props = {};

const TenantList = (props: Props) => {
  const queryClient = useQueryClient();
  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
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

  var { isLoading, data, isError } = useTenants(page, skip, limit);

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

export default TenantList;
