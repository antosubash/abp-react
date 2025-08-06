'use client'

import { QuoteBlockProps } from './QuoteBlockProps'

export const QuoteBlock = ({
  quote,
  author,
  source,
  style = 'default',
  alignment = 'left',
  fontSize = 'lg',
  fontWeight = 'medium',
  color = '#374151',
  backgroundColor = '#f9fafb',
  borderColor = '#3b82f6',
  padding = '24px',
  maxWidth = 'lg',
}: QuoteBlockProps) => {
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

  const maxWidthMap = {
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    full: '100%',
  }

  const getQuoteStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      textAlign: alignment,
      fontSize: fontSizeMap[fontSize],
      fontWeight: fontWeightMap[fontWeight],
      color,
      lineHeight: '1.6',
      margin: '0 auto',
      maxWidth: maxWidthMap[maxWidth],
      padding,
      backgroundColor,
    }

    switch (style) {
      case 'large':
        return {
          ...baseStyles,
          fontSize: '24px',
          fontWeight: '600',
          fontStyle: 'italic',
          borderLeft: `4px solid ${borderColor}`,
          paddingLeft: '20px',
        }
      case 'minimal':
        return {
          ...baseStyles,
          fontStyle: 'italic',
          border: 'none',
          backgroundColor: 'transparent',
        }
      case 'bordered':
        return {
          ...baseStyles,
          border: `2px solid ${borderColor}`,
          borderRadius: '8px',
          fontStyle: 'italic',
        }
      default:
        return {
          ...baseStyles,
          borderLeft: `4px solid ${borderColor}`,
          paddingLeft: '20px',
          fontStyle: 'italic',
        }
    }
  }

  const attributionStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '12px',
    opacity: 0.8,
    textAlign: alignment === 'center' ? 'center' : 'right',
  }

  return (
    <div style={{ padding: '16px' }}>
      <blockquote style={getQuoteStyles()}>
        "{quote}"
        {(author || source) && (
          <footer style={attributionStyles}>
            {author && <cite>{author}</cite>}
            {author && source && <span> — </span>}
            {source && <span>{source}</span>}
          </footer>
        )}
      </blockquote>
    </div>
  )
} 