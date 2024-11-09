import React from 'react'

interface GoogleAnalyticsProps {
  trackingId: string
}

/**
 * GoogleAnalytics component integrates Google Analytics into a React application.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.trackingId - The Google Analytics tracking ID. This is required for the component to function.
 *
 * @example
 * // Usage example:
 * <GoogleAnalytics trackingId="UA-XXXXXXXXX-X" />
 *
 * @returns {JSX.Element | null} Returns the Google Analytics script tags or null if trackingId is not provided.
 */
const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ trackingId }) => {
  if (!trackingId) {
    console.error('Google Analytics tracking ID is required.')
    return null
  }

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}');
          `,
        }}
      ></script>
    </>
  )
}

export default GoogleAnalytics
