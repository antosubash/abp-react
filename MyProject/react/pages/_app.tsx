import "../styles/globals.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "react-oidc-context";
import Loader from "@abp/components/Loader";
import { useEffect, useState } from "react";
import useAppConfigStore from "@abp/stores/appConfig";
import { SWRConfig } from "swr";
import axiosInstance from "@abp/utils/axiosInstance";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  const oidcConfig = {
    authority: process.env.NEXT_PUBLIC_IDENTITY_URL!,
    client_id: process.env.NEXT_PUBLIC_IDENTITY_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_APP_URL!,
    response_type: "code",
    scope: process.env.NEXT_PUBLIC_SCOPE!,
    post_logout_redirect_uri: process.env.NEXT_PUBLIC_APP_URL!,
  };

  const appConfigStore = useAppConfigStore();

  useEffect(() => {
    if (!appConfigStore.isDone) {
      appConfigStore.fetchAppConfig().finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetcher = (url: any) => axiosInstance.get(url).then((res) => res.data);
  return (
    <ThemeProvider attribute="class" themes={["light", "dark"]}>
      <AuthProvider {...oidcConfig}>
        {isLoading ? (
          <Loader />
        ) : (
          <SWRConfig
            value={{
              refreshInterval: 3000,
              fetcher: (resource, init) =>
                axiosInstance.get(resource, init).then((res) => res.data),
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
