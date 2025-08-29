'use client'
import Image from 'next/image'
import type { CardBlockProps } from './CardBlockProps'

export const CardBlock = ({
  title,
  description,
  content,
  image,
  buttonText,
  buttonLink,
  variant = 'default',
  alignment = 'left',
  backgroundColor = '#ffffff',
  borderColor = '#e5e7eb',
  padding = '24px',
  borderRadius = '8px',
}: CardBlockProps) => {
  // Ensure text props are always strings
  const safeTitle =
    typeof title === 'string'
      ? title
      : typeof title === 'object' && title !== null
        ? JSON.stringify(title)
        : 'Card Title'
  const safeDescription =
    typeof description === 'string'
      ? description
      : typeof description === 'object' && description !== null
        ? JSON.stringify(description)
        : 'Card description'
  const safeContent =
    typeof content === 'string'
      ? content
      : typeof content === 'object' && content !== null
        ? JSON.stringify(content)
        : ''
  const safeButtonText =
    typeof buttonText === 'string'
      ? buttonText
      : typeof buttonText === 'object' && buttonText !== null
        ? JSON.stringify(buttonText)
        : ''

  // Convert alignment to Tailwind classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  // Enhanced variant classes with more sophisticated styling
  const variantClasses = {
    default: `
      bg-gradient-to-br from-white to-gray-50 
      shadow-lg hover:shadow-2xl 
      border border-gray-100
      backdrop-blur-sm
      transition-all duration-500 ease-out
      hover:border-blue-200
    `,
    outline: `
      bg-white/80 backdrop-blur-md
      border-2 border-gray-200 
      hover:border-blue-300
      shadow-md hover:shadow-xl
      transition-all duration-500 ease-out
    `,
  }

  // Convert padding to Tailwind classes (approximate mapping)
  const getPaddingClass = (padding: string) => {
    const paddingValue = Number.parseInt(padding)
    if (paddingValue <= 12) return 'p-4'
    if (paddingValue <= 16) return 'p-5'
    if (paddingValue <= 20) return 'p-6'
    if (paddingValue <= 24) return 'p-7'
    if (paddingValue <= 32) return 'p-8'
    return 'p-7' // default
  }

  // Convert border radius to Tailwind classes (approximate mapping)
  const getBorderRadiusClass = (radius: string) => {
    const radiusValue = Number.parseInt(radius)
    if (radiusValue <= 4) return 'rounded-lg'
    if (radiusValue <= 6) return 'rounded-xl'
    if (radiusValue <= 8) return 'rounded-2xl'
    if (radiusValue <= 12) return 'rounded-3xl'
    if (radiusValue <= 16) return 'rounded-3xl'
    return 'rounded-2xl' // default
  }

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${alignmentClasses[alignment]}
        ${getPaddingClass(padding)}
        ${getBorderRadiusClass(borderRadius)}
        m-4
        overflow-hidden
        group
        cursor-pointer
        transform hover:scale-[1.03] transition-all duration-500 ease-out
        relative
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/0 before:to-purple-500/0 
        before:opacity-0 before:transition-opacity before:duration-500 before:ease-out
        hover:before:opacity-100
      `}
      style={{
        backgroundColor: variant === 'default' ? backgroundColor : 'transparent',
        borderColor: variant === 'outline' ? borderColor : undefined,
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20" />
      </div>

      {image && (
        <div className="relative mb-6 overflow-hidden rounded-xl group-hover:rounded-2xl transition-all duration-500">
          <Image
            src={image}
            alt={safeTitle}
            width={400}
            height={200}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-xl group-hover:rounded-2xl border-2 border-transparent group-hover:border-blue-300/30 transition-all duration-500" />
        </div>
      )}

      <div className="relative space-y-4">
        {/* Title with enhanced styling */}
        <div className="relative">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
            {safeTitle}
          </h3>
          {/* Underline effect */}
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500 ease-out" />
        </div>

        {/* Description with improved typography */}
        <p className="text-gray-600 leading-relaxed text-base font-medium">{safeDescription}</p>

        {/* Content with enhanced styling */}
        {safeContent && (
          <div className="relative">
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50/50 p-4 rounded-lg border-l-4 border-blue-200 group-hover:border-blue-400 transition-all duration-300">
              {safeContent}
            </p>
          </div>
        )}

        {/* Enhanced button */}
        {safeButtonText && (
          <div
            className={`pt-4 ${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'}`}
          >
            <a
              href={buttonLink || '#'}
              className="
                inline-flex
                items-center
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                bg-gradient-to-r from-blue-600 to-purple-600
                hover:from-blue-700 hover:to-purple-700
                rounded-xl
                shadow-lg
                hover:shadow-xl
                focus:outline-none
                focus:ring-4
                focus:ring-blue-500/30
                transition-all
                duration-300
                transform
                hover:scale-105
                hover:-translate-y-1
                relative
                overflow-hidden
                group/btn
              "
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />

              <span className="relative z-10">{safeButtonText}</span>

              {/* Enhanced arrow icon */}
              <svg
                className="relative z-10 ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
