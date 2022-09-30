import AdminLayout from "@abp/components/layouts/Admin";
import TenantCreate from "@abp/components/Tenant/TenantCreate";
import TenantList from "@abp/components/Tenant/TenantList";
import { NextPage } from "next";
import React from "react";

interface Props {}

const Tenants: NextPage = (props: Props) => {
  return (
    <div>
      <AdminLayout>
        <TenantCreate />
        <div className="pt-8">
          <TenantList />
        </div>
      </AdminLayout>
    </div>
  );
};

export default Tenants;
