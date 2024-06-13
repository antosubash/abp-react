import React from 'react'

interface UmamiAnalyticsProps {
  scriptUrl: string
  websiteId: string
}

const UmamiAnalytics: React.FC<UmamiAnalyticsProps> = ({ scriptUrl, websiteId }) => {
  if (!scriptUrl || !websiteId) {
    console.error('Umami script URL and website ID are required.')
    return null
  }
  return <script defer src={scriptUrl} data-website-id={websiteId}></script>
}

export default UmamiAnalytics
