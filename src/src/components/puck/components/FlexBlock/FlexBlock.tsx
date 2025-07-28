'use client'

import { ReactNode } from 'react'
import { FlexBlockProps } from './FlexBlockProps'

export const FlexBlock = ({
  children,
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  wrap = 'nowrap',
  gap = '0px',
  padding = '16px',
  backgroundColor = 'transparent',
  minHeight = 'auto',
  width = '100%',
}: FlexBlockProps) => {
  const flexStyle = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    gap,
    padding,
    backgroundColor,
    minHeight,
    width,
  }

  return (
    <div style={flexStyle}>
      {children && Array.isArray(children) && children.length > 0 ? (
        children
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
          Add content to this flex container
        </div>
      )}
    </div>
  )
} 