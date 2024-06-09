import React from 'react';
import { Button } from './Button';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Error = () => {
    const router = useRouter();
    return (
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-1 bg-base-200">
            <div className="w-full xl:w-1/2 relative lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <h1 className="my-2 text-primary font-bold text-2xl">
                            Looks like you've found the doorway to the great
                            nothing
                        </h1>
                        <p className="my-2 text-base-content">
                            Sorry about that! Please visit our hompage to get
                            where you need to go.
                        </p>
                        <Button
                            variant="subtle"
                            onClick={() => {
                                router.replace('/');
                            }}
                        >
                            Take me there!
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <Image
                    src="/img/Group.png"
                    width={500}
                    height={500}
                    alt="Something went wrong"
                />
            </div>
        </div>
    );
};

export default Error;
