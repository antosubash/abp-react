'use client'
import { Card } from '@/components/ui/card'
import { AdminMenus } from '@/config'
import { Package2, ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function SideBarMenu() {
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
              const isActive = isMenuActive(menu.link, menu.submenus)
              const isExpanded = expandedMenus.has(menu.name)
              const hasSubmenus = menu.submenus && menu.submenus.length > 0

              return (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={menu.link}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary flex-1 ${
                        isActive ? 'text-primary bg-primary/10' : ''
                      }`}
                    >
                      {menu.icon && <menu.icon/>}
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
                    <div className="ml-6 mt-1 space-y-1">
                      {menu.submenus!.map((submenu, subIndex) => {
                        const isSubmenuActive = pathname === submenu.link
                        return (
                          <Link
                            key={subIndex}
                            href={submenu.link}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-sm ${
                              isSubmenuActive ? 'text-primary bg-primary/10' : ''
                            }`}
                          >
                            {submenu.icon && <submenu.icon />}
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
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0"></Card>
        </div>
      </div>
    </div>
  )
}
