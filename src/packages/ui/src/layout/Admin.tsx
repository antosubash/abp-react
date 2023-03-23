import React, { useEffect, useState } from 'react';
import { Sidebar } from '../Admin/Sidebar';
import ThemeSwitcher from '../Shared/ThemeChanger';
import { UserMenus } from '../User/UserMenus';
import { Button } from '../Shared/Button';
import { Bars3Icon } from '@heroicons/react/24/solid';
export interface AdminLayoutProps {
    children: React.ReactNode;
    menus: {
        Name: string;
        Link: string;
        Icon: React.FC;
    }[];
}

export const AdminLayout = ({ menus, children }: AdminLayoutProps) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const onResize = () => {
        setToggleSidebar(false);
    };
    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return (
        <main className="h-screen overflow-hidden relative">
            <section className="flex items-start justify-between">
                <Sidebar menus={menus} toggleLayout={toggleSidebar} />
                <section className="flex flex-col w-full md:space-y-4">
                    <header className="w-full h-16 z-40 flex items-center justify-between">
                        <section className="block lg:hidden ml-6">
                            <Button
                                variant="subtle"
                                size="sm"
                                onClick={() => setToggleSidebar((v) => !v)}
                            >
                                <Bars3Icon
                                    className="text-white"
                                    width={24}
                                    height={24}
                                />
                            </Button>
                        </section>
                        <section className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
                            <section className="relative p-1 flex items-center w-full space-x-4 justify-end">
                                <ThemeSwitcher />
                                <span className="w-1 h-8 rounded-lg bg-gray-200"></span>
                                <UserMenus />
                            </section>
                        </section>
                    </header>
                    <section className="overflow-auto h-screen pb-24 px-4 md:px-6">
                        {children}
                    </section>
                </section>
            </section>
        </main>
    );
};
