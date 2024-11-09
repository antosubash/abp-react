import AdminLayout from '@/layout/admin-layout'
import React from "react";

/**
 * AdminRootLayout component serves as the root layout for the admin section of the application.
 * It wraps its children with the AdminLayout component.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the AdminLayout.
 * @returns {JSX.Element} The rendered AdminLayout component with children.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
