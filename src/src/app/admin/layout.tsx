import AdminLayout from '@/layout/admin-layout'
import { setUpLayoutConfig } from '@/lib/auth'
import React from 'react'

// Force dynamic rendering for admin pages since they use cookies and server-side features
export const dynamic = 'force-dynamic'

/**
 * AdminRootLayout component serves as the root layout for the admin section of the application.
 * It wraps its children with the AdminLayout component.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the AdminLayout.
 * @returns {React.ReactElement} The rendered AdminLayout component with children.
 */
export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  await setUpLayoutConfig()
  return <AdminLayout>{children}</AdminLayout>
}
