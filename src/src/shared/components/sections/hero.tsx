import Image from 'next/image'

export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                My new fancy app
              </h1>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2"></div>
          </div>
          <Image
            src="/img/macbook.png"
            alt="Hero"
            className="rounded-xl"
            width={900}
            height={600}
          />
        </div>
      </div>
    </section>
  )
}
