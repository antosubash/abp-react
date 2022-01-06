import { AdminMenus } from "@abp/utils/Constants";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {}

const Sidebar = (props: Props) => {
  var router = useRouter();
  return (
    <div>
      <div className="h-screen hidden lg:block shadow-lg relative w-80">
        <div className="bg-white h-full dark:bg-gray-700">
          <div className="flex items-center justify-center pt-6 text-2xl font-bold">
            <Link href="/">My Startup</Link>
          </div>
          <nav className="mt-6">
            <div>
              {AdminMenus.map((menu, index) => {
                return (
                  <Link key={index} href={menu.Link} passHref={true}>
                    <div
                      key={index}
                      className={classNames(
                        menu.Link === router.asPath
                          ? "text-blue-500 border-blue-500 from-white to-blue-100 border-r-4 dark:from-gray-700 dark:to-gray-800 "
                          : "",
                        "w-full cursor-pointer font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r"
                      )}
                    >
                      <span className="text-left">{<menu.Icon />}</span>
                      <span className="mx-4 text-sm font-normal">
                        {menu.Name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
