'use client'

import { cn } from '@/lib/utils'
import type { HeroProps } from './HeroProps'

// Preset configurations
const presets = {
  default: {
    backgroundColor: '#0f172a',
    backgroundOverlay: 'rgba(15, 23, 42, 0.7)',
    textColor: '#ffffff',
    showGradient: true,
    gradientDirection: 'to-br' as const,
    gradientColors: '#667eea, #764ba2, #f093fb',
    buttonStyle: 'primary' as const,
    secondaryButtonStyle: 'outline' as const,
    shadow: 'xl' as const,
  },
  'modern-gradient': {
    backgroundColor: '#1e293b',
    backgroundOverlay: 'rgba(30, 41, 59, 0.8)',
    textColor: '#ffffff',
    showGradient: true,
    gradientDirection: 'to-r' as const,
    gradientColors: '#3b82f6, #8b5cf6, #ec4899',
    buttonStyle: 'primary' as const,
    secondaryButtonStyle: 'ghost' as const,
    shadow: 'xl' as const,
  },
  'dark-professional': {
    backgroundColor: '#111827',
    backgroundOverlay: 'rgba(17, 24, 39, 0.9)',
    textColor: '#ffffff',
    showGradient: false,
    gradientDirection: 'to-r' as const,
    gradientColors: '#374151, #1f2937',
    buttonStyle: 'primary' as const,
    secondaryButtonStyle: 'outline' as const,
    shadow: 'lg' as const,
  },
  'light-clean': {
    backgroundColor: '#ffffff',
    backgroundOverlay: 'rgba(255, 255, 255, 0.1)',
    textColor: '#1f2937',
    showGradient: false,
    gradientDirection: 'to-r' as const,
    gradientColors: '#f3f4f6, #e5e7eb',
    buttonStyle: 'primary' as const,
    secondaryButtonStyle: 'outline' as const,
    shadow: 'md' as const,
  },
  'bold-bright': {
    backgroundColor: '#dc2626',
    backgroundOverlay: 'rgba(220, 38, 38, 0.8)',
    textColor: '#ffffff',
    showGradient: true,
    gradientDirection: 'to-br' as const,
    gradientColors: '#dc2626, #ea580c, #f59e0b',
    buttonStyle: 'primary' as const,
    secondaryButtonStyle: 'outline' as const,
    shadow: 'xl' as const,
  },
  minimal: {
    backgroundColor: '#f8fafc',
    backgroundOverlay: 'rgba(248, 250, 252, 0.1)',
    textColor: '#0f172a',
    showGradient: false,
    gradientDirection: 'to-r' as const,
    gradientColors: '#f1f5f9, #e2e8f0',
    buttonStyle: 'outline' as const,
    secondaryButtonStyle: 'ghost' as const,
    shadow: 'sm' as const,
  },
}

export const Hero = ({
  preset = 'default',
  title,
  subtitle,
  backgroundColor,
  backgroundImage = '',
  backgroundOverlay,
  textColor,
  showButton = true,
  buttonText = 'Get Started',
  buttonLink = '#',
  buttonStyle,
  showSecondaryButton = true,
  secondaryButtonText = 'Learn More',
  secondaryButtonLink = '#',
  secondaryButtonStyle,
  alignment = 'center',
  minHeight = '600px',
  padding = '100px 24px',
  titleSize = 'xl',
  subtitleSize = 'large',
  showGradient,
  gradientDirection,
  gradientColors,
  animation = 'fade-in',
  borderRadius = '0px',
  shadow,
}: HeroProps) => {
  // Apply preset configuration
  const presetConfig = presets[preset]
  const finalBackgroundColor = backgroundColor || presetConfig.backgroundColor
  const finalBackgroundOverlay = backgroundOverlay || presetConfig.backgroundOverlay
  const finalTextColor = textColor || presetConfig.textColor
  const finalShowGradient = showGradient !== undefined ? showGradient : presetConfig.showGradient
  const finalGradientDirection = gradientDirection || presetConfig.gradientDirection
  const finalGradientColors = gradientColors || presetConfig.gradientColors
  const finalButtonStyle = buttonStyle || presetConfig.buttonStyle
  const finalSecondaryButtonStyle = secondaryButtonStyle || presetConfig.secondaryButtonStyle
  const finalShadow = shadow || presetConfig.shadow

  // Ensure text props are always strings
  const safeTitle =
    typeof title === 'string'
      ? title
      : typeof title === 'object' && title !== null
        ? JSON.stringify(title)
        : 'Hero Title'
  const safeSubtitle =
    typeof subtitle === 'string'
      ? subtitle
      : typeof subtitle === 'object' && subtitle !== null
        ? JSON.stringify(subtitle)
        : ''
  const safeButtonText =
    typeof buttonText === 'string'
      ? buttonText
      : typeof buttonText === 'object' && buttonText !== null
        ? JSON.stringify(buttonText)
        : 'Get Started'
  const safeSecondaryButtonText =
    typeof secondaryButtonText === 'string'
      ? secondaryButtonText
      : typeof secondaryButtonText === 'object' && secondaryButtonText !== null
        ? JSON.stringify(secondaryButtonText)
        : 'Learn More'

  // Generate background style
  const getBackgroundStyle = () => {
    if (backgroundImage && backgroundImage.trim()) {
      return {
        backgroundImage: `url(${backgroundImage})`,
      }
    }

    if (finalShowGradient && finalGradientColors) {
      const colors = finalGradientColors
        .split(',')
        .map((c) => c.trim())
        .join(', ')
      return {
        background: `linear-gradient(${finalGradientDirection}, ${colors})`,
      }
    }

    return {
      backgroundColor: finalBackgroundColor,
    }
  }

  // Generate Tailwind classes
  const heroClasses = cn(
    'relative flex flex-col justify-center items-center overflow-hidden transition-all duration-300 ease-in-out',
    {
      'shadow-sm': finalShadow === 'sm',
      'shadow-md': finalShadow === 'md',
      'shadow-lg': finalShadow === 'lg',
      'shadow-xl': finalShadow === 'xl',
      'shadow-2xl': finalShadow === '2xl',
    },
    {
      'animate-fade-in': animation === 'fade-in',
      'animate-slide-up': animation === 'slide-up',
      'animate-slide-down': animation === 'slide-down',
    }
  )

  const contentClasses = cn('relative z-10 max-w-6xl w-full px-6', {
    'text-center': alignment === 'center',
    'text-left': alignment === 'left',
    'text-right': alignment === 'right',
  })

  const titleClasses = cn('font-bold leading-tight tracking-tight mb-4', {
    'text-2xl md:text-3xl lg:text-4xl': titleSize === 'small',
    'text-3xl md:text-4xl lg:text-5xl': titleSize === 'medium',
    'text-4xl md:text-5xl lg:text-6xl': titleSize === 'large',
    'text-5xl md:text-6xl lg:text-7xl': titleSize === 'xl',
  })

  const subtitleClasses = cn('opacity-90 leading-relaxed max-w-2xl mx-auto mb-8', {
    'text-base md:text-lg': subtitleSize === 'small',
    'text-lg md:text-xl': subtitleSize === 'medium',
    'text-xl md:text-2xl': subtitleSize === 'large',
  })

  const buttonClasses = (style: string) =>
    cn(
      'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base min-w-[120px] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg',
      {
        'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700':
          style === 'primary',
        'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800':
          style === 'secondary',
        'bg-transparent text-current border-2 border-current hover:bg-white/10 hover:border-white/80':
          style === 'outline',
        'bg-transparent text-current hover:bg-white/10': style === 'ghost',
      }
    )

  const buttonContainerClasses = cn('flex gap-4 justify-center flex-wrap', {
    'justify-start': alignment === 'left',
    'justify-end': alignment === 'right',
    'flex-col items-center md:flex-row': true, // Responsive button layout
  })

  return (
    <div
      className={heroClasses}
      style={{
        minHeight,
        padding,
        borderRadius,
        color: finalTextColor,
      }}
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Image */}
      {backgroundImage && backgroundImage.trim() && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={getBackgroundStyle()}
          aria-hidden="true"
        />
      )}

      {/* Background Color/Gradient */}
      {(!backgroundImage || !backgroundImage.trim()) && (
        <div className="absolute inset-0 z-0" style={getBackgroundStyle()} aria-hidden="true" />
      )}

      {/* Overlay */}
      {(backgroundImage || finalShowGradient) && finalBackgroundOverlay && (
        <div
          className="absolute inset-0 z-5"
          style={{ backgroundColor: finalBackgroundOverlay }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className={contentClasses}>
        <h1 className={titleClasses}>{safeTitle}</h1>

        {safeSubtitle && <p className={subtitleClasses}>{safeSubtitle}</p>}

        {(showButton || showSecondaryButton) && (
          <div className={buttonContainerClasses}>
            {showButton && safeButtonText && (
              <a
                href={buttonLink}
                className={buttonClasses(finalButtonStyle)}
                aria-label={`Primary action: ${safeButtonText}`}
              >
                {safeButtonText}
              </a>
            )}

            {showSecondaryButton && safeSecondaryButtonText && (
              <a
                href={secondaryButtonLink}
                className={buttonClasses(finalSecondaryButtonStyle)}
                aria-label={`Secondary action: ${safeSecondaryButtonText}`}
              >
                {safeSecondaryButtonText}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
