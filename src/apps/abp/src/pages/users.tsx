import { AdminLayout, UserList, RoleList, AddUser } from "@abpreact/ui";
import { NextPage } from "next";
import React from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useI18n } from "next-localization";
import { AdminMenus } from "../utils/Constants";

const Users: NextPage = () => {
  const i18n = useI18n();
  return (
    <div>
      <AdminLayout menus={AdminMenus}>
        <div className="w-full px-2 py-4 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 bg-gray-200  rounded-lg">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium rounded-lg",
                    selected ? "bg-white  shadow" : " hover:bg-white/[0.12]"
                  )
                }
              >
                {i18n.t("AbpIdentity.Users")}
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium rounded-lg",
                    selected ? "bg-white  shadow" : " hover:bg-white/[0.12]"
                  )
                }
              >
                {i18n.t("AbpIdentity.Roles")}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className={classNames("pt-8")}>
                <AddUser />
                <UserList />
              </Tab.Panel>
              <Tab.Panel className={classNames("pt-8")}>
                <RoleList />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Users;
