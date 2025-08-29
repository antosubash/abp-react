export const GalleryBlockDefaults = {
  layout: 'grid' as const,
  columns: 3 as const,
  gap: '16px' as const,
  padding: '16px' as const,

  images: [
    {
      id: '1',
      src: 'https://picsum.photos/800/600?random=1',
      alt: 'Sample Image 1',
      caption: 'Beautiful landscape',
      width: 800,
      height: 600,
    },
    {
      id: '2',
      src: 'https://picsum.photos/800/600?random=2',
      alt: 'Sample Image 2',
      caption: 'City skyline',
      width: 800,
      height: 600,
    },
    {
      id: '3',
      src: 'https://picsum.photos/800/600?random=3',
      alt: 'Sample Image 3',
      caption: 'Nature photography',
      width: 800,
      height: 600,
    },
  ],

  borderRadius: '8px' as const,
  shadow: true as const,
  hoverEffect: 'zoom' as const,

  lightbox: true as const,
  lightboxTheme: 'light' as const,
  showCaptions: true as const,
  showThumbnails: false as const,

  mobileColumns: 1 as const,
  tabletColumns: 2 as const,

  lazyLoading: true as const,
  aspectRatio: 'auto' as const,
  imageQuality: 'medium' as const,
}
