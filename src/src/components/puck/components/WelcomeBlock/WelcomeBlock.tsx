'use client'

import { WelcomeBlockProps } from './WelcomeBlockProps'

export const WelcomeBlock = ({
  title,
  description,
  showTips = true,
  alignment = 'center',
  backgroundColor = '#f8fafc',
  textColor = '#1f2937',
  padding = '48px 24px',
  borderRadius = '8px',
}: WelcomeBlockProps) => {
  return (
    <div
      style={{
        padding,
        textAlign: alignment,
        backgroundColor,
        borderRadius,
        margin: '16px',
        color: textColor,
      }}
    >
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: textColor,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: '18px',
          color: textColor === '#1f2937' ? '#6b7280' : textColor,
          marginBottom: showTips ? '24px' : '0',
          lineHeight: '1.6',
        }}
      >
        {description}
      </p>
      {showTips && (
        <div
          style={{
            backgroundColor: '#dbeafe',
            padding: '16px',
            borderRadius: '6px',
            border: '1px solid #93c5fd',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: '#1e40af',
              margin: '0',
            }}
          >
            💡 Tip: Drag components from the left sidebar to build your page!
          </p>
        </div>
      )}
    </div>
  )
}
