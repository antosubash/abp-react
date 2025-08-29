'use client'

import type { DividerBlockProps } from './DividerBlockProps'

export const DividerBlock = ({
  style = 'solid',
  color = '#e5e7eb',
  width = '100%',
  height = '1px',
  margin = '24px 0',
  alignment = 'center',
}: DividerBlockProps) => {
  const borderStyles = {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
  }

  const containerStyle = {
    textAlign: alignment,
    margin,
  }

  const dividerStyle = {
    border: 'none',
    borderTop: `${height} ${borderStyles[style]} ${color}`,
    width,
    margin: '0 auto',
  }

  return (
    <div style={containerStyle}>
      <hr style={dividerStyle} />
    </div>
  )
}
