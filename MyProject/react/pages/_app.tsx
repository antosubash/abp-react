import "../styles/globals.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "react-oidc-context";
import Loader from "@abp/components/Loader";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const oidcConfig = {
    authority: process.env.NEXT_PUBLIC_IDENTITY_URL!,
    client_id: process.env.NEXT_PUBLIC_IDENTITY_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_APP_URL!,
    response_type: "code",
    scope: process.env.NEXT_PUBLIC_IDENTITY_SCOPE!,
    post_logout_redirect_uri: process.env.NEXT_PUBLIC_APP_URL!,
  };

  return (
    <ThemeProvider attribute="class" themes={["light", "dark"]}>
      <AuthProvider {...oidcConfig}>
        {isLoading ? <Loader /> : <Component {...pageProps} />}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
