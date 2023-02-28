// import { NextSeo } from "next-seo";
import Head from "next/head";

export type MetaProps = {
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
};

export const Meta = (props: MetaProps) => {
  return (
    <Head>
      <meta key="charSet" charSet="UTF-8" />
      <meta
        key="description"
        name="description"
        content={props.description || "React Abp"}
      />
      <meta
        key="keywords"
        name="keywords"
        content={props.keywords || "React Abp"}
      />
      <meta
        key="image"
        name="image"
        content={
          props.image || "https://reactabp.antosubash.com/img/og-image.png"
        }
      />
      <meta
        key="url"
        name="url"
        content={props.url || "https://reactabp.antosubash.com"}
      />
      <meta key="type" name="type" content={props.type || "website"} />
      <meta
        key="siteName"
        name="siteName"
        content={props.siteName || "React Abp"}
      />
      <meta key="locale" name="locale" content={props.locale || "en_US"} />
      <meta
        key="twitter"
        name="twitter"
        content={props.twitter || "@antosubash"}
      />
      <meta
        key="twitterCard"
        name="twitterCard"
        content={props.twitterCard || "summary_large_image"}
      />
      <meta
        key="twitterSite"
        name="twitterSite"
        content={props.twitterSite || "@antosubash"}
      />
      <meta
        key="twitterCreator"
        name="twitterCreator"
        content={props.twitterCreator || "@antosubash"}
      />
      <meta
        key="twitterImage"
        name="twitterImage"
        content={
          props.twitterImage ||
          "https://reactabp.antosubash.com/img/og-image.png"
        }
      />
      <meta
        key="twitterTitle"
        name="twitterTitle"
        content={props.twitterTitle || "React Abp"}
      />
      <meta
        key="twitterDescription"
        name="twitterDescription"
        content={props.twitterDescription || "React Abp"}
      />
      <meta
        key="ogTitle"
        name="ogTitle"
        content={props.ogTitle || "React Abp"}
      />
      <meta
        key="ogDescription"
        name="ogDescription"
        content={props.ogDescription || "React Abp"}
      />
      <meta
        key="ogImage"
        name="ogImage"
        content={
          props.ogImage || "https://reactabp.antosubash.com/img/og-image.png"
        }
      />
      <meta
        key="ogUrl"
        name="ogUrl"
        content={props.ogUrl || "https://reactabp.antosubash.com"}
      />
      <meta
        key="ogSiteName"
        name="ogSiteName"
        content={props.ogSiteName || "React Abp"}
      />
      <meta
        key="ogLocale"
        name="ogLocale"
        content={props.ogLocale || "en_US"}
      />
      <meta key="ogType" name="ogType" content={props.ogType || "website"} />
      <title>{props.title || "React Abp"}</title>

      {/* <NextSeo
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
      /> */}
    </Head>
  );
};
