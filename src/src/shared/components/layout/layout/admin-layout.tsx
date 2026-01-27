import { SideNavBar } from '../../navigation/navbar/side-nav-bar'
import { SideNavBarMobile } from '../../navigation/navbar/side-nav-bar-mobile'
import { AdminErrorBoundary, Toaster } from '../../ui'

export function AdminLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <AdminErrorBoundary>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <SideNavBar />
        <div className="flex flex-col">
          <SideNavBarMobile />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </AdminErrorBoundary>
  )
}

export default AdminLayout
