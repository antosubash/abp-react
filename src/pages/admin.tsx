import type { NextPage } from "next";
import AdminLayout from "@abp/components/layouts/Admin";
import Dashboard from "@abp/components/Admin/Dashboard";

const Admin: NextPage = () => {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
};

export default Admin;
