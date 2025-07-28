import { ReactNode } from 'react'

export interface GridBlockProps {
  children?: ReactNode
  columns?: string
  rows?: string
  gap?: string
  justify?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  padding?: string
  backgroundColor?: string
  minHeight?: string
  width?: string
} 