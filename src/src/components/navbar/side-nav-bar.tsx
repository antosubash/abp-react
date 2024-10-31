import { Card } from '@/components/ui/card'
import { AdminMenus } from '@/config'
import { Package2 } from 'lucide-react'
import Link from 'next/link'
export default function SideBarMenu() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {AdminMenus.map((menu, index) => {
              return (
                <Link
                  key={index}
                  href={menu.link}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  {menu.icon && <menu.icon/>}
                  {menu.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0"></Card>
        </div>
      </div>
    </div>
  )
}
