import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../Shared/Avatar";
import { useRouter } from "next/router";
export const UserDropDown = () => {
  const session = useSession();
  const router = useRouter();

  const hasAdmin = session.data?.user?.userRole?.includes("admin");
  const picture = session.data?.user?.image;
  const name = session?.data?.user?.name;

  return (
    <div className="relative inline-block z-50">
      <Menu>
        <Menu.Button className="flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium">
          <Avatar>
            <AvatarImage src={picture!} alt={name!} />
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
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
                        onClick={() => router.push("/logout")}
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
