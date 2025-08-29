export const GalleryBlockFields = {
  layout: {
    type: 'select' as const,
    label: 'Layout',
    options: [
      { label: 'Grid', value: 'grid' },
      { label: 'Masonry', value: 'masonry' },
      { label: 'Carousel', value: 'carousel' },
      { label: 'Slideshow', value: 'slideshow' },
      { label: 'List', value: 'list' },
    ],
  },
  columns: {
    type: 'number' as const,
    label: 'Columns (Desktop)',
    min: 1,
    max: 6,
  },
  gap: {
    type: 'text' as const,
    label: 'Gap (CSS value)',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
  images: {
    type: 'array' as const,
    label: 'Images',
    arrayFields: {
      id: { type: 'text' as const, label: 'ID' },
      src: { type: 'text' as const, label: 'Image URL' },
      alt: { type: 'text' as const, label: 'Alt Text' },
      caption: { type: 'text' as const, label: 'Caption' },
      width: { type: 'number' as const, label: 'Width' },
      height: { type: 'number' as const, label: 'Height' },
    },
  },
  borderRadius: {
    type: 'text' as const,
    label: 'Border Radius (CSS value)',
  },
  shadow: {
    type: 'select' as const,
    label: 'Shadow',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  hoverEffect: {
    type: 'select' as const,
    label: 'Hover Effect',
    options: [
      { label: 'Zoom', value: 'zoom' },
      { label: 'Overlay', value: 'overlay' },
      { label: 'None', value: 'none' },
    ],
  },
  lightbox: {
    type: 'select' as const,
    label: 'Lightbox',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  lightboxTheme: {
    type: 'select' as const,
    label: 'Lightbox Theme',
    options: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
  },
  showCaptions: {
    type: 'select' as const,
    label: 'Show Captions',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  showThumbnails: {
    type: 'select' as const,
    label: 'Show Thumbnails',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  mobileColumns: {
    type: 'number' as const,
    label: 'Mobile Columns',
    min: 1,
    max: 3,
  },
  tabletColumns: {
    type: 'number' as const,
    label: 'Tablet Columns',
    min: 1,
    max: 4,
  },
  lazyLoading: {
    type: 'select' as const,
    label: 'Lazy Loading',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  aspectRatio: {
    type: 'select' as const,
    label: 'Aspect Ratio',
    options: [
      { label: 'Auto', value: 'auto' },
      { label: 'Square', value: 'square' },
      { label: '16:9', value: '16:9' },
      { label: '4:3', value: '4:3' },
      { label: '3:2', value: '3:2' },
    ],
  },
  imageQuality: {
    type: 'select' as const,
    label: 'Image Quality',
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
    ],
  },
}
