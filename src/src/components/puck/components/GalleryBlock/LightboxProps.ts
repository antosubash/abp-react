import { GalleryItem } from './GalleryItemProps'

export interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  images: GalleryItem[]
  currentIndex: number
  onNavigate: (index: number) => void
  theme: 'light' | 'dark'
} 