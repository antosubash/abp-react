'use client'

import { ReactNode } from 'react'
import { GridBlockProps } from './GridBlockProps'

export const GridBlock = ({
  items,
  columns = '1fr',
  rows = 'auto',
  gap = '16px',
  justify = 'start',
  align = 'start',
  padding = '16px',
  backgroundColor = 'transparent',
  minHeight = 'auto',
  width = '100%',
}: GridBlockProps) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap,
    justifyContent: justify,
    alignItems: align,
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
    <div style={gridStyle}>
      <Items />
    </div>
  )
} 