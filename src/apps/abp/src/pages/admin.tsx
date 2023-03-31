import type { NextPage } from 'next';
import { AdminLayout, Card } from '@abpreact/ui';
import {
    FaRocket,
    FaCubes,
    FaChevronRight,
    FaPlus,
    FaTwitter,
    FaGithub
} from 'react-icons/fa';
import { AdminMenus } from '../utils/Constants';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const AdminPage: NextPage = () => {
    const session = useSession();
    return (
        <AdminLayout menus={AdminMenus}>
            <section className="home">
                <div className="grid w-full justify-center space-y-10">
                    <div className="p-3 bg-green-400 text-neutral-100 rounded-lg leading-5">
                        <h1 className="inline-block text-center">
                            <FaRocket
                                width={24}
                                height={24}
                                className="mr-1 inline"
                            />
                            Congratulations, AbpTemplate is successfully
                            running!
                        </h1>
                    </div>
                    <h3 className="text-center text-xl text-neutral-100">
                        Welcome,{' '}
                        {session?.data?.user?.name ??
                            'Please update your name under profile.'}
                    </h3>
                </div>
                <Card className="flex flex-col md:flex-row m-5 justify-evenly">
                    <figure className=" min-w-[10rem]">
                        <Image
                            src="https://abp.io/assets/png/mastering-abp-framework.webp"
                            alt="Abp Guide"
                            width="300"
                            height="300"
                        />
                    </figure>
                    <div className="sm:ml-5 space-y-2 md:w-[30rem]">
                        <span className="uppercase text-neutral-400">
                            The Offical guide
                        </span>
                        <h3 className="leading text-2xl text-neutral-200">
                            Mastering ABP Framework
                        </h3>
                        <article className="pt-5 pb-5 text-neutral-100">
                            <p>
                                Written by the creator of the ABP Framework,
                                this book will help you gain a complete
                                understanding of the framework and modern web
                                application development techniques.
                            </p>
                        </article>
                        <div className="text-neutral-100  flex flex-col sm:flex-row sm:items-center sm:space-x-5">
                            <Link
                                href="https://www.amazon.com/gp/product/B097Z2DM8Q/ref=dbs_a_def_rwt_hsch_vapi_tkin_p1_i0"
                                className="p-0 hover:underline rounded mb-2"
                                target="_blank"
                            >
                                <span className="bg-green-400 block p-3">
                                    Buy on Amazon US
                                </span>
                            </Link>
                            <Link
                                className="p-0 hover:underline rounded mb-2"
                                href="https://www.packtpub.com/product/mastering-abp-framework/9781801079242"
                                target="_blank"
                            >
                                <span className="bg-blue-700 block p-3">
                                    Buy on PACKT
                                </span>
                            </Link>
                        </div>
                    </div>
                </Card>
                <h3 className="text-xl text-neutral-400 text-center pt-10">
                    {`Let's improve your application!`}
                </h3>
                <h4 className="text-center text-neutral-100 pb-10">
                    Here are some links to help you get started:
                </h4>
                <Card className="grid gap-5 sm:grid-cols-3 sm:gap-1 m-5">
                    <section className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-100 text-2xl"
                        />
                        <h4 className="leading  text-neutral-200">
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
                            className="underline text-neutral-100 flex items-center"
                        >
                            <span>See Documents</span>
                            <FaChevronRight />
                        </Link>
                    </section>
                    <section className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-100 text-2xl"
                        />
                        <h4 className="leading text-neutral-200">Samples</h4>
                        <article>
                            <p className="text-center pl-4 pr-4">
                                See the example projects built with the ABP
                                Framework.
                            </p>
                        </article>
                        <Link
                            href="https://docs.abp.io/en/abp/latest/Samples/Index?ref=tmpl"
                            className="underline text-neutral-100 flex items-center"
                        >
                            <span>All samples</span>
                            <FaChevronRight />
                        </Link>
                    </section>
                    <section className="flex flex-col items-center space-y-5 mt-20">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-100 text-2xl"
                        />
                        <h4 className="leading  text-neutral-200">
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
                            className="underline text-neutral-100 flex items-center"
                        >
                            <span>Community</span>
                            <FaChevronRight />
                        </Link>
                        <Link
                            href="https://docs.abp.io/en/abp/latest/Contribution/Index?ref=tmpl"
                            className="underline text-neutral-100 flex items-center"
                        >
                            <span>Contribute</span>
                            <FaChevronRight />
                        </Link>
                    </section>

                    <section className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-100 text-2xl"
                        />
                        <h4 className="leading  text-neutral-200">ABP Blog</h4>
                        <article>
                            <p className="text-center pl-4 pr-4">
                                Take a look at our recently published articles.
                            </p>
                        </article>
                        <Link
                            href="https://blog.abp.io/abp?ref=tmpl"
                            className="underline text-neutral-100 flex items-center"
                        >
                            <span>See Blogs</span>
                            <FaChevronRight />
                        </Link>
                    </section>

                    <section className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-100 text-2xl"
                        />
                        <h4 className="leading  text-neutral-200">Github</h4>
                        <article>
                            <p className="text-center pl-4 pr-4">
                                Do you love the ABP Framework? Please give a
                                star to support it!
                            </p>
                            <div className="flex space-x-2 pt-2 justify-center">
                                <Link
                                    href="https://github.com/antosubash/AbpReact/issues/"
                                    className="bg-neutral-200 text-white p-1 px-3 hover:underline"
                                >
                                    Issue
                                </Link>
                                <Link
                                    href="https://github.com/antosubash/AbpReact/fork"
                                    className="bg-neutral-200 text-white p-1 px-3 hover:underline"
                                >
                                    Fork
                                </Link>
                            </div>
                        </article>
                        <Link
                            href="https://github.com/antosubash/AbpReact/issues/new?template=feature.md"
                            className="underline text-neutral-100 flex items-center"
                        >
                            <span>Request a feature</span>
                            <FaChevronRight />
                        </Link>
                    </section>

                    <section className="flex flex-col items-center space-y-5 mt-20">
                        <FaCubes
                            width={48}
                            height={48}
                            className="text-blue-100 text-2xl"
                        />
                        <h4 className="leading  text-neutral-200">
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
                            className="underline text-neutral-100 flex items-center"
                        >
                            <span>Questions</span>
                            <FaChevronRight />
                        </Link>
                        <Link
                            href="https://stackoverflow.com/questions/ask"
                            className="underline text-neutral-100 flex items-center"
                        >
                            <span>Ask a Question</span>
                            <FaChevronRight />
                        </Link>
                    </section>
                </Card>
                <h3 className="text-xl text-neutral-400 text-center pt-10">
                    {`Meet the ABP Commercial`}
                </h3>
                <h4 className="text-center text-neutral-100 pb-10">
                    A Complete Web Application Platform Built on the ABP
                    Framework
                </h4>
                <Card className="m-5">
                    <article className="w-full flex justify-center">
                        <p className="text-center w-1/2">
                            ABP Commercial is a platform based on the open
                            source ABP framework. It provides pre-built
                            application modules, rapid application development
                            tooling, professional UI themes, premium support and
                            more.
                        </p>
                    </article>
                    <section className="grid lg:grid-cols-3 sm:gap-1">
                        <div className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                            <FaPlus
                                width={48}
                                height={48}
                                className="text-blue-100 text-2xl"
                            />
                            <h4 className="leading text-neutral-200">
                                Startup Templates
                            </h4>
                            <Link
                                href="https://commercial.abp.io/startup-templates?ref=tmpl"
                                className="underline text-neutral-100 flex items-center"
                            >
                                <span>Details</span>
                                <FaChevronRight />
                            </Link>
                        </div>

                        <div className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                            <FaPlus
                                width={48}
                                height={48}
                                className="text-blue-100 text-2xl"
                            />
                            <h4 className="leading text-neutral-200">
                                Application Modules
                            </h4>
                            <Link
                                href="https://commercial.abp.io/modules?ref=tmpl"
                                className="underline text-neutral-100 flex items-center"
                            >
                                <span>Details</span>
                                <FaChevronRight />
                            </Link>
                        </div>

                        <div className="flex flex-col items-center space-y-5 mt-20">
                            <FaPlus
                                width={48}
                                height={48}
                                className="text-blue-100 text-2xl"
                            />
                            <h4 className="leading text-neutral-200">
                                Developer Tools
                            </h4>
                            <Link
                                href="https://commercial.abp.io/tools?ref=tmpl"
                                className="underline text-neutral-100 flex items-center"
                            >
                                <span>Details</span>
                                <FaChevronRight />
                            </Link>
                        </div>

                        <div className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                            <FaPlus
                                width={48}
                                height={48}
                                className="text-blue-100 text-2xl"
                            />
                            <h4 className="leading text-neutral-200">
                                UI Themes
                            </h4>
                            <Link
                                href="https://commercial.abp.io/themes?ref=tmpl"
                                className="underline text-gray-100 flex items-center"
                            >
                                <span>Details</span>
                                <FaChevronRight />
                            </Link>
                        </div>

                        <div className="sm:border-r-2 flex flex-col items-center space-y-5 mt-20">
                            <FaPlus
                                width={48}
                                height={48}
                                className="text-blue-100 text-2xl"
                            />
                            <h4 className="leading text-neutral-200">
                                Premium Support
                            </h4>
                            <Link
                                href="https://support.abp.io/QA/Questions?ref=tmpl"
                                className="underline text-neutral-100 flex items-center"
                            >
                                <span>Details</span>
                                <FaChevronRight />
                            </Link>
                        </div>

                        <div className="flex flex-col items-center space-y-5 mt-20">
                            <FaPlus
                                width={48}
                                height={48}
                                className="text-blue-100 text-2xl"
                            />
                            <h4 className="leading text-neutral-200">
                                Additional Services
                            </h4>
                            <Link
                                href="https://commercial.abp.io/additional-services?ref=tmpl"
                                className="underline text-neutral-100 flex items-center"
                            >
                                <span>Details</span>
                                <FaChevronRight />
                            </Link>
                        </div>
                    </section>
                </Card>

                <div className="social flex flex-col justify-center items-center sm:flex-row sm:items-center sm:space-x-4 mt-20 mb-10">
                    <Link
                        href="https://twitter.com/abpframework"
                        className="hover:underline text-neutral-100 flex items-center pb-5"
                    >
                        <FaTwitter
                            width={48}
                            height={48}
                            className="text-blue-100 text-2xl mr-1"
                        />
                        <span>Abp Framework</span>
                    </Link>
                    <Link
                        href="https://twitter.com/abpcommercial"
                        className="hover:underline text-neutral-100 flex items-center  pb-5"
                    >
                        <FaTwitter
                            width={48}
                            height={48}
                            className="text-blue-100 text-2xl mr-1"
                        />
                        <span>Abp Commerical</span>
                    </Link>
                    <Link
                        href="https://github.com/abpframework/abp"
                        className="hover:underline text-neutral-100 flex items-center  pb-5"
                    >
                        <FaGithub
                            width={48}
                            height={48}
                            className="text-blue-100 text-2xl mr-1"
                        />
                        <span>abpframework</span>
                    </Link>
                </div>
            </section>
        </AdminLayout>
    );
};

export default AdminPage;
