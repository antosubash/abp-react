export interface ButtonBlockProps {
  text?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  alignment?: 'left' | 'center' | 'right'
  fullWidth?: boolean
  disabled?: boolean
  href?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  padding?: string
} 