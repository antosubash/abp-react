'use client'

import { GalleryBlock } from './GalleryBlock'
import type { GalleryBlockProps } from './GalleryBlockProps'

const demoImages = [
  {
    id: '1',
    src: 'https://picsum.photos/800/600?random=1',
    alt: 'Beautiful landscape with mountains',
    caption: 'Mountain landscape at sunset',
    width: 800,
    height: 600,
  },
  {
    id: '2',
    src: 'https://picsum.photos/800/600?random=2',
    alt: 'City skyline at night',
    caption: 'Urban cityscape with lights',
    width: 800,
    height: 600,
  },
  {
    id: '3',
    src: 'https://picsum.photos/800/600?random=3',
    alt: 'Ocean waves crashing',
    caption: 'Powerful ocean waves',
    width: 800,
    height: 600,
  },
  {
    id: '4',
    src: 'https://picsum.photos/800/600?random=4',
    alt: 'Forest path in autumn',
    caption: 'Peaceful forest trail',
    width: 800,
    height: 600,
  },
  {
    id: '5',
    src: 'https://picsum.photos/800/600?random=5',
    alt: 'Desert sand dunes',
    caption: 'Golden desert landscape',
    width: 800,
    height: 600,
  },
  {
    id: '6',
    src: 'https://picsum.photos/800/600?random=6',
    alt: 'Snowy mountain peaks',
    caption: 'Alpine winter scene',
    width: 800,
    height: 600,
  },
]

export const GalleryBlockDemo = () => {
  const gridProps: GalleryBlockProps = {
    layout: 'grid',
    columns: 3,
    gap: '16px',
    padding: '16px',
    images: demoImages,
    borderRadius: '8px',
    shadow: true,
    hoverEffect: 'zoom',
    lightbox: true,
    lightboxTheme: 'light',
    showCaptions: true,
    showThumbnails: false,
    mobileColumns: 1,
    tabletColumns: 2,
    lazyLoading: true,
    aspectRatio: 'auto',
    imageQuality: 'medium',
  }

  const masonryProps: GalleryBlockProps = {
    ...gridProps,
    layout: 'masonry',
    columns: 4,
    tabletColumns: 3,
  }

  const carouselProps: GalleryBlockProps = {
    ...gridProps,
    layout: 'carousel',
    columns: 1,
    tabletColumns: 1,
  }

  const slideshowProps: GalleryBlockProps = {
    ...gridProps,
    layout: 'slideshow',
    columns: 1,
    tabletColumns: 1,
  }

  const listProps: GalleryBlockProps = {
    ...gridProps,
    layout: 'list',
    columns: 1,
    tabletColumns: 1,
  }

  return (
    <div className="space-y-12 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">GalleryBlock Demo</h1>
        <p className="text-gray-600">Showcasing different gallery layouts and features</p>
      </div>

      {/* Grid Layout */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Grid Layout</h2>
        <GalleryBlock {...gridProps} />
      </div>

      {/* Masonry Layout */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Masonry Layout</h2>
        <GalleryBlock {...masonryProps} />
      </div>

      {/* Carousel Layout */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Carousel Layout</h2>
        <GalleryBlock {...carouselProps} />
      </div>

      {/* Slideshow Layout */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Slideshow Layout</h2>
        <GalleryBlock {...slideshowProps} />
      </div>

      {/* List Layout */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">List Layout</h2>
        <GalleryBlock {...listProps} />
      </div>
    </div>
  )
}
