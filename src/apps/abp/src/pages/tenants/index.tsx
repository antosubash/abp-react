import {
    AddTenant,
    AdminLayout,
    Tabs,
    TabsContent,
    TenantList
} from '@abpreact/ui';
import { NextPage } from 'next';
import React from 'react';
import { AdminMenus } from '../../utils/Constants';

const Tenants: NextPage = () => {
    return (
        <AdminLayout menus={AdminMenus}>
            <div className="w-full">
                <AddTenant />
                <Tabs value="tenants">
                    <TabsContent value="tenants">
                        <TenantList />
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
};

export default Tenants;
