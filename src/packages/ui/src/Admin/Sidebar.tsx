import { useEffect, useRef, useState } from 'react';
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

export interface SidebarProps {
  menus: {
    Name: string;
    Link: string;
    Icon: React.FC;
  }[];
  toggleLayout: boolean
}

export const Sidebar = ({ menus, toggleLayout }: SidebarProps) => {
  const router = useRouter();

  return (
    <section className={classNames("h-screen lg:block hadow-lg w-100", {
      'block': toggleLayout,
      'hidden': !toggleLayout
    })}>
      <section className="h-full ">
        <section className="flex items-center justify-center pt-6 text-2xl font-bold">
          <Link href="/">My Startup</Link>
        </section>
        <nav className="mt-6">
          <section>
            {menus.map((menu, index) => {
              return (
                <Link key={index} href={menu.Link} passHref={true}>
                  <section
                    key={index}
                    className={classNames(
                      menu.Link === router.asPath
                        ? "text-blue-500 border-blue-500 from-white to-blue-100 border-r-4 "
                        : "",
                      "w-full cursor-pointer font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r"
                    )}
                  >
                    <span className="text-left">{<menu.Icon />}</span>
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
