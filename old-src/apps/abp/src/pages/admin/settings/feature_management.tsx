import {
    AdminLayout,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Emailing,
    FeatureManagement
} from '@abpreact/ui';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { AdminMenus } from '../../../utils/Constants';

const FeatureManagementPage: NextPage = () => {
    const emailing = 'emailing';
    const featureManagement = 'feature_management';
    return (
        <AdminLayout menus={AdminMenus}>
            <Tabs value={featureManagement} orientation="vertical">
                <TabsList className="w-full">
                    <TabsTrigger value={emailing} className="w-full" asChild>
                        <Link href={'/admin/settings'}>Emailing</Link>
                    </TabsTrigger>
                    <TabsTrigger
                        value={featureManagement}
                        className="w-full"
                        asChild
                    >
                        <Link href={'/admin/settings/feature_management'}>
                            Feature management
                        </Link>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value={emailing}>
                    <Emailing />
                </TabsContent>
                <TabsContent value={featureManagement}>
                    <FeatureManagement />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default FeatureManagementPage;
