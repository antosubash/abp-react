export interface GalleryItem {
  id: string
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  thumbnail?: string
}

export interface GalleryItemProps {
  item: GalleryItem
  onClick?: (item: GalleryItem) => void
  showCaption?: boolean
  aspectRatio?: 'auto' | 'square' | '16:9' | '4:3' | '3:2'
  hoverEffect?: 'zoom' | 'overlay' | 'none'
  borderRadius?: string
  shadow?: boolean
} 