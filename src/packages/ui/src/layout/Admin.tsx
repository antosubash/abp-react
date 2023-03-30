import React, { useState } from 'react';
import { Sidebar } from '../Admin/Sidebar';
import ThemeSwitcher from '../Shared/ThemeChanger';
import { UserMenus } from '../User/UserMenus';
import { Bars3Icon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Button } from '../Shared/Button';

type Menu = {
    name: string;
    link?: string;
    icon?: React.FC;
};

export interface SubMenu extends Menu {
    children?: Menu[];
}

export interface AdminLayoutProps<T> {
    children: React.ReactNode;
    menus: SubMenu[];
}

export const AdminLayout = <T extends unknown>({
    menus,
    children
}: AdminLayoutProps<T>) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    return (
        <main className="relative">
            <Sidebar
                menus={menus}
                toggleSidebar={toggleSidebar}
                onToggle={setToggleSidebar}
            />
            <section className="h-screen">
                <section className="flex flex-col w-full">
                    <header className="w-full h-16 flex items-center justify-between fixed bg-white">
                        <section className="sm:hidden pl-5 pt-2">
                            <Button
                                variant="subtle"
                                size="sm"
                                onClick={() => setToggleSidebar((v) => !v)}
                            >
                                {toggleSidebar ? (
                                    <ChevronLeftIcon
                                        className="text-white"
                                        width={24}
                                        height={24}
                                    />
                                ) : (
                                    <Bars3Icon
                                        className="text-white"
                                        width={24}
                                        height={24}
                                    />
                                )}
                            </Button>
                        </section>
                        <section className="relative flex flex-col justify-end h-full px-3 w-full">
                            <section className="relative flex items-center w-full space-x-4 justify-end">
                                <ThemeSwitcher />
                                <span className="w-1 h-8 rounded-lg bg-gray-200"></span>
                                <UserMenus />
                            </section>
                        </section>
                    </header>
                    <section className="ml-2 mr-2 mt-24 sm:pl-[20rem]">
                        {children}
                    </section>
                </section>
            </section>
        </main>
    );
};
