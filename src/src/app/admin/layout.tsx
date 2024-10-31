import AdminLayout from '@/layout/admin-layout'
import React from "react";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
