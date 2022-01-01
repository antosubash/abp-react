import "../styles/globals.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" themes={['light', 'dark']}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
