'use client'
import { Button } from '@/components/ui/button'
import ClientLink from '@/components/ui/client-link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { PublicMenus } from '@/config'
import useSession from '@/useSession'
import { CircleUser, Menu, Package2 } from 'lucide-react'
import Link from 'next/link'
export default function TopNavBar() {
  const sessionData = useSession()
  return (
    <header className="sticky inset-x-0 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {PublicMenus.map((menu, index) => {
          return (
            <Link
              key={index}
              href={menu.Link}
              className="w-24 text-foreground transition-colors hover:text-foreground"
            >
              {menu.Name}
            </Link>
          )
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {PublicMenus.map((menu, index) => {
              return (
                <Link
                  key={index}
                  href={menu.Link}
                  className="text-foreground hover:text-foreground"
                >
                  {menu.Name}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial"></form>
        {sessionData.data?.isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/admin" className="cursor-pointer">
                <DropdownMenuItem>Admin</DropdownMenuItem>
              </Link>
              <Link href="/admin/profile" className="cursor-pointer">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href="/admin/settings" className="cursor-pointer">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <ClientLink
                href="/auth/logout"
                variant={'link'}
                size={'sm'}
                className="cursor-pointer"
              >
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </ClientLink>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <ClientLink href="/auth/login">Login</ClientLink>
        )}
      </div>
    </header>
  )
}
