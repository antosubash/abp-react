'use client'

import Image from 'next/image'
import { useState } from 'react'
import { GalleryItemProps } from './GalleryItemProps'

export const GalleryItem = ({
  item,
  onClick,
  showCaption = true,
  aspectRatio = 'auto',
  hoverEffect = 'zoom',
  borderRadius = '8px',
  shadow = false,
}: GalleryItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square'
      case '16:9':
        return 'aspect-video'
      case '4:3':
        return 'aspect-[4/3]'
      case '3:2':
        return 'aspect-[3/2]'
      default:
        return ''
    }
  }

  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case 'zoom':
        return 'hover:scale-105 transition-transform duration-300'
      case 'overlay':
        return 'group'
      default:
        return ''
    }
  }

  const handleClick = () => {
    if (onClick) {
      onClick(item)
    }
  }

  return (
    <div
      className={`
        relative overflow-hidden cursor-pointer
        ${getAspectRatioClass()}
        ${getHoverEffectClass()}
        ${shadow ? 'shadow-lg hover:shadow-xl' : ''}
        transition-all duration-300 ease-out
      `}
      style={{
        borderRadius,
      }}
      onClick={handleClick}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width || 800}
        height={item.height || 600}
        className={`
          w-full h-full object-cover
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-300
        `}
        onLoad={() => setIsLoaded(true)}
        priority={false}
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Overlay effect */}
      {hoverEffect === 'overlay' && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
            <svg
              className="w-8 h-8 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
            <span className="text-sm font-medium">View</span>
          </div>
        </div>
      )}

      {/* Caption */}
      {showCaption && item.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm font-medium">{item.caption}</p>
        </div>
      )}
    </div>
  )
} 