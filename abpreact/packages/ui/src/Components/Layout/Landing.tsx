import NavBar from "../Admin/NavBar";
import Hero from "../Sections/Hero";

export interface LandingLayoutProps {
  menus : {
    Name: string;
    Link: string;
  }[]
}

const LandingLayout = ({ menus }: LandingLayoutProps) => {
  return (
    <div>
      <NavBar menus={menus}/> 
      <Hero/>
    </div>
  );
};

export default LandingLayout;
