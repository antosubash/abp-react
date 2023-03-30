import classNames from 'classnames';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { v4 } from 'uuid';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '../Shared/Accordion';
import { useRouter } from 'next/router';
import { Button } from '../Shared/Button';
import { SubMenu } from '../layout/Admin';
import { useCallback, useEffect, useState } from 'react';

export interface SidebarProps {
    menus: SubMenu[];
    toggleSidebar: boolean;
    onToggle?: (f: boolean) => void;
}

export const Sidebar = ({ menus, toggleSidebar, onToggle }: SidebarProps) => {
    const router = useRouter();

    const getDefaultValue = useCallback(
        (menu: SubMenu) => {
            const m = menu.children?.find((c) => c.link === router.asPath);
            if (m) return menu.name;
            return '';
        },
        [router]
    );
    const renderElements = (menu: SubMenu) => {
        const Icon = menu.icon ? <menu.icon /> : false;
        if (menu.children && menu.children.length > 0) {
            return (
                <Accordion
                    type="single"
                    collapsible
                    key={v4()}
                    defaultValue={getDefaultValue(menu)}
                >
                    <AccordionItem value={menu.name}>
                        <AccordionTrigger>
                            <span className="text-left">{Icon}</span>
                            <span className="mx-4 text-sm font-normal">
                                {menu.name}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            {menu.children.map((c) => (
                                <Link
                                    href={c.link!}
                                    passHref={true}
                                    className="block"
                                    key={v4()}
                                >
                                    <section
                                        className={classNames(
                                            'w-full cursor-pointer font-thin flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r',
                                            {
                                                'text-blue-500 border-blue-500 from-white to-blue-100 border-r-4':
                                                    c.link === router.asPath
                                            }
                                        )}
                                    >
                                        <span className="mx-4 text-sm font-normal">
                                            {c.name}
                                        </span>
                                    </section>
                                </Link>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
        }

        return (
            <Link
                href={menu.link!}
                passHref={true}
                className="block"
                key={v4()}
            >
                <section
                    className={classNames(
                        'w-full cursor-pointer font-thin flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r',
                        {
                            'text-blue-500 border-blue-500 from-white to-blue-100 border-r-4':
                                menu.link === router.asPath
                        }
                    )}
                >
                    <span className="text-left">{Icon}</span>
                    <span className="mx-4 text-sm font-normal">
                        {menu.name}
                    </span>
                </section>
            </Link>
        );
    };
    return (
        <section
            className={classNames(
                'h-full flex shadow-lg fixed w-[20rem] z-[15] pt-6 pl-2 pr-2 bg-white dark:text-black transition-transform delay-200 ease-in-out',
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
                        <Accordion type="single" collapsible>
                            {menus.map(renderElements)}
                        </Accordion>
                    </section>
                </nav>
            </section>
        </section>
    );
};
