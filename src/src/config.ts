import { Cog, Database, FileText, Home, Menu, MessageSquare, UserRound, Users } from 'lucide-react'
import React from 'react'

/**
 * Configuration for the OpenID client.
 * This constant holds most of the environment variables in a single place.
 * It was created for convenience. If you don't like it, you can remove it and update the codebase everywhere it is used.
 */
export const clientConfig = {
  url: process.env.NEXT_PUBLIC_API_URL,
  audience: process.env.NEXT_PUBLIC_API_URL,
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  scope: process.env.NEXT_PUBLIC_SCOPE,
  redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/openiddict`,
  post_logout_redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}`,
  response_type: 'code',
  grant_type: 'authorization_code',
  post_login_route: `${process.env.NEXT_PUBLIC_APP_URL}`,
  code_challenge_method: 'S256',
}

/**
 * List of menus shown on the public pages.
 * Each menu item contains a name and a link.
 *
 * @type {Array<{Name: string, Link: string}>}
 */
export const PublicMenus: Array<{ Name: string; Link: string }> = [
  {
    Name: 'Features',
    Link: '#features',
  },
  {
    Name: 'Getting Started',
    Link: '#getting-started',
  },
]

/**
 * List of menus shown in the Admin layout.
 * Each menu item contains a name, link, and icon.
 * Supports nested submenus for 2-level navigation.
 *
 * @type {Array<{name: string, link: string, icon: React.ComponentType<{className?: string}>, submenus?: Array<{name: string, link: string, icon: React.ComponentType<{className?: string}>}>}>}
 */
export const AdminMenus: Array<{
  name: string
  link: string
  icon: React.ComponentType<{ className?: string }>
  submenus?: Array<{
    name: string
    link: string
    icon: React.ComponentType<{ className?: string }>
  }>
}> = [
  {
    name: 'Home',
    link: '/admin',
    icon: Home,
  },
  {
    name: 'Users',
    link: '/admin/users',
    icon: UserRound,
  },
  {
    name: 'Roles',
    link: '/admin/users/roles',
    icon: Users,
  },
  {
    name: 'CMS',
    link: '/admin/cms',
    icon: FileText,
    submenus: [
      {
        name: 'Pages',
        link: '/admin/cms/pages',
        icon: FileText,
      },
      {
        name: 'Menu Items',
        link: '/admin/cms/menus',
        icon: Menu,
      },
      {
        name: 'Comments',
        link: '/admin/cms/comments',
        icon: MessageSquare,
      },
    ],
  },
  {
    name: 'Tenants',
    link: '/admin/tenants',
    icon: Database,
  },
  {
    name: 'Settings',
    link: '/admin/settings',
    icon: Cog,
  },
]
