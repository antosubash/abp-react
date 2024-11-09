import React from 'react'

interface UmamiAnalyticsProps {
  scriptUrl: string
  websiteId: string
}

/**
 * UmamiAnalytics component is responsible for embedding the Umami analytics script into the application.
 *
 * @param {string} scriptUrl - The URL of the Umami analytics script.
 * @param {string} websiteId - The unique identifier for the website being tracked.
 *
 * @returns {JSX.Element | null} - Returns a script element with the provided script URL and website ID, or null if either parameter is missing.
 */
const UmamiAnalytics: React.FC<UmamiAnalyticsProps> = ({ scriptUrl, websiteId }) => {
  if (!scriptUrl || !websiteId) {
    console.error('Umami script URL and website ID are required.')
    return null
  }
  return <script defer src={scriptUrl} data-website-id={websiteId}></script>
}

export default UmamiAnalytics
