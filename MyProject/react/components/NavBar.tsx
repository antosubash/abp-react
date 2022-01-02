import React, { useState } from "react";
import ThemeChanger from "@abp/components/ThemeChanger";
import classNames from "classnames";
import { Menus } from "utils/Constants";

interface Props {}

const NavBar = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <nav className="fixed flex justify-between py-6 w-full lg:px-48 md:px-12 px-4 content-center bg-secondary z-10">
      <div className="flex items-center">
        <img src="/img/Logo_black.svg" alt="Logo" className="h-4" />
      </div>
      <ul className="font-montserrat items-center hidden md:flex">
        {Menus.map((menu, index) => {
          return (
            <li key={index} className="growing-underline mx-3">
              <a href={menu.Link}>{menu.Name}</a>
            </li>
          );
        })}
      </ul>
      <div className="font-montserrat hidden md:flex md:flex-row">
        <div className="flex items-center justify-center mr-6">
          <ThemeChanger />
        </div>
        <button className="mr-6">Login</button>
        <button className="py-2 px-4 text-white bg-black rounded-3xl">
          Signup
        </button>
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
        <ul className="font-montserrat flex flex-col mx-8 my-24 items-center text-3xl">
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
