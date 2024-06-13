'use client'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from './button'

const Error = () => {
  const router = useRouter()
  return (
    <div className="bg-base-200 flex flex-col-reverse items-center justify-center gap-1 px-4 py-24 md:gap-28 md:px-44 md:py-20 lg:flex-row lg:px-24 lg:py-24">
      <div className="relative w-full lg:pb-0 xl:w-1/2">
        <div className="relative">
          <div className="absolute">
            <h1 className="my-2 text-2xl font-bold text-primary">
              Looks like you have found the doorway to the great nothing
            </h1>
            <p className="text-base-content my-2">
              Sorry about that! Please visit our homepage to get where you need to go.
            </p>
            <Button
              onClick={() => {
                router.replace('/')
              }}
            >
              Take me there!
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Image src="/img/Group.png" width={500} height={500} alt="Something went wrong" />
      </div>
    </div>
  )
}

export default Error
