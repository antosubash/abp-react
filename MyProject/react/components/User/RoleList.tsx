import React from "react";
import { useRoles } from "hooks/useRoles";
import Loader from "../Loader";
import Error from "../Error";
import Table from "../Shared/Table";

const RoleList = () => {
  const columns = [
    {
      name: "name",
      label: "Name",
      render: ({ value }: any) => <h1>{value}</h1>,
    },
    {
      name: "isDefault",
      label: "Is Default",
      render: ({ value }: any) => <h1>{value ? "yes" : "no"}</h1>,
    },
    {
      name: "isPublic",
      label: "Is Public",
      render: ({ value }: any) => <h1>{value ? "yes" : "no"}</h1>,
    },
  ];

  var { isLoading, roles, isError } = useRoles(0, 10);
  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return <Table columns={columns} data={roles} />;
};

export default RoleList;
