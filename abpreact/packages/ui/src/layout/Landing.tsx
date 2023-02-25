import { NavBar } from "../Admin/NavBar";
import { Hero } from "../Sections/Hero";

export interface LandingLayoutProps {
  menus: {
    Name: string;
    Link: string;
  }[];
}

export const LandingLayout = ({ menus }: LandingLayoutProps) => {
  return (
    <div>
      <NavBar menus={menus} />
      <Hero />
    </div>
  );
};
