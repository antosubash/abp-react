import AdminLayout from "@abp/components/layouts/Admin";
import { NextPage } from "next";
import React from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import UserList from "@abp/components/User/UserList";
import RoleList from "@abp/components/User/RoleList";

const Users: NextPage = () => {
  return (
    <div>
      <AdminLayout>
        <div className="w-full px-2 py-4 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 bg-gray-200 dark:bg-blue-900/20 rounded-lg">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium rounded-lg",
                    selected
                      ? "bg-white dark:bg-gray-500 shadow"
                      : " hover:bg-white/[0.12]"
                  )
                }
              >
                Users
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium rounded-lg",
                    selected
                      ? "bg-white dark:bg-gray-500 shadow"
                      : " hover:bg-white/[0.12]"
                  )
                }
              >
                Roles
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel
                className={classNames(
                  "p-3",
                )}
              >
                <UserList/>
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "p-3",
                )}
              >
                <RoleList/>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Users;
