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
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: '20px',
            marginBottom: '32px',
            opacity: 0.9,
            maxWidth: '600px',
          }}
        >
          {subtitle}
        </p>
      )}
      {showButton && buttonText && (
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
          {buttonText}
        </a>
      )}
    </div>
  )
}
