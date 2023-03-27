import React, { useEffect, useState } from 'react';
import { Sidebar } from '../Admin/Sidebar';
import ThemeSwitcher from '../Shared/ThemeChanger';
import { UserMenus } from '../User/UserMenus';

export interface AdminLayoutProps {
    children: React.ReactNode;
    menus: {
        Name: string;
        Link: string;
        Icon: React.FC;
    }[];
}

export const AdminLayout = ({ menus, children }: AdminLayoutProps) => {
    return (
        <main className="relative">
            <Sidebar menus={menus} />
            <section className="p-2">
                <section className="flex flex-col w-full">
                    <header className="w-full h-16 flex items-center justify-between">
                        <section className="relative flex flex-col justify-end h-full px-3 w-full">
                            <section className="relative flex items-center w-full space-x-4 justify-end">
                                <ThemeSwitcher />
                                <span className="w-1 h-8 rounded-lg bg-gray-200"></span>
                                <UserMenus />
                            </section>
                        </section>
                    </header>
                    <section className="mt-2 sm:pl-[15rem]">{children}</section>
                </section>
            </section>
        </main>
    );
};
