import { NextPage } from 'next';
import React from 'react';
import {
    AdminLayout,
    ChangePassword,
    ProfileSettings,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@abpreact/ui';
import { AdminMenus } from '../../utils/Constants';
import Link from 'next/link';

const ChangePasswordPage: NextPage = () => {
    const ps = 'Personal Settings';
    const cp = 'Change Password';

    return (
        <AdminLayout menus={AdminMenus}>
            <Tabs defaultValue={cp} className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value={ps} className="w-full" asChild>
                        <Link href={'/profile'}> {ps}</Link>
                    </TabsTrigger>
                    <TabsTrigger value={cp} className="w-full" asChild>
                        <Link href={'/profile/change_password'}> {cp}</Link>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={cp}>
                    <section>
                        <h3>Change Password</h3>
                        <hr className="mt-3 mb-3" />
                        <ChangePassword />
                    </section>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default ChangePasswordPage;
