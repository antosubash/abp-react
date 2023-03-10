import { NavBar } from "../Admin/NavBar";

export interface LandingLayoutProps {
  menus: {
    Name: string;
    Link: string;
  }[];
  children?: React.ReactNode;
}

export const LandingLayout = ({ menus, children }: LandingLayoutProps) => {
  return (
    <div>
      <NavBar menus={menus} />
      {children}
    </div>
  );
};
