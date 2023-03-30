import type { NextPage } from 'next';
import { AdminLayout, Button, Card } from '@abpreact/ui';
import { FaRocket, FaCubes, FaChevronRight } from 'react-icons/fa';
import { AdminMenus } from '../utils/Constants';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const AdminPage: NextPage = () => {
    const session = useSession();
    return (
        <AdminLayout menus={AdminMenus}>
            <section className="home">
                <div className="grid w-full justify-center space-y-10">
                    <h1 className="p-3 bg-green-400 text-white rounded-lg leading-5">
                        <span className="flex items-center">
                            <FaRocket width={24} height={24} className="mr-1" />
                            <span className="font-extrabold mr-1">
                                Congratulations,
                            </span>
                            <span className="font-semibold mr-1">
                                AbpTemplate
                            </span>
                            is successfully running!
                        </span>
                    </h1>
                    <h3 className="text-center text-xl">
                        Welcome,{' '}
                        {session?.data?.user?.name ??
                            'Please update your name under profile.'}
                    </h3>
                </div>
                <Card className="flex m-5 justify-evenly">
                    <figure className=" min-w-[10rem]">
                        <img
                            src="https://abp.io/assets/png/mastering-abp-framework.webp"
                            alt="Abp Guide"
                            width="300"
                        />
                    </figure>
                    <div className="ml-5 space-y-2 w-[30rem]">
                        <span className="uppercase text-gray-400">
                            The Offical guide
                        </span>
                        <h3 className="leading text-2xl text-gray-500">
                            Mastering ABP Framework
                        </h3>
                        <article className="pt-5 pb-5 text-gray-800">
                            <p>
                                Written by the creator of the ABP Framework,
                                this book will help you gain a complete
                                understanding of the framework and modern web
                                application development techniques.
                            </p>
                        </article>
                        <div className="space-x-5 text-white flex">
                            <Link
                                href="https://www.amazon.com/gp/product/B097Z2DM8Q/ref=dbs_a_def_rwt_hsch_vapi_tkin_p1_i0"
                                className="p-0 hover:underline rounded"
                                target="_blank"
                            >
                                <span className="bg-green-400 block p-3">
                                    Buy on Amazon US
                                </span>
                            </Link>
                            <Link
                                className="p-0 hover:underline rounded"
                                href="https://www.packtpub.com/product/mastering-abp-framework/9781801079242"
                                target="_blank"
                            >
                                <span className="bg-blue-800 block p-3">
                                    Buy on PACKT
                                </span>
                            </Link>
                        </div>
                    </div>
                </Card>
                <h3 className="text-xl text-gray-400 text-center pt-10">
                    Let's improve your application!
                </h3>
                <h4 className="text-center text-gray-800">
                    Here are some links to help you get started:
                </h4>
                <Card className="grid sm:grid-cols-3 gap-1 m-5">
                    <section className="sm:border-r-2 flex flex-col items-center space-y-5">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-800 text-2xl"
                        />
                        <h4 className="leading  text-gray-500">
                            Learn the ABP Framework
                        </h4>
                        <article>
                            <p className="text-center pl-4 pr-4">
                                Explore the compherensive documentation to learn
                                how to build a modern web application.
                            </p>
                        </article>
                        <Link
                            href="https://docs.abp.io/en/abp/latest?ref=tmpl"
                            className="underline text-gray-800 flex items-center"
                        >
                            <span>See Documents</span>
                            <FaChevronRight />
                        </Link>
                    </section>
                    <section className="sm:border-r-2 flex flex-col items-center space-y-5">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-800 text-2xl"
                        />
                        <h4 className="leading text-gray-500">Samples</h4>
                        <article>
                            <p className="text-center pl-4 pr-4">
                                See the example projects built with the ABP
                                Framework.
                            </p>
                        </article>
                        <Link
                            href="https://docs.abp.io/en/abp/latest/Samples/Index?ref=tmpl"
                            className="underline text-gray-800 flex items-center"
                        >
                            <span>All samples</span>
                            <FaChevronRight />
                        </Link>
                    </section>
                    <section className="flex flex-col items-center space-y-5">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-800 text-2xl"
                        />
                        <h4 className="leading  text-gray-500">
                            ABP Community
                        </h4>
                        <article>
                            <p className="text-center pl-4 pr-4">
                                Get involved with a vibrant community and become
                                a contributor.
                            </p>
                        </article>
                        <Link
                            href="https://community.abp.io/"
                            className="underline text-gray-800 flex items-center"
                        >
                            <span>Community</span>
                            <FaChevronRight />
                        </Link>
                        <Link
                            href="https://docs.abp.io/en/abp/latest/Contribution/Index?ref=tmpl"
                            className="underline text-gray-800 flex items-center"
                        >
                            <span>Contribute</span>
                            <FaChevronRight />
                        </Link>
                    </section>

                    <section className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-800 text-2xl"
                        />
                        <h4 className="leading  text-gray-500">ABP Blog</h4>
                        <article>
                            <p className="text-center pl-4 pr-4">
                                Take a look at our recently published articles.
                            </p>
                        </article>
                        <Link
                            href="https://blog.abp.io/abp?ref=tmpl"
                            className="underline text-gray-800 flex items-center"
                        >
                            <span>See Blogs</span>
                            <FaChevronRight />
                        </Link>
                    </section>

                    <section className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-800 text-2xl"
                        />
                        <h4 className="leading  text-gray-500">Github</h4>
                        <article>
                            <p className="text-center pl-4 pr-4">
                                Do you love the ABP Framework? Please give a
                                star to support it!
                            </p>
                            <div className="flex space-x-2 pt-2 justify-center">
                                <Link
                                    href="https://github.com/antosubash/AbpReact/issues/"
                                    className="bg-gray-500 text-white p-1 px-3 hover:underline"
                                >
                                    Issue
                                </Link>
                                <Link
                                    href="https://github.com/antosubash/AbpReact/fork"
                                    className="bg-gray-500 text-white p-1 px-3 hover:underline"
                                >
                                    Fork
                                </Link>
                            </div>
                        </article>
                        <Link
                            href="https://github.com/antosubash/AbpReact/issues/new?template=feature.md"
                            className="underline text-gray-800 flex items-center"
                        >
                            <span>Request a feature</span>
                            <FaChevronRight />
                        </Link>
                    </section>

                    <section className="flex flex-col items-center space-y-5 mt-20">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-800 text-2xl"
                        />
                        <h4 className="leading  text-gray-500">
                            Stackoverflow
                        </h4>
                        <article>
                            <p className="text-center pl-4 pr-4">
                                See answers to previously asked questions or ask
                                a new one.
                            </p>
                        </article>
                        <Link
                            href="https://stackoverflow.com/questions/tagged/abp"
                            className="underline text-gray-800 flex items-center"
                        >
                            <span>Questions</span>
                            <FaChevronRight />
                        </Link>
                        <Link
                            href="https://stackoverflow.com/questions/ask"
                            className="underline text-gray-800 flex items-center"
                        >
                            <span>Ask a Question</span>
                            <FaChevronRight />
                        </Link>
                    </section>
                </Card>
            </section>
        </AdminLayout>
    );
};

export default AdminPage;
