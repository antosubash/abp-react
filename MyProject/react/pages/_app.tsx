import "../styles/globals.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "react-oidc-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { QueryNames } from "@abp/utils/Constants";
import Base from "@abp/components/Base";

function MyApp({ Component, pageProps }: AppProps) {
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
    <ThemeProvider attribute="class" themes={["light", "dark"]}>
      <AuthProvider {...oidcConfig} onSigninCallback={() => onLoginSuccess()}>
        <QueryClientProvider client={queryClient}>
          <Base>
            <Component {...pageProps} />
          </Base>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
