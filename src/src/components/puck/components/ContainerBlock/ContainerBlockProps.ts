import { ReactNode } from 'react'

export interface ContainerBlockProps {
  children?: ReactNode
  maxWidth?: string
  padding?: string
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string
  borderWidth?: string
  margin?: string
  alignment?: 'left' | 'center' | 'right'
  shadow?: 'none' | 'small' | 'medium' | 'large'
} 