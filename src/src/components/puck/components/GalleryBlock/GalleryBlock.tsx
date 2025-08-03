'use client'

import { useState } from 'react'
import { GalleryBlockProps } from './GalleryBlockProps'
import { GalleryItem } from './GalleryItem'
import { Lightbox } from './Lightbox'
import type { GalleryItem as GalleryItemType } from './GalleryItemProps'

export const GalleryBlock = ({
  layout = 'grid',
  columns = 3,
  gap = '16px',
  padding = '16px',
  images = [],
  borderRadius = '8px',
  shadow = false,
  hoverEffect = 'zoom',
  lightbox = true,
  lightboxTheme = 'light',
  showCaptions = true,
  showThumbnails = false,
  mobileColumns = 1,
  tabletColumns = 2,
  lazyLoading = true,
  aspectRatio = 'auto',
  imageQuality = 'medium',
}: GalleryBlockProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = (item: GalleryItemType) => {
    if (lightbox) {
      const index = images.findIndex(img => img.id === item.id)
      setCurrentImageIndex(index >= 0 ? index : 0)
      setLightboxOpen(true)
    }
  }

  const handleLightboxClose = () => {
    setLightboxOpen(false)
  }

  const handleLightboxNavigate = (index: number) => {
    setCurrentImageIndex(index)
  }

  const getGridColumns = () => {
    const getMobileCols = () => {
      if (mobileColumns === 1) return 'grid-cols-1'
      if (mobileColumns === 2) return 'grid-cols-2'
      if (mobileColumns === 3) return 'grid-cols-3'
      return 'grid-cols-1'
    }
    
    const getTabletCols = () => {
      if (tabletColumns === 1) return 'md:grid-cols-1'
      if (tabletColumns === 2) return 'md:grid-cols-2'
      if (tabletColumns === 3) return 'md:grid-cols-3'
      if (tabletColumns === 4) return 'md:grid-cols-4'
      return 'md:grid-cols-2'
    }
    
    const getDesktopCols = () => {
      if (columns === 1) return 'lg:grid-cols-1'
      if (columns === 2) return 'lg:grid-cols-2'
      if (columns === 3) return 'lg:grid-cols-3'
      if (columns === 4) return 'lg:grid-cols-4'
      if (columns === 5) return 'lg:grid-cols-5'
      if (columns === 6) return 'lg:grid-cols-6'
      return 'lg:grid-cols-3'
    }
    
    return `${getMobileCols()} ${getTabletCols()} ${getDesktopCols()}`
  }

  const getGapClass = () => {
    const gapValue = parseInt(gap)
    if (gapValue <= 8) return 'gap-2'
    if (gapValue <= 12) return 'gap-3'
    if (gapValue <= 16) return 'gap-4'
    if (gapValue <= 20) return 'gap-5'
    if (gapValue <= 24) return 'gap-6'
    if (gapValue <= 32) return 'gap-8'
    return 'gap-4'
  }

  const getPaddingClass = () => {
    const paddingValue = parseInt(padding)
    if (paddingValue <= 8) return 'p-2'
    if (paddingValue <= 12) return 'p-3'
    if (paddingValue <= 16) return 'p-4'
    if (paddingValue <= 20) return 'p-5'
    if (paddingValue <= 24) return 'p-6'
    if (paddingValue <= 32) return 'p-8'
    return 'p-4'
  }

  const renderGridLayout = () => (
    <div className={`grid ${getGridColumns()} ${getGapClass()} ${getPaddingClass()}`}>
      {images.map((item) => (
        <GalleryItem
          key={item.id}
          item={item}
          onClick={handleImageClick}
          showCaption={showCaptions}
          aspectRatio={aspectRatio}
          hoverEffect={hoverEffect}
          borderRadius={borderRadius}
          shadow={shadow}
        />
      ))}
    </div>
  )

  const renderMasonryLayout = () => {
    const getColumnsClass = () => {
      if (mobileColumns === 1 && tabletColumns === 2 && columns === 3) return 'columns-1 md:columns-2 lg:columns-3'
      if (mobileColumns === 1 && tabletColumns === 2 && columns === 4) return 'columns-1 md:columns-2 lg:columns-4'
      if (mobileColumns === 1 && tabletColumns === 3 && columns === 4) return 'columns-1 md:columns-3 lg:columns-4'
      if (mobileColumns === 2 && tabletColumns === 3 && columns === 4) return 'columns-2 md:columns-3 lg:columns-4'
      return 'columns-1 md:columns-2 lg:columns-3' // default
    }

    return (
      <div className={`${getColumnsClass()} ${getGapClass()} ${getPaddingClass()}`}>
        {images.map((item) => (
          <div key={item.id} className="break-inside-avoid mb-4">
            <GalleryItem
              item={item}
              onClick={handleImageClick}
              showCaption={showCaptions}
              aspectRatio={aspectRatio}
              hoverEffect={hoverEffect}
              borderRadius={borderRadius}
              shadow={shadow}
            />
          </div>
        ))}
      </div>
    )
  }

  const renderCarouselLayout = () => (
    <div className={`${getPaddingClass()} overflow-hidden`}>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {images.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-80">
            <GalleryItem
              item={item}
              onClick={handleImageClick}
              showCaption={showCaptions}
              aspectRatio={aspectRatio}
              hoverEffect={hoverEffect}
              borderRadius={borderRadius}
              shadow={shadow}
            />
          </div>
        ))}
      </div>
    </div>
  )

  const renderSlideshowLayout = () => (
    <div className={`${getPaddingClass()} relative`}>
      {images.length > 0 && (
        <div className="relative">
          <GalleryItem
            item={images[currentImageIndex]}
            onClick={handleImageClick}
            showCaption={showCaptions}
            aspectRatio={aspectRatio}
            hoverEffect={hoverEffect}
            borderRadius={borderRadius}
            shadow={shadow}
          />
          
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderListLayout = () => (
    <div className={`space-y-4 ${getPaddingClass()}`}>
      {images.map((item) => (
        <div key={item.id} className="flex space-x-4">
          <div className="w-32 flex-shrink-0">
            <GalleryItem
              item={item}
              onClick={handleImageClick}
              showCaption={false}
              aspectRatio="square"
              hoverEffect={hoverEffect}
              borderRadius={borderRadius}
              shadow={shadow}
            />
          </div>
          {showCaptions && item.caption && (
            <div className="flex-1 flex items-center">
              <p className="text-gray-700">{item.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderLayout = () => {
    switch (layout) {
      case 'masonry':
        return renderMasonryLayout()
      case 'carousel':
        return renderCarouselLayout()
      case 'slideshow':
        return renderSlideshowLayout()
      case 'list':
        return renderListLayout()
      default:
        return renderGridLayout()
    }
  }

  if (!images || images.length === 0) {
    return (
      <div className={`${getPaddingClass()} text-center text-gray-500`}>
        <p>No images to display</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {renderLayout()}
      
      {lightbox && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={handleLightboxClose}
          images={images}
          currentIndex={currentImageIndex}
          onNavigate={handleLightboxNavigate}
          theme={lightboxTheme}
        />
      )}
    </div>
  )
} 