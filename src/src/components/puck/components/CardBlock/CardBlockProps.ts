export interface CardBlockProps {
  title: string
  description: string
  content?: string
  image?: string
  buttonText?: string
  buttonLink?: string
  variant?: 'default' | 'outline'
  alignment?: 'left' | 'center' | 'right'
  backgroundColor?: string
  borderColor?: string
  padding?: string
  borderRadius?: string
}
