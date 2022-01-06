import AdminLayout from "@abp/components/layouts/Admin";
import { NextPage } from "next";
import React from "react";

interface Props {}

const Tenants: NextPage = (props: Props) => {
  return (
    <div>
      <AdminLayout>
        <div>Tenants</div>
      </AdminLayout>
    </div>
  );
};

export default Tenants;
