import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Button } from '../Shared/Button';

export interface SidebarProps {
    menus: {
        Name: string;
        Link: string;
        Icon: React.FC;
    }[];
}

export const Sidebar = ({ menus }: SidebarProps) => {
    const router = useRouter();
    const [toggleSidebar, setToggleSidebar] = useState(false);
    // const onResize = () => {
    //     setToggleSidebar(false);
    // };
    // useEffect(() => {
    //     window.addEventListener('resize', onResize);
    //     return () => {
    //         window.removeEventListener('resize', onResize);
    //     };
    // }, []);
    return (
        <section
            className={classNames(
                'h-screen flex shadow-lg absolute w-54 pt-6 pl-2 pr-2',
                {
                    '-translate-x-4': toggleSidebar,
                    'translate-x-0': !toggleSidebar
                }
            )}
        >
            <section className="h-full">
                <section className="flex items-center justify-center">
                    <Link href="/" className="text-2xl font-bold">
                        My Startup
                    </Link>
                    <section className="ml-6">
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
                </section>
                <nav className="mt-6">
                    <section>
                        {menus.map((menu, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={menu.Link}
                                    passHref={true}
                                >
                                    <section
                                        key={index}
                                        className={classNames(
                                            menu.Link === router.asPath
                                                ? 'text-blue-500 border-blue-500 from-white to-blue-100 border-r-4 '
                                                : '',
                                            'w-full cursor-pointer font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r'
                                        )}
                                    >
                                        <span className="text-left">
                                            {<menu.Icon />}
                                        </span>
                                        <span className="mx-4 text-sm font-normal">
                                            {menu.Name}
                                        </span>
                                    </section>
                                </Link>
                            );
                        })}
                    </section>
                </nav>
            </section>
        </section>
    );
};
