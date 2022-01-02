import React from "react";
import ThemeChanger from "../ThemeChanger";

interface Props {}

const LandingLayout = (props: Props) => {
  return (
    <div>
      <nav className="fixed flex justify-between py-6 w-full lg:px-48 md:px-12 px-4 content-center bg-secondary z-10">
        <div className="flex items-center">
          <img src="/img/Logo_black.svg" alt="Logo" className="h-4" />
        </div>
        <ul className="font-montserrat items-center hidden md:flex">
          <li className="mx-3 ">
            <a className="growing-underline" href="#">
              How it works
            </a>
          </li>
          <li className="growing-underline mx-3">
            <a href="#">Features</a>
          </li>
          <li className="growing-underline mx-3">
            <a href="#">Pricing</a>
          </li>
        </ul>

        <div className="font-montserrat hidden md:flex md:flex-row">
          <div className="flex items-center justify-center mr-6">
            <ThemeChanger />
          </div>
          <button className="mr-6">Login</button>
          <button className="py-2 px-4 text-white bg-black rounded-3xl">
            Signup
          </button>
        </div>
        <div id="showMenu" className="md:hidden">
          <img src="/img/Menu.svg" alt="Menu icon" />
        </div>
      </nav>
      <div
        id="mobileNav"
        className="hidden px-4 py-6 fixed top-0 left-0 h-full w-full bg-secondary z-20 animate-fade-in-down"
      >
        <div id="hideMenu" className="flex justify-end">
          <img src="/img/Cross.svg" alt="" className="h-16 w-16" />
        </div>
        <ul className="font-montserrat flex flex-col mx-8 my-24 items-center text-3xl">
          <li className="my-6">
            <a href="howitworks">How it works</a>
          </li>
          <li className="my-6">
            <a href="features">Features</a>
          </li>
          <li className="my-6">
            <a href="pricing">Pricing</a>
          </li>
        </ul>
      </div>

      <section className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
        <div className="md:flex-1 md:mr-10">
          <h1 className="font-pt-serif text-5xl font-bold mb-7">
            A headline for your
            <span className="bg-underline1 bg-left-bottom bg-no-repeat pb-2 bg-100%">
              cool website
            </span>
          </h1>
          <p className="font-pt-serif font-normal mb-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            harum tempore consectetur voluptas, cumque nobis laboriosam
            voluptatem.
          </p>
          <div className="font-montserrat">
            <button className="bg-black px-6 py-4 rounded-lg border-2 border-black border-solid text-white mr-2 mb-2">
              Call to action
            </button>
            <button className="px-6 py-4 border-2 border-black border-solid rounded-lg">
              Secondary action
            </button>
          </div>
        </div>
        <div className="flex justify-around md:block mt-8 md:mt-0 md:flex-1">
          <img src="/img/MacBook Pro.png" alt="Macbook" />
        </div>
      </section>
    </div>
  );
};

export default LandingLayout;
