import AdminLayout from "@abp/components/layouts/Admin";
import { NextPage } from "next";
import React from "react";

interface Props {}

const Settings: NextPage = (props: Props) => {
  return (
    <div>
      <AdminLayout>
        <div>Settings</div>
      </AdminLayout>
    </div>
  );
};

export default Settings;
