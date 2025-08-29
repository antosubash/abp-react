export interface ListBlockProps {
  items: string[]
  type?: 'ordered' | 'unordered' | 'checklist'
  style?: 'default' | 'minimal' | 'bordered'
  alignment?: 'left' | 'center' | 'right'
  fontSize?: 'sm' | 'base' | 'lg'
  spacing?: 'tight' | 'normal' | 'loose'
  markerColor?: string
  textColor?: string
  backgroundColor?: string
  padding?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}
