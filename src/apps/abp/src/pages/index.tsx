import type { NextPage } from "next";
import { Hero, LandingLayout } from "@abpreact/ui";
import { Menus } from "../utils/Constants";

const Index: NextPage = () => {
  return <LandingLayout menus={Menus}>
    <Hero />
  </LandingLayout>;
};

export default Index;
