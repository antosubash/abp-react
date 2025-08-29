'use client'

import type { TextBlockProps } from './TextBlockProps'

export const TextBlock = ({
  text,
  type = 'paragraph',
  alignment = 'left',
  fontSize = 'base',
  fontWeight = 'normal',
  color = '#374151',
  maxWidth = 'full',
  lineHeight = 'normal',
  padding = '16px',
}: TextBlockProps) => {
  // Ensure text is always a string
  const safeText =
    typeof text === 'string'
      ? text
      : typeof text === 'object' && text !== null
        ? JSON.stringify(text)
        : 'Enter your text content here...'
  const fontSizeMap = {
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
  }

  const fontWeightMap = {
    normal: 'normal',
    medium: '500',
    semibold: '600',
    bold: 'bold',
  }

  const lineHeightMap = {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  }

  const maxWidthMap = {
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    full: '100%',
  }

  const styles = {
    textAlign: alignment,
    fontSize: fontSizeMap[fontSize],
    fontWeight: fontWeightMap[fontWeight],
    color,
    lineHeight: lineHeightMap[lineHeight],
    padding,
    maxWidth: maxWidthMap[maxWidth],
    margin: '0 auto',
  } as React.CSSProperties

  const renderText = () => {
    switch (type) {
      case 'heading':
        return <h2 style={styles}>{safeText}</h2>
      case 'subheading':
        return <h3 style={styles}>{safeText}</h3>
      case 'quote':
        return (
          <blockquote
            style={{
              ...styles,
              borderLeft: '4px solid #3b82f6',
              paddingLeft: '16px',
              fontStyle: 'italic',
            }}
          >
            {safeText}
          </blockquote>
        )
      default:
        return <p style={styles}>{safeText}</p>
    }
  }

  return <div style={{ padding: '16px' }}>{renderText()}</div>
}
