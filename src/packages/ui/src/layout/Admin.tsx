import React, { useState } from 'react';
import { Sidebar } from '../Admin/Sidebar';
import ThemeSwitcher from '../Shared/ThemeChanger';
import { UserMenus } from '../User/UserMenus';
import { Bars3Icon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Button } from '../Shared/Button';
import { useCurrentUser } from '@abpreact/hooks';
import { AuthenticationFailure } from '../Shared/auth/AuthenticationFailure';

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
    const currentUser = useCurrentUser();

    return (
        <main>
            {currentUser && !currentUser?.isAuthenticated && (
                <AuthenticationFailure
                    onCloseEvent={() => {
                        console.log('Authenticated closed');
                    }}
                />
            )}
            <Sidebar
                menus={menus}
                toggleSidebar={toggleSidebar}
                onToggle={setToggleSidebar}
            />
            <section className="sm:pl-[20rem]">
                <section className="h-screen overflow-auto relative">
                    <header className="sm:w-[calc(100%_-_20rem)] w-full pt-5 pb-5 flex  items-center bg-base-100 text-base-content justify-between fixed shadow-md">
                        <section className="sm:hidden pl-5 pt-2">
                            <Button
                                variant="subtle"
                                size="sm"
                                onClick={() => setToggleSidebar((v) => !v)}
                            >
                                {toggleSidebar ? (
                                    <ChevronLeftIcon
                                        className="text-primary-content"
                                        width={24}
                                        height={24}
                                    />
                                ) : (
                                    <Bars3Icon
                                        className="text-primary-content"
                                        width={24}
                                        height={24}
                                    />
                                )}
                            </Button>
                        </section>
                        <section className="relative flex flex-col justify-end h-full px-3 w-full pt-2">
                            <section className="relative flex items-center w-full space-x-4 justify-end">
                                <ThemeSwitcher />
                                <UserMenus />
                            </section>
                        </section>
                    </header>
                    <section className="ml-2 mr-2 mt-24">{children}</section>
                </section>
            </section>
        </main>
    );
};
