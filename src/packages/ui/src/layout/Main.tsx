import React from "react";
import { Toaster } from "../Shared/Toaster";
export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};
