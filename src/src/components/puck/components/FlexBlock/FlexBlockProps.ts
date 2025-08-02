import { Slot } from '../../core/types'

export interface FlexBlockProps {
  items?: Slot
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: string
  padding?: string
  backgroundColor?: string
  minHeight?: string
  width?: string
} 