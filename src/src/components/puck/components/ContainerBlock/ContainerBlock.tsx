'use client'

import { ContainerBlockProps } from './ContainerBlockProps'

export const ContainerBlock = ({
  maxWidth = '1200px',
  padding = '24px',
  backgroundColor = 'transparent',
  borderColor = 'transparent',
  borderRadius = '0px',
  borderWidth = '0px',
  margin = '0px',
  alignment = 'left',
  shadow = 'none',
  items,
}: ContainerBlockProps) => {
  const shadowStyles = {
    none: 'none',
    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 25px rgba(0, 0, 0, 0.15)',
  }

  const containerStyle = {
    maxWidth,
    padding,
    backgroundColor,
    border: `${borderWidth} solid ${borderColor}`,
    borderRadius,
    margin,
    textAlign: alignment,
    boxShadow: shadowStyles[shadow],
    width: '100%',
    boxSizing: 'border-box' as const,
  }

  const Items = items
  return <div style={containerStyle}>{Items && <Items />}</div>   
} 