import React from "react";

type Props = {
  onClick: () => void;
  displayText: string;
};

const Button = (props: Props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
        {props.displayText}
    </button>
  );
};

export default Button;
