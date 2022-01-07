import React from "react";

interface Props {
    active: boolean;
    label: string;
}

const TableMenuItem = (props: Props) => {
  return (
    <button
      className={`${
        props.active ? "bg-violet-500" : ""
      } group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-slate-300 dark:hover:bg-slate-500`}
    >
      {props.label}
    </button>
  );
};

export default TableMenuItem;
