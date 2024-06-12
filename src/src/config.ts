import { Cog, Home, Users, Database, UserRound } from 'lucide-react';

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
};

export const PublicMenus = [
    {
        Name: 'How it works',
        Link: '#how-it-works'
    },
    {
        Name: 'Features',
        Link: '#features'
    },
    {
        Name: 'Pricing',
        Link: '#pricing'
    }
];

export const AdminMenus = [
    {
        name: 'Home',
        link: '/admin',
        icon: Home
    },
    {
        name: 'Roles',
        link: '/admin/users/roles',
        icon: Users
    },
    {
        name: 'Users',
        link: '/admin/users',
        icon: UserRound
    },
    {
        name: 'Tenants',
        link: '/admin/tenants',
        icon: Database
    },
    {
        name: 'Settings',
        link: '/admin/settings',
        icon: Cog
    }
];