import "../styles/globals.css";
import "../styles/main.css";
import "sweetalert2/dist/sweetalert2.min.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { I18nProvider } from "next-localization";
import i18n from "@abp/utils/i18n";
import { SessionProvider } from "next-auth/react";
import { getCookie } from "cookies-next";
import { OpenAPI as ApiOptions } from "../generated/api";
import Base from "@abp/components/Base";
import Meta from "@abp/components/Meta";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  ApiOptions.BASE = getCookie("next-auth.issuer") as string;
  ApiOptions.HEADERS = {
    __tenant: getCookie("__tenant") as string,
  } as Record<string, string>;
  ApiOptions.TOKEN = async () => {
    try {
      var currentSession = await fetch("/api/auth/session");
      var currentSessionJson = await currentSession.json();
      return currentSessionJson.accessToken || "";
    } catch (error) {
      return "";
    }
  };

  return (
    <SessionProvider session={session}>
      <I18nProvider i18nInstance={i18n} locale={router.locale!}>
        <ThemeProvider attribute="class" themes={["light", "dark"]}>
          <QueryClientProvider client={queryClient}>
            <Base>
              <Meta />
              <Component {...pageProps} />
            </Base>
          </QueryClientProvider>
        </ThemeProvider>
      </I18nProvider>
    </SessionProvider>
  );
}

export default MyApp;
