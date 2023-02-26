import type { NextPage } from "next";
import {AdminLayout} from "@abpreact/ui";
import {Dashboard} from "@abpreact/ui";
import { AdminMenus } from "../utils/Constants";

const Admin: NextPage = () => {
  return (
    <AdminLayout menus={AdminMenus}>
      <Dashboard />
    </AdminLayout>
  );
};

export default Admin;
