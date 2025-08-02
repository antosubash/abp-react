'use client'

import { ReactNode } from 'react'
import { FlexBlockProps } from './FlexBlockProps'

export const FlexBlock = ({
  items,
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

  if (!items) {
    return null
  }

  const Items = items
  return (
    <div style={flexStyle}>
      <Items />
    </div>
  )
} 