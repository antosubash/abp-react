export interface VideoBlockProps {
  src: string
  type?: 'video' | 'youtube' | 'vimeo'
  width?: string
  height?: string
  alignment?: 'left' | 'center' | 'right'
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  poster?: string
  padding?: string
}
