'use client'

import { ReactNode } from 'react'
import { GridBlockProps } from './GridBlockProps'

export const GridBlock = ({
  children,
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

  return (
    <div style={gridStyle}>
      {children && Array.isArray(children) && children.length > 0 ? (
        children
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
          Add content to this grid
        </div>
      )}
    </div>
  )
} 