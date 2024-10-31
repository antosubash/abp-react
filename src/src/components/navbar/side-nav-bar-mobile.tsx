import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AdminMenus } from '@/config'
import { CircleUser, Menu, Package2 } from 'lucide-react'
import Link from 'next/link'
import ClientLink from '../ui/client-link'
export default function SideNavBarMobile() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {AdminMenus.map((menu) => (
              <Link
                key={menu.name}
                href={menu.link}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <menu.icon/>
                {menu.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Card></Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form></form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href="/admin">
            <DropdownMenuItem className="cursor-pointer">Admin</DropdownMenuItem>
          </Link>
          <Link href="/admin/profile" className="cursor-pointer">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href="/admin/settings" className="cursor-pointer">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <ClientLink href="/auth/logout" size={'sm'} variant={'link'} className="cursor-pointer">
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </ClientLink>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
