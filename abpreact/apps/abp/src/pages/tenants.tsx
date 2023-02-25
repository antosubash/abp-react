import { AdminLayout } from "@abpreact/ui";
import { TenantCreate } from "@abpreact/ui";
import { TenantList } from "@abpreact/ui";
import { NextPage } from "next";
import React from "react";
import { AdminMenus } from "../utils/Constants";

interface Props {}

const Tenants: NextPage = (props: Props) => {
  return (
    <div>
      <AdminLayout menus={AdminMenus}>
        <TenantCreate />
        <div className="pt-8">
          <TenantList />
        </div>
      </AdminLayout>
    </div>
  );
};

export default Tenants;
