import { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "../Shared/ThemeChanger";
import { UserMenus } from "../User/UserMenus";

export interface NavBarProps {
  menus: {
    Name: string;
    Link: string;
  }[];
}

export const NavBar = ({menus}: NavBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <nav className="fixed flex justify-between py-6 w-full lg:px-48 md:px-12 px-4 content-center  z-10">
      <div className="flex items-center text-xl font-bold">
        <Link href="/">My Startup</Link>
      </div>
      <ul className=" items-center hidden md:flex">
        {menus.map((menu, index) => {
          return (
            <li key={index} className="growing-underline mx-3  p-4 rounded">
              <a href={menu.Link}>{menu.Name}</a>
            </li>
          );
        })}
      </ul>
      <div className="hidden md:flex md:flex-row">
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
        <Image src="/img/Menu.svg" alt="Menu icon" height={16} width={16} />
      </div>
      <div
        id="mobileNav"
        className={classNames(
          "px-4 py-6 fixed top-0 left-0 h-full w-full  z-20 animate-fade-in-down ",
          { hidden: !isVisible }
        )}
      >
        <div
          id="hideMenu"
          className="flex justify-end"
          onClick={() => setIsVisible(false)}
        >
          <Image
            src="/img/Cross.svg"
            alt=""
            className="h-16 w-16"
            height={16}
            width={16}
          />
        </div>
        <ul className="flex flex-col mx-8 my-24 items-center text-3xl">
          {menus.map((menu, index) => {
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