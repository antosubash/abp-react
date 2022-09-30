import * as React from "react";

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <button className="bg-white p-3 text-lg font-bold">{props.children}</button>;
}

Button.displayName = "Button";
