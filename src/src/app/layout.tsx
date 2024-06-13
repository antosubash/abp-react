import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { OpenAPI } from "@/client";
import { getSession } from "@/lib/session-utils";
import { cn } from "@/lib/utils";
import UmamiAnalytics from "@/components/analytics/umami-analytics";
import GoogleAnalytics from "@/components/analytics/google-analytics";

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL!;

OpenAPI.interceptors.request.use(async (options) => {
  const session = await getSession();
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session.access_token}`,
    __tenant: session.tenantId ?? "",
  };
  return options;
});

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
          process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
            <UmamiAnalytics
              scriptUrl={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
              websiteId={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            />
          )}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID && (
          <GoogleAnalytics
            trackingId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}
          />
        )}
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
