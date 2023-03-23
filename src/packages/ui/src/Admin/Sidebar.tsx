import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon, ChevronLeftIcon } from '@heroicons/react/24/solid';
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
    const parentNode = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={parentNode}
            className={classNames(
                'h-full flex shadow-lg absolute w-[20rem] z-[10] pt-6 pl-2 pr-2 bg-white dark:text-black transition-transform delay-100 ease-in-out -translate-x-[20rem] sm:translate-x-0',
                {
                    '-translate-x-0': toggleSidebar
                }
            )}
        >
            <section className="h-full w-full">
                <section className="flex items-center">
                    <Link href="/" className="text-2xl font-bold">
                        My Startup
                    </Link>
                </section>
                <nav className="mt-6">
                    <section className="w-full">
                        {menus.map((menu, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={menu.Link}
                                    passHref={true}
                                    className="block"
                                >
                                    <section
                                        key={index}
                                        className={classNames(
                                            'w-full cursor-pointer font-thin flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r',
                                            {
                                                'text-blue-500 border-blue-500 from-white to-blue-100 border-r-4':
                                                    menu.Link === router.asPath
                                            }
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
            <section className="absolute right-[-2.4rem] sm:hidden">
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
        </section>
    );
};
