import { useUsers } from "hooks/useUsers";
import React from "react";
import Loader from "../Loader";
import Error from "../Error";
import Table from "../Shared/Table";

const UserList = () => {
  const columns = [
    {
      name: "userName",
      label: "Username",
      render: ({ value }: any) => <h1>{value}</h1>,
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "isActive",
      label: "Is Active",
      render: ({ value }: any) => <h1>{value ? "yes" : "no"}</h1>,
    },
  ];

  var { isLoading, data, isError } = useUsers(0, 10);
  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return <Table columns={columns} data={data?.items} />;
};

export default UserList;
