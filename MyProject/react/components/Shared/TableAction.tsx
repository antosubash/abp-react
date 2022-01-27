import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import TableMenuItem from "./TableMenuItem";

interface Props {}

const TableAction = (props: Props) => {
  return (
    <td className="flex items-center px-5 py-5 border-b">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Options
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 "
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => <TableMenuItem active={active} label="Edit" />}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => <TableMenuItem active={active} label="Permission" />}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => <TableMenuItem active={active} label="Delete" />}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </td>
  );
};

export default TableAction;
