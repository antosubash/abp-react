'use client'

import type { ButtonBlockProps } from './ButtonBlockProps'

export const ButtonBlock = ({
  text = 'Click me',
  variant = 'primary',
  size = 'medium',
  alignment = 'left',
  fullWidth = false,
  disabled = false,
  href,
  target = '_self',
  padding = '16px',
}: ButtonBlockProps) => {
  // Ensure text is always a string
  const safeText =
    typeof text === 'string'
      ? text
      : typeof text === 'object' && text !== null
        ? JSON.stringify(text)
        : 'Click me'
  const variantStyles = {
    primary: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      border: 'none',
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: '#ffffff',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      border: '2px solid #3b82f6',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      border: 'none',
    },
  }

  const sizeStyles = {
    small: {
      padding: '8px 16px',
      fontSize: '14px',
    },
    medium: {
      padding: '12px 24px',
      fontSize: '16px',
    },
    large: {
      padding: '16px 32px',
      fontSize: '18px',
    },
  }

  const buttonStyle = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center' as const,
    fontWeight: '500',
    transition: 'all 0.2s ease',
  }

  const containerStyle = {
    textAlign: alignment,
    padding,
  }

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault()
      return
    }
  }

  const ButtonContent = () => (
    <button
      style={buttonStyle}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.8'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '1'
        }
      }}
    >
      {safeText}
    </button>
  )

  if (href) {
    return (
      <div style={containerStyle}>
        <a href={href} target={target} style={{ textDecoration: 'none' }}>
          <ButtonContent />
        </a>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <ButtonContent />
    </div>
  )
}
