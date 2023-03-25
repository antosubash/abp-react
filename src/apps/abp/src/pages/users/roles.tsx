import { NextPage } from 'next';
import React from 'react';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    AdminLayout,
    UserList,
    RoleList,
    AddRole
} from '@abpreact/ui';
import { useI18n } from 'next-localization';
import { AdminMenus } from '../../utils/Constants';
import Link from 'next/link';

const Roles: NextPage = () => {
    const i18n = useI18n();
    const users = i18n.t('AbpIdentity.Users');
    const roles = i18n.t('AbpIdentity.Roles');

    return (
        <AdminLayout menus={AdminMenus}>
            <div className="w-full">
                <Tabs value={roles}>
                    <TabsList className="w-full">
                        <TabsTrigger value={users} className="w-full" asChild>
                            <Link href={'/users'}>{users}</Link>
                        </TabsTrigger>
                        <TabsTrigger value={roles} className="w-full" asChild>
                            <Link href={'/users/roles'}>{roles}</Link>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value={users}>
                        <UserList />
                    </TabsContent>
                    <TabsContent value={roles}>
                        <AddRole />
                        <RoleList />
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
};

export default Roles;
