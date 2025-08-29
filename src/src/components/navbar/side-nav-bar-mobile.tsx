'use client'
import {
  ChevronDown,
  ChevronRight,
  CircleUser,
  LogOut,
  Menu,
  Package2,
  Settings,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AdminMenus } from '@/config'
import useSession from '@/useSession'
import ClientLink from '../ui/client-link'

export default function SideNavBarMobile() {
  const pathname = usePathname()
  const sessionData = useSession()

  // Initialize expanded menus based on current path
  const getInitialExpandedMenus = () => {
    const expanded = new Set<string>()
    AdminMenus.forEach((menu) => {
      if (menu.submenus) {
        const isActive = menu.submenus.some((submenu) => pathname === submenu.link)
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
      return submenus.some((submenu) => pathname === submenu.link)
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
        <SheetContent side="left" className="flex flex-col w-[300px] sm:w-[400px]">
          <div className="flex flex-col h-full">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="relative">
                <Package2 className="h-6 w-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AbpReact
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                Admin
              </span>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 space-y-2">
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
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5 flex-1 group ${
                          isActive ? 'text-primary bg-primary/10 border border-primary/20' : ''
                        }`}
                      >
                        {menu.icon && (
                          <menu.icon
                            className={`h-4 w-4 transition-colors ${
                              isActive
                                ? 'text-primary'
                                : 'text-muted-foreground group-hover:text-primary'
                            }`}
                          />
                        )}
                        <span className="font-medium">{menu.name}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />
                        )}
                      </Link>
                      {hasSubmenus && (
                        <button
                          onClick={() => toggleMenu(menu.name)}
                          className="p-1 hover:bg-accent rounded-sm transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      )}
                    </div>

                    {hasSubmenus && isExpanded && (
                      <div className="ml-6 mt-1 space-y-1">
                        {menu.submenus!.map((submenu, subIndex) => {
                          const isSubmenuActive = pathname === submenu.link
                          return (
                            <Link
                              key={subIndex}
                              href={submenu.link}
                              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5 text-sm group ${
                                isSubmenuActive
                                  ? 'text-primary bg-primary/10 border border-primary/20'
                                  : ''
                              }`}
                            >
                              {submenu.icon && (
                                <submenu.icon
                                  className={`h-3.5 w-3.5 transition-colors ${
                                    isSubmenuActive
                                      ? 'text-primary'
                                      : 'text-muted-foreground group-hover:text-primary'
                                  }`}
                                />
                              )}
                              <span className="font-medium">{submenu.name}</span>
                              {isSubmenuActive && (
                                <div className="ml-auto w-1 h-1 bg-primary rounded-full" />
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
            <CircleUser className="h-4 w-4" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{sessionData.data?.userInfo?.name || 'Admin User'}</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {sessionData.data?.userInfo?.email || 'No email available'}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <Link href="/admin" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2">
              <Package2 className="h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href="/admin/profile" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/admin/settings" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <ClientLink
            href="/auth/logout"
            variant={'ghost'}
            size={'sm'}
            className="cursor-pointer w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </ClientLink>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
