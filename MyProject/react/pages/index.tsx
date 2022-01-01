import type { NextPage } from "next";
import ThemeChanger from "@abp/components/ThemeChanger";

const Home: NextPage = () => {
  return (
    <div>
      <ThemeChanger />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default Home;
