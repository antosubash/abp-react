import SideBarMenu from '@/components/navbar/side-nav-bar'
import SideNavBarMobile from '@/components/navbar/side-nav-bar-mobile'

export function AdminLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBarMenu />
      <div className="flex flex-col">
        <SideNavBarMobile />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
