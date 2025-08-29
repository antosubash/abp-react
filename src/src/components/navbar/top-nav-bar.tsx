'use client'
import {
  BookOpen,
  CircleUser,
  ExternalLink,
  Github,
  LogOut,
  Menu,
  Package2,
  Palette,
  Settings,
  User,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
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

export default function TopNavBar() {
  const sessionData = useSession()
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 10)
    })
  }

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm'
          : 'bg-background border-b'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base group"
            >
              <div className="relative">
                <Package2 className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AbpReact
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {PublicMenus.map((menu, index) => (
              <Link
                key={index}
                href={menu.Link}
                className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              >
                {menu.Name}
                <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 transition-transform group-hover:scale-x-100" />
              </Link>
            ))}

            {/* Additional Navigation Items */}
            <div className="flex items-center gap-1 ml-4 pl-4 border-l">
              <Link
                href="https://abp-react-storybook.antosubash.com"
                className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              >
                <Palette className="h-4 w-4" />
                Components
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="https://abp-react-storybook.antosubash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              >
                <Palette className="h-4 w-4" />
                Components
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="https://antosubash.github.io/abp-react/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              >
                <BookOpen className="h-4 w-4" />
                Docs
                <ExternalLink className="h-3 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="https://github.com/antosubash/abp-react"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              >
                <Github className="h-4 w-4" />
                GitHub
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 mb-6">
                  <Package2 className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">AbpReact</span>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 space-y-2">
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                      Navigation
                    </h3>
                    {PublicMenus.map((menu, index) => (
                      <Link
                        key={index}
                        href={menu.Link}
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                      >
                        {menu.Name}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1 pt-4 border-t">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                      Resources
                    </h3>
                    <Link
                      href="https://abp-react-storybook.antosubash.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                    >
                      <Palette className="h-4 w-4" />
                      Components
                    </Link>
                    <Link
                      href="https://antosubash.github.io/abp-react/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                    >
                      <BookOpen className="h-4 w-4" />
                      Documentation
                    </Link>
                    <Link
                      href="https://github.com/your-repo/abp-react"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Link>
                  </div>
                </nav>

                {/* Mobile User Actions */}
                <div className="border-t pt-4">
                  {sessionData.data?.isLoggedIn ? (
                    <div className="space-y-2">
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                      >
                        <Zap className="h-4 w-4" />
                        Admin Panel
                      </Link>
                      <ClientLink
                        href="/auth/logout"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </ClientLink>
                    </div>
                  ) : (
                    <ClientLink
                      href="/auth/login"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:bg-primary/10 rounded-md"
                    >
                      <User className="h-4 w-4" />
                      Login
                    </ClientLink>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop User Actions */}
          <div className="flex items-center gap-2">
            {sessionData.data?.isLoggedIn ? (
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
                      <p className="font-medium">{sessionData.data.userInfo?.name || 'User'}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {sessionData.data.userInfo?.email || 'No email available'}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href="/admin" className="cursor-pointer">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Admin Panel
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
            ) : (
              <div className="flex items-center gap-2">
                <ClientLink href="/auth/login" variant="ghost" size="sm">
                  Sign In
                </ClientLink>
                <Link href="/admin">
                  <Button size="sm" className="hidden sm:flex">
                    <Zap className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
