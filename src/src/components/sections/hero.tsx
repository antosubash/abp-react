import Image from "next/legacy/image";
import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <section className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 ">
      <div className="md:flex-1 md:mr-10">
        <h1 className="text-5xl font-bold mb-7">
          A headline for your
          <span className="bg-underline1 bg-left-bottom bg-no-repeat pb-2 ">
            cool website
          </span>
        </h1>
        <p className="font-normal mb-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum harum
          tempore consectetur voluptas, cumque nobis laboriosam voluptatem.
        </p>
        <div className="flex flex-col space-x-2 sm:flex-row items-center ">
          <Button variant="default" className="w-full sm:w-1/2  mt-2 truncate">
            Call to action
          </Button>
          <Button variant="default" className="w-full sm:w-1/2  mt-2 truncate">
            Secondary action
          </Button>
        </div>
      </div>
      <div className="flex justify-around md:block mt-8 md:mt-0 md:flex-1">
        <Image src="/img/macbook.png" alt="Macbook" width={500} height={306} />
      </div>
    </section>
  );
};
