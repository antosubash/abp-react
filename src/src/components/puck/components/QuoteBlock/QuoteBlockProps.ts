export interface QuoteBlockProps {
  quote: string
  author?: string
  source?: string
  style?: 'default' | 'large' | 'minimal' | 'bordered'
  alignment?: 'left' | 'center' | 'right'
  fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: string
  backgroundColor?: string
  borderColor?: string
  padding?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
} 