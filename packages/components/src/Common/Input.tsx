import React from "react";

type Props = {
    name: string;
    placeHolder: string;
    type: string;
    value: string;
};

const Input = (props: Props) => {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="text-sm text-gray-700 block mb-1 font-medium"
      >
        {props.name}
      </label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
        placeholder={props.placeHolder}
      />
    </div>
  );
};

export default Input;
