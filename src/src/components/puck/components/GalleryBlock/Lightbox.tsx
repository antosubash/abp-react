'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { LightboxProps } from './LightboxProps'

export const Lightbox = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  theme = 'light',
}: LightboxProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const currentImage = images[currentIndex]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          e.preventDefault()
          onNavigate(Math.max(0, currentIndex - 1))
          break
        case 'ArrowRight':
          e.preventDefault()
          onNavigate(Math.min(images.length - 1, currentIndex + 1))
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  if (!isOpen || !currentImage) return null

  const themeClasses = theme === 'dark' 
    ? 'bg-black/95 text-white' 
    : 'bg-white/95 text-gray-900'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Lightbox content */}
      <div className={`relative z-10 w-full h-full flex flex-col ${themeClasses}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/20">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">
              {currentIndex + 1} of {images.length}
            </span>
            {currentImage.caption && (
              <span className="text-sm opacity-80">{currentImage.caption}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200/20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image container */}
        <div className="flex-1 flex items-center justify-center p-4 relative">
          <div className="relative max-w-full max-h-full">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={currentImage.width || 1200}
              height={currentImage.height || 800}
              className={`
                max-w-full max-h-full object-contain
                ${isLoaded ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-300
              `}
              onLoad={() => setIsLoaded(true)}
              priority
            />
            
            {/* Loading indicator */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600" />
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          {currentIndex > 0 && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="p-4 border-t border-gray-200/20">
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => onNavigate(index)}
                  className={`
                    flex-shrink-0 w-16 h-16 rounded overflow-hidden
                    ${index === currentIndex 
                      ? 'ring-2 ring-blue-500' 
                      : 'opacity-60 hover:opacity-100'
                    }
                    transition-all duration-200
                  `}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 