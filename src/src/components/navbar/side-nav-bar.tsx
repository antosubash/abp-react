'use client'
import { Card } from '@/components/ui/card'
import { AdminMenus } from '@/config'
import { ChevronDown, ChevronRight, Package2, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function SideBarMenu() {
  const pathname = usePathname()

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
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold group">
            <div className="relative">
              <Package2 className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <span className="font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AbpReact
            </span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              Admin
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {AdminMenus.map((menu, index) => {
              const isActive = isMenuActive(menu.link, menu.submenus)
              const isExpanded = expandedMenus.has(menu.name)
              const hasSubmenus = menu.submenus && menu.submenus.length > 0

              return (
                <div key={index}>
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
                        <menu.icon className={`h-4 w-4 transition-colors ${
                          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                        }`} />
                      )}
                      <span className="font-medium">{menu.name}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></div>
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
                              isSubmenuActive ? 'text-primary bg-primary/10 border border-primary/20' : ''
                            }`}
                          >
                            {submenu.icon && (
                              <submenu.icon className={`h-3.5 w-3.5 transition-colors ${
                                isSubmenuActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                              }`} />
                            )}
                            <span className="font-medium">{submenu.name}</span>
                            {isSubmenuActive && (
                              <div className="ml-auto w-1 h-1 bg-primary rounded-full"></div>
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
        <div className="mt-auto p-4">
          <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Quick Actions</p>
                <p className="text-xs text-muted-foreground">Access common tasks</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
