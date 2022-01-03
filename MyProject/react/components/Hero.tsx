import React from "react";

interface Props {}

const Hero = (props: Props) => {
  return (
    <section className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
      <div className="md:flex-1 md:mr-10">
        <h1 className="text-5xl font-bold mb-7">
          A headline for your
          <span className="bg-underline1 bg-left-bottom bg-no-repeat pb-2 bg-100%">
            cool website
          </span>
        </h1>
        <p className="font-normal mb-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum harum
          tempore consectetur voluptas, cumque nobis laboriosam voluptatem.
        </p>
        <div>
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
  );
};

export default Hero;
