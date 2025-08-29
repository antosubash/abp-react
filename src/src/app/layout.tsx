import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import type React from 'react'
import GoogleAnalytics from '@/components/analytics/google-analytics'
import UmamiAnalytics from '@/components/analytics/umami-analytics'
import { setUpLayoutConfig } from '@/lib/auth'
import ReactQueryProviders from '@/lib/provider/QueryClientProvider'
import { cn } from '@/lib/utils'
import './globals.css'

await setUpLayoutConfig()

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'ABP React',
  description: 'The best way to build ABP apps',
}

/**
 * RootLayout component that sets up the basic HTML structure for the application.
 * It includes meta tags, favicon, and optionally includes analytics scripts if the environment variables are set.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The props object containing children elements to be rendered within the layout.
 * @returns {React.ReactElement} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Abp React</title>
        {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <UmamiAnalytics
            scriptUrl={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            websiteId={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID && (
          <GoogleAnalytics trackingId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID} />
        )}
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  )
}
