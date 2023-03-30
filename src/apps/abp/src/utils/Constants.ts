import { FaDatabase, FaCogs, FaUsers, FaHome, FaWrench } from 'react-icons/fa';
import { SubMenu } from '@abpreact/ui';
export const Menus = [
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

export const AdminMenus: SubMenu[] = [
    {
        name: 'Home',
        link: '/admin',
        icon: FaHome
    },
    {
        name: 'Administration',
        icon: FaWrench,
        children: [
            {
                name: 'Roles',
                link: '/users/roles'
            },
            {
                name: 'Users',
                link: '/users'
            }
        ]
    },
    {
        name: 'Tenant Management',
        icon: FaUsers,
        children: [
            {
                name: 'Tenants',
                link: '/tenants'
            }
        ]
    },
    {
        name: 'Settings',
        link: '/settings',
        icon: FaCogs
    }
];

export const QueryNames = {
    GetUsers: 'GetUsers',
    GetTenants: 'GetTenants',
    GetRoles: 'GetRoles',
    GetAppConfig: 'GetAppConfig',
    GetFeatures: 'GetFeatures',
    GetTranslations: 'GetTranslations'
};
