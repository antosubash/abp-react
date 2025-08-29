export interface TestimonialBlockProps {
  quote: string
  author: string
  position?: string
  company?: string
  avatar?: string
  rating?: number
  alignment?: 'left' | 'center' | 'right'
  style?: 'default' | 'card' | 'minimal'
  backgroundColor?: string
  textColor?: string
  padding?: string
}
