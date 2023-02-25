import React from "react";

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  return <div>{props.children}</div>;
};

export default MainLayout;
