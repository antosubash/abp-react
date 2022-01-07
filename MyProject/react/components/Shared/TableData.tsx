import React from "react";

interface Props {
  children: React.ReactNode;
}

const TableData = (props: Props) => {
  return (
    <td
      className="px-5 py-5 border-b text-sm"
    >
      {props.children}
    </td>
  );
};

export default TableData;
