export interface TableBlockProps {
  data: string[][]
  headers?: string[]
  style?: 'default' | 'striped' | 'bordered' | 'minimal'
  alignment?: 'left' | 'center' | 'right'
  fontSize?: 'sm' | 'base' | 'lg'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: string
  borderColor?: string
  headerBackgroundColor?: string
  headerTextColor?: string
  rowBackgroundColor?: string
  rowTextColor?: string
  stripedRowColor?: string
}
