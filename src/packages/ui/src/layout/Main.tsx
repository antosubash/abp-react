import React from "react";
export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <section className="main-layout"> 
      {children}
    </section>
  );
};
