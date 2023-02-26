import {AdminLayout} from "@abpreact/ui";
import { NextPage } from "next";
import React from "react";
import { AdminMenus } from "../utils/Constants";

interface Props {}

const Settings: NextPage = (props: Props) => {
  return (
    <div>
      <AdminLayout menus={AdminMenus}>
        <div>Settings</div>
      </AdminLayout>
    </div>
  );
};

export default Settings;
