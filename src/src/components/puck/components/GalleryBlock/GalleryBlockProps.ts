import { GalleryItem } from './GalleryItemProps'

export interface GalleryBlockProps {
  // Layout
  layout: 'grid' | 'masonry' | 'carousel' | 'slideshow' | 'list'
  columns: number
  gap: string
  padding: string
  
  // Images
  images: GalleryItem[]
  
  // Styling
  borderRadius: string
  shadow: boolean
  hoverEffect: 'zoom' | 'overlay' | 'none'
  
  // Interactive
  lightbox: boolean
  lightboxTheme: 'light' | 'dark'
  showCaptions: boolean
  showThumbnails: boolean
  
  // Responsive
  mobileColumns: number
  tabletColumns: number
  
  // Advanced
  lazyLoading: boolean
  aspectRatio: 'auto' | 'square' | '16:9' | '4:3' | '3:2'
  imageQuality: 'low' | 'medium' | 'high'
} 