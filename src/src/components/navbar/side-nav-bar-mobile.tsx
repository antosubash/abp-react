'use client'
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
import { CircleUser, Menu, Package2, ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import ClientLink from '../ui/client-link'

export default function SideNavBarMobile() {
  const pathname = usePathname()
  
  // Initialize expanded menus based on current path
  const getInitialExpandedMenus = () => {
    const expanded = new Set<string>()
    AdminMenus.forEach(menu => {
      if (menu.submenus) {
        const isActive = menu.submenus.some(submenu => pathname === submenu.link)
        if (isActive) {
          expanded.add(menu.name)
        }
      }
    })
    return expanded
  }
  
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(getInitialExpandedMenus())

  const toggleMenu = (menuName: string) => {
    const newExpandedMenus = new Set(expandedMenus)
    if (newExpandedMenus.has(menuName)) {
      newExpandedMenus.delete(menuName)
    } else {
      newExpandedMenus.add(menuName)
    }
    setExpandedMenus(newExpandedMenus)
  }

  const isMenuActive = (menuLink: string, submenus?: Array<{ link: string }>) => {
    if (pathname === menuLink) return true
    if (submenus) {
      return submenus.some(submenu => pathname === submenu.link)
    }
    return false
  }

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
            {AdminMenus.map((menu) => {
              const isActive = isMenuActive(menu.link, menu.submenus)
              const isExpanded = expandedMenus.has(menu.name)
              const hasSubmenus = menu.submenus && menu.submenus.length > 0

              return (
                <div key={menu.name}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={menu.link}
                      onClick={() => {
                        if (hasSubmenus && !isExpanded) {
                          toggleMenu(menu.name)
                        }
                      }}
                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground flex-1 ${
                        isActive ? 'text-foreground bg-accent' : ''
                      }`}
                    >
                      <menu.icon/>
                      {menu.name}
                    </Link>
                    {hasSubmenus && (
                      <button
                        onClick={() => toggleMenu(menu.name)}
                        className="p-1 hover:bg-accent rounded-sm transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  {hasSubmenus && isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {menu.submenus!.map((submenu, subIndex) => {
                        const isSubmenuActive = pathname === submenu.link
                        return (
                          <Link
                            key={subIndex}
                            href={submenu.link}
                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground text-sm ${
                              isSubmenuActive ? 'text-foreground bg-accent' : ''
                            }`}
                          >
                            <submenu.icon />
                            {submenu.name}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
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
