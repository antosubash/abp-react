import type { Slot } from '../../core/types'

export interface ContainerBlockProps {
  maxWidth?: string
  padding?: string
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string
  borderWidth?: string
  margin?: string
  alignment?: 'left' | 'center' | 'right'
  shadow?: 'none' | 'small' | 'medium' | 'large'
  items?: Slot
}
