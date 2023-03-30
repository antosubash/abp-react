import { NextPage } from 'next';
import React from 'react';
import { AdminLayout } from '@abpreact/ui';
import { AdminMenus } from '../../utils/Constants';

const UsersPage: NextPage = () => {
    return (
        <AdminLayout menus={AdminMenus}>
            <div className="w-full"></div>
        </AdminLayout>
    );
};

export default UsersPage;
