import { NextSeo } from "next-seo";
import Head from "next/head";

type MetaProps = {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
    locale?: string;
    twitter?: string;
    twitterCard?: string;
    twitterSite?: string;
    twitterCreator?: string;
    twitterImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    ogSiteName?: string;
    ogLocale?: string;
    ogType?: string;
}

const Meta = (props: MetaProps) => {
  return (
    <Head>
      <meta key="charSet" charSet="UTF-8" />
      <NextSeo
        title={props.title || "React Abp"}
        description={props.description || "React Abp"}
        canonical={props.url || "https://reactabp.antosubash.com"}
        openGraph={{
          url: props.url || "https://reactabp.antosubash.com",
          title: props.ogTitle || "React Abp",
          description: props.ogDescription || "React Abp",
          images: [
            {
              url:
                props.ogImage ||
                "https://reactabp.antosubash.com/img/og-image.png",
              width: 800,
              height: 600,
              alt: "React Abp",
            },
          ],
          site_name: props.ogSiteName || "React Abp",
        }}
        twitter={{
          handle: props.twitter || "@antosubash",
          site: props.twitterSite || "@antosubash",
          cardType: props.twitterCard || "summary_large_image",
        }}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta key="httpEquiv" httpEquiv="x-ua-compatible" content="ie=edge" />
    </Head>
  );
};

export default Meta;