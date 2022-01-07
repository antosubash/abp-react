import React from "react";

interface Props {
  label: string;
}

const TableHeader = (props: Props) => {
  return (
    <th className="px-5 py-3 bg-white dark:bg-gray-900 text-left text-sm uppercase font-normal">
      {props.label}
    </th>
  );
};

export default TableHeader;
