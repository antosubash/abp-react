'use client'

import { HeroProps } from './HeroProps'

export const Hero = ({
  title,
  subtitle,
  backgroundColor = '#1f2937',
  textColor = '#ffffff',
  showButton = true,
  buttonText = 'Learn More',
  buttonLink = '#',
  alignment = 'center',
  minHeight = '400px',
  padding = '80px 24px',
}: HeroProps) => {
  // Ensure text props are always strings
  const safeTitle = typeof title === 'string' ? title : 
                   typeof title === 'object' && title !== null ? JSON.stringify(title) :
                   'Hero Title'
  const safeSubtitle = typeof subtitle === 'string' ? subtitle : 
                      typeof subtitle === 'object' && subtitle !== null ? JSON.stringify(subtitle) :
                      ''
  const safeButtonText = typeof buttonText === 'string' ? buttonText : 
                        typeof buttonText === 'object' && buttonText !== null ? JSON.stringify(buttonText) :
                        'Learn More'
  return (
    <div
      style={{
        backgroundColor,
        color: textColor,
        padding,
        textAlign: alignment,
        minHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:
          alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '16px',
          maxWidth: '800px',
        }}
      >
        {safeTitle}
      </h1>
      {safeSubtitle && (
        <p
          style={{
            fontSize: '20px',
            marginBottom: '32px',
            opacity: 0.9,
            maxWidth: '600px',
          }}
        >
          {safeSubtitle}
        </p>
      )}
      {showButton && safeButtonText && (
        <a
          href={buttonLink}
          style={{
            display: 'inline-block',
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
          }}
        >
          {safeButtonText}
        </a>
      )}
    </div>
  )
}
