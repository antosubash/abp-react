'use client'

import { SpacerBlockProps } from './SpacerBlockProps'

export const SpacerBlock = ({
  height = '40px',
  backgroundColor = 'transparent',
  borderTop = 'none',
  borderBottom = 'none',
}: SpacerBlockProps) => {
  const spacerStyle = {
    height,
    backgroundColor,
    borderTop,
    borderBottom,
    width: '100%',
  }

  return <div style={spacerStyle} />
} 