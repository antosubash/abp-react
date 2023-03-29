import classNames from 'classnames';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

import { useRouter } from 'next/router';
import { Button } from '../Shared/Button';

export interface SidebarProps {
    menus: {
        Name: string;
        Link: string;
        Icon: React.FC;
    }[];
    toggleSidebar: boolean;
    onToggle?: (f: boolean) => void;
}

export const Sidebar = ({ menus, toggleSidebar, onToggle }: SidebarProps) => {
    const router = useRouter();

    return (
        <section
            className={classNames(
                'h-full flex shadow-lg fixed w-[15rem] z-[15] pt-6 pl-2 pr-2 bg-white dark:text-black transition-transform delay-200 ease-in-out',
                {
                    'translate-x-0 sm:-translate-x-[150rem]': toggleSidebar,
                    '-translate-x-[150rem] sm:translate-x-0': !toggleSidebar
                }
            )}
        >
            <section className="h-full w-full">
                <section className="flex items-center">
                    <Link href="/" className="text-2xl font-bold grow">
                        My Startup
                    </Link>
                    <Button
                        variant="link"
                        onClick={() => onToggle?.(false)}
                        className="sm:hidden"
                    >
                        <ChevronLeftIcon
                            width={24}
                            height={24}
                            className="text-black"
                        />
                    </Button>
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
        </section>
    );
};
