import {AdminLayout} from "@abpreact/ui";
import { NextPage } from "next";
import React from "react";
import { AdminMenus } from "../utils/Constants";

interface Props {}

const Settings: NextPage = ({}: Props) => {
  return (
    <AdminLayout menus={AdminMenus}>
      <div>Settings</div>
    </AdminLayout>
  );
};

export default Settings;
