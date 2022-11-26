import React, { useState } from "react";
import ThemeSwitcher from "@abp/components/ThemeChanger";
import classNames from "classnames";
import { Menus } from "utils/Constants";
import UserMenus from "@abp/components/User/UserMenus";
import Link from "next/link";

interface Props {}

const NavBar = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <nav className="fixed flex justify-between py-6 w-full lg:px-48 md:px-12 px-4 content-center bg-secondary z-10">
      <div className="flex items-center text-xl font-bold">
        <Link href="/">My Startup</Link>
      </div>
      <ul className=" items-center hidden md:flex">
        {Menus.map((menu, index) => {
          return (
            <li
              key={index}
              className="growing-underline mx-3 hover:bg-slate-300 dark:hover:bg-slate-600 p-4 rounded"
            >
              <a href={menu.Link}>{menu.Name}</a>
            </li>
          );
        })}
      </ul>
      <div className=" hidden md:flex md:flex-row">
        <div className="flex items-center justify-center mr-6">
          <ThemeSwitcher />
        </div>
        <UserMenus />
      </div>
      <div
        id="showMenu"
        className="md:hidden"
        onClick={() => setIsVisible(true)}
      >
        <img src="/img/Menu.svg" alt="Menu icon" />
      </div>
      <div
        id="mobileNav"
        className={classNames(
          "px-4 py-6 fixed top-0 left-0 h-full w-full bg-secondary z-20 animate-fade-in-down bg-white dark:bg-gray-700",
          { hidden: !isVisible }
        )}
      >
        <div
          id="hideMenu"
          className="flex justify-end"
          onClick={() => setIsVisible(false)}
        >
          <img src="/img/Cross.svg" alt="" className="h-16 w-16" />
        </div>
        <ul className="flex flex-col mx-8 my-24 items-center text-3xl">
          {Menus.map((menu, index) => {
            return (
              <li key={index} className="my-6">
                <a href={menu.Link}>{menu.Name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
