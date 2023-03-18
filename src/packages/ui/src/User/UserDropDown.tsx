import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const UserDropDown = () => {
  const session = useSession()
  const hasAdmin = session.data?.user?.userRole;
  return (
    <div className="relative inline-block z-50">
      <Menu>
        <Menu.Button className="flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium  hover:bg-gray-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
          <svg
            width="20"
            fill="currentColor"
            height="20"
            className="text-gray-800 "
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
          </svg>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items>
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 bg-white">
              <div
                className="py-1 "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {hasAdmin && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/admin" passHref={true}>
                        <div
                          className={`${
                            active && "bg-blue-500"
                          } block cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900  `}
                        >
                          Admin
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <Link href="#" passHref={true}>
                      <div
                        className={`${
                          active && "bg-blue-500"
                        } block cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900  `}
                        onClick={async () => {
                        await signOut({redirect: true});
                       
                        }}
                      >
                        Sign out
                      </div>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};