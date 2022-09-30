import "../styles/globals.css";
import "../styles/main.css";
import "sweetalert2/dist/sweetalert2.min.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "react-oidc-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { QueryNames } from "@abp/utils/Constants";
import Base from "@abp/components/Base";
import { createTheme } from "react-data-table-component";
import { useRouter } from "next/router";
import { I18nProvider } from "next-localization";
import i18n from "@abp/utils/i18n";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  createTheme("default", {
    background: {
      default: "transparent",
    },
  });

  createTheme("dark", {
    background: {
      default: "transparent",
    },
  });

  // Create a client
  const queryClient = new QueryClient();
  const oidcConfig = {
    authority: process.env.NEXT_PUBLIC_IDENTITY_URL!,
    client_id: process.env.NEXT_PUBLIC_IDENTITY_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_APP_URL!,
    response_type: "code",
    scope: process.env.NEXT_PUBLIC_SCOPE!,
    post_logout_redirect_uri: process.env.NEXT_PUBLIC_APP_URL!,
  };

  const onLoginSuccess = () => {
    queryClient.invalidateQueries(QueryNames.GetAppConfig);
  };

  return (
    <I18nProvider i18nInstance={i18n} locale={router.locale!}>
      <ThemeProvider attribute="class" themes={["light", "dark"]}>
        <AuthProvider {...oidcConfig} onSigninCallback={() => onLoginSuccess()}>
          <QueryClientProvider client={queryClient}>
            <Base>
              <Component {...pageProps} />
            </Base>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default MyApp;
