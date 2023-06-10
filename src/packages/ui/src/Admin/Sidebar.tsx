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
import { useCallback } from 'react';

export interface SidebarProps {
    menus: SubMenu[];
    toggleSidebar: boolean;
    onToggle?: (f: boolean) => void;
}

const CustomLink = ({
    m,
    path,
    icon,
    className
}: {
    m: SubMenu;
    path: string;
    icon?: React.ReactNode;
    className?: string;
}) => {
    return (
        <Link href={m.link!} passHref={true} className="block">
            <section
                className={classNames(
                    'w-full cursor-pointer font-thin flex items-center p-4 transition-colors duration-200 justify-start',
                    {
                        'bg-primary': m.link === path
                    },
                    className
                )}
            >
                {icon && <span className="text-left text-primary">{icon}</span>}
                <span
                    className={classNames('mx-4 text-sm font-normal', {
                        'text-base-content': m.link !== path,
                        'text-primary-content uppercase': m.link === path
                    })}
                >
                    {m.name}
                </span>
            </section>
        </Link>
    );
};

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
                            <span className="text-left text-primary">
                                {Icon}
                            </span>
                            <span className="mx-4 text-sm font-normal text-base-content">
                                {menu.name}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            {menu.children.map((c) => (
                                <CustomLink
                                    m={c}
                                    path={router.asPath}
                                    key={v4()}
                                    className="ml-5"
                                />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
        }

        return (
            <CustomLink m={menu} path={router.asPath} key={v4()} icon={Icon} />
        );
    };
    return (
        <section
            className={classNames(
                'h-full flex shadow-lg fixed w-[20rem] z-[10] pt-6 pl-2 pr-2  bg-base-100 text-base-content transition-transform delay-200 ease-in-out',
                {
                    'translate-x-0 sm:-translate-x-[150rem]': toggleSidebar,
                    '-translate-x-[150rem] sm:translate-x-0': !toggleSidebar
                }
            )}
        >
            <section className="h-full w-full">
                <section className="flex items-center">
                    <Link
                        href="/"
                        className="text-2xl font-bold grow sm:text-center"
                    >
                        My Startup
                    </Link>
                    <Button
                        variant="link"
                        onClick={() => onToggle?.(false)}
                        className="sm:hidden"
                    >
                        <ChevronLeftIcon width={24} height={24} />
                    </Button>
                </section>
                <nav className="mt-10">
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
