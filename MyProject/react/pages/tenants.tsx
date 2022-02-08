import AdminLayout from "@abp/components/layouts/Admin";
import TenantList from "@abp/components/Tenant/TenantList";
import { NextPage } from "next";
import React from "react";

interface Props {}

const Tenants: NextPage = (props: Props) => {
  return (
    <div>
      <AdminLayout>
        <TenantList/>
      </AdminLayout>
    </div>
  );
};

export default Tenants;
