export interface CarouselSlide {
  id: string
  imageUrl?: string
  title?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  backgroundColor?: string
  textColor?: string
  textAlignment?: 'left' | 'center' | 'right'
  overlayOpacity?: number
}

export interface CarouselBlockProps {
  slides: CarouselSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  loop?: boolean
  pauseOnHover?: boolean
  height?: string
  width?: string
  maxWidth?: string
  padding?: string
  borderRadius?: string
  shadow?: boolean
  arrowColor?: string
  arrowBackgroundColor?: string
  dotColor?: string
  dotActiveColor?: string
  responsive?: {
    mobile: {
      height?: string
      showArrows?: boolean
      showDots?: boolean
    }
    tablet: {
      height?: string
      showArrows?: boolean
      showDots?: boolean
    }
    desktop: {
      height?: string
      showArrows?: boolean
      showDots?: boolean
    }
  }
} 