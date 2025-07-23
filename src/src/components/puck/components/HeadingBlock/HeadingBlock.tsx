'use client'

import { HeadingBlockProps } from './HeadingBlockProps'

export const HeadingBlock = ({
  title,
  level = 'h1',
  alignment = 'left',
  fontSize = '3xl',
  fontWeight = 'bold',
  color = '#1f2937',
  margin = '16px',
}: HeadingBlockProps) => {
  const fontSizeMap = {
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  }

  const fontWeightMap = {
    normal: 'normal',
    medium: '500',
    semibold: '600',
    bold: 'bold',
    extrabold: '800',
  }

  const styles = {
    textAlign: alignment,
    fontSize: fontSizeMap[fontSize],
    fontWeight: fontWeightMap[fontWeight],
    color,
    margin,
    lineHeight: '1.2',
    padding: '16px',
  } as React.CSSProperties

  const renderHeading = () => {
    switch (level) {
      case 'h1':
        return <h1 style={styles}>{title}</h1>
      case 'h2':
        return <h2 style={styles}>{title}</h2>
      case 'h3':
        return <h3 style={styles}>{title}</h3>
      case 'h4':
        return <h4 style={styles}>{title}</h4>
      case 'h5':
        return <h5 style={styles}>{title}</h5>
      case 'h6':
        return <h6 style={styles}>{title}</h6>
      default:
        return <h1 style={styles}>{title}</h1>
    }
  }

  return <div style={{ padding: '32px 16px' }}>{renderHeading()}</div>
}
