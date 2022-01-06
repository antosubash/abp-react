import AdminLayout from "@abp/components/layouts/Admin";
import { NextPage } from "next";
import React from "react";

const Users: NextPage = () => {
  return (
    <div>
      <AdminLayout>
        <div>Users</div>
      </AdminLayout>
    </div>
  );
};

export default Users;
