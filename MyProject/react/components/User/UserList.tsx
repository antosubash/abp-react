import { IdentityUserDto } from "@abp/generated/MyProjectModels";
import { getUsers } from "@abp/services/UserService";
import React, { useEffect, useState } from "react";
import Table from "../Shared/Table";
interface Props {}

const UserList = (props: Props) => {
  const columns = [
    {
      name: "username",
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
      render: ({ value }: any) => <h1>{ value ? "true" : "false" }</h1>,
    },
  ];

  const [data, setData] = useState<any[]>();

  useEffect(() => {
    async function fetchData() {
      var users = await getUsers();
      console.log(users);
      var userList = users?.data?.items?.map((user: IdentityUserDto) => {
        return {
          username: user.name,
          email: user.email,
          isActive: user.isActive,
        };
      });
      setData(userList);
    }
    fetchData();
  }, []);
  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
};

export default UserList;
