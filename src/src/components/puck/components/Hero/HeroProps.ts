export interface HeroProps {
  preset?: 'default' | 'modern-gradient' | 'dark-professional' | 'light-clean' | 'bold-bright' | 'minimal'
  title: string
  subtitle?: string
  backgroundColor?: string
  backgroundImage?: string
  backgroundOverlay?: string
  textColor?: string
  showButton?: boolean
  buttonText?: string
  buttonLink?: string
  buttonStyle?: 'primary' | 'secondary' | 'outline' | 'ghost'
  showSecondaryButton?: boolean
  secondaryButtonText?: string
  secondaryButtonLink?: string
  secondaryButtonStyle?: 'primary' | 'secondary' | 'outline' | 'ghost'
  alignment?: 'left' | 'center' | 'right'
  minHeight?: string
  padding?: string
  titleSize?: 'small' | 'medium' | 'large' | 'xl'
  subtitleSize?: 'small' | 'medium' | 'large'
  showGradient?: boolean
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl'
  gradientColors?: string
  animation?: 'none' | 'fade-in' | 'slide-up' | 'slide-down'
  borderRadius?: string
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}
