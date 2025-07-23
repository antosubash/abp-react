export interface HeadingBlockProps {
  title: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  alignment?: 'left' | 'center' | 'right'
  fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  color?: string
  margin?: string
}
