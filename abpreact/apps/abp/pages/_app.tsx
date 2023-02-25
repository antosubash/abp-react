import "../styles/globals.css";
import "../styles/main.css";
import "sweetalert2/dist/sweetalert2.min.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { I18nProvider } from "next-localization";
import i18n from "@abp/utils/i18n";
import { SessionProvider } from "next-auth/react";
import { getCookie } from "cookies-next";
import {
  ApplicationConfigurationDto,
  OpenAPI as ApiOptions,
} from "@abpreact/proxy";
import { Meta } from "@abpreact/ui";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const appConfig = pageProps.appConfig as ApplicationConfigurationDto;

  i18n.set(
    appConfig?.localization?.currentCulture?.cultureName!,
    appConfig?.localization?.values
  );
  const router = useRouter();
  const queryClient = new QueryClient();
  ApiOptions.BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
  ApiOptions.HEADERS = {
    __tenant: getCookie("__tenant") as string,
  } as Record<string, string>;
  ApiOptions.TOKEN = async () => {
    try {
      const currentSession = await fetch("/api/auth/session");
      const currentSessionJson = await currentSession.json();
      return currentSessionJson.accessToken || "";
    } catch (error) {
      return "";
    }
  };

  return (
    <SessionProvider session={session}>
      <I18nProvider i18nInstance={i18n} locale={router.locale!}>
        <QueryClientProvider client={queryClient}>
          <Meta />
          <Component {...pageProps} />
        </QueryClientProvider>
      </I18nProvider>
    </SessionProvider>
  );
}

export default MyApp;
