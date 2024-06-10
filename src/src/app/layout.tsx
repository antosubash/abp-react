import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OpenAPI } from "@/client";
import { getSession } from "@/lib";
import { headers } from "next/headers";

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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  var host = headers().get("host");
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
