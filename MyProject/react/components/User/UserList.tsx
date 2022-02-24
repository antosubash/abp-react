import { useUsers } from "hooks/useUsers";
import React, { useState } from "react";
import Loader from "../Loader";
import Error from "../Error";
import DataTable from "react-data-table-component";
import { useTheme } from "next-themes";
import { useQueryClient } from "react-query";
const UserList = () => {
  const columns = [
    {
      name: "userName",
      label: "Username",
      selector: (row: any) => row.userName,
    },
    {
      name: "email",
      label: "Email",
      selector: (row: any) => row.email,
    },
    {
      name: "isActive",
      label: "Is Active",
      selector: (row: any) => <h1>{row.isActive ? "yes" : "no"}</h1>,
    },
  ];

  const { theme } = useTheme();
  const queryClient = useQueryClient();
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

export default UserList;
