# GalleryBlock Component

A comprehensive image gallery component for Puck CMS that supports multiple layouts, lightbox functionality, and responsive design.

## Features

### 🎨 Multiple Layouts
- **Grid**: Responsive grid layout with customizable columns
- **Masonry**: Pinterest-style masonry layout
- **Carousel**: Horizontal scrolling carousel
- **Slideshow**: Full-screen slideshow with navigation
- **List**: Vertical list layout with thumbnails

### 🖼️ Image Management
- Multiple image support with URLs
- Image captions and alt text
- Custom image dimensions
- Lazy loading support
- Loading skeletons

### 🎯 Interactive Features
- **Lightbox**: Full-screen image viewing
- **Hover Effects**: Zoom, overlay, or none
- **Keyboard Navigation**: Arrow keys and Escape
- **Touch Support**: Swipe gestures for mobile
- **Thumbnail Navigation**: In lightbox mode

### 🎨 Styling Options
- Custom border radius
- Shadow effects
- Responsive breakpoints
- Custom spacing and padding
- Aspect ratio controls

## Usage

### Basic Usage

```tsx
import { GalleryBlock } from './components/puck/components/GalleryBlock'

const images = [
  {
    id: '1',
    src: 'https://example.com/image1.jpg',
    alt: 'Image description',
    caption: 'Optional caption',
    width: 800,
    height: 600,
  },
  // ... more images
]

<GalleryBlock
  layout="grid"
  columns={3}
  images={images}
  lightbox={true}
  showCaptions={true}
/>
```

### All Props

```tsx
interface GalleryBlockProps {
  // Layout
  layout: 'grid' | 'masonry' | 'carousel' | 'slideshow' | 'list'
  columns: number
  gap: string
  padding: string
  
  // Images
  images: GalleryItem[]
  
  // Styling
  borderRadius: string
  shadow: boolean
  hoverEffect: 'zoom' | 'overlay' | 'none'
  
  // Interactive
  lightbox: boolean
  lightboxTheme: 'light' | 'dark'
  showCaptions: boolean
  showThumbnails: boolean
  
  // Responsive
  mobileColumns: number
  tabletColumns: number
  
  // Advanced
  lazyLoading: boolean
  aspectRatio: 'auto' | 'square' | '16:9' | '4:3' | '3:2'
  imageQuality: 'low' | 'medium' | 'high'
}
```

## Layout Examples

### Grid Layout
```tsx
<GalleryBlock
  layout="grid"
  columns={3}
  mobileColumns={1}
  tabletColumns={2}
  gap="16px"
  hoverEffect="zoom"
/>
```

### Masonry Layout
```tsx
<GalleryBlock
  layout="masonry"
  columns={4}
  tabletColumns={3}
  mobileColumns={1}
  aspectRatio="auto"
/>
```

### Carousel Layout
```tsx
<GalleryBlock
  layout="carousel"
  columns={1}
  gap="16px"
  showCaptions={true}
/>
```

### Slideshow Layout
```tsx
<GalleryBlock
  layout="slideshow"
  columns={1}
  aspectRatio="16:9"
  lightbox={false}
/>
```

### List Layout
```tsx
<GalleryBlock
  layout="list"
  columns={1}
  aspectRatio="square"
  showCaptions={true}
/>
```

## Puck CMS Integration

The GalleryBlock is fully integrated with Puck CMS and can be used in the visual editor:

1. **Add to Canvas**: Drag the Gallery block from the Media category
2. **Configure Images**: Add image URLs, alt text, and captions
3. **Customize Layout**: Choose layout type and adjust columns
4. **Style Options**: Configure borders, shadows, and hover effects
5. **Lightbox Settings**: Enable/disable lightbox and choose theme

## File Structure

```
GalleryBlock/
├── GalleryBlock.tsx          # Main component
├── GalleryBlockProps.ts      # TypeScript interfaces
├── GalleryBlockDefaults.ts   # Default values
├── GalleryBlockFields.ts     # Puck field definitions
├── config.ts                 # Puck configuration
├── GalleryItem.tsx           # Individual gallery item
├── GalleryItemProps.ts       # Gallery item interfaces
├── Lightbox.tsx              # Lightbox component
├── LightboxProps.ts          # Lightbox interfaces
├── GalleryBlockDemo.tsx      # Demo component
├── index.ts                  # Export file
└── README.md                 # This documentation
```

## Components

### GalleryBlock
The main component that handles layout selection and rendering.

### GalleryItem
Individual image component with hover effects and interactions.

### Lightbox
Full-screen image viewer with navigation and keyboard controls.

## Styling

The component uses Tailwind CSS classes and supports:
- Responsive design with mobile-first approach
- Custom CSS variables for theming
- Smooth transitions and animations
- Loading states and error handling

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management for lightbox
- Alt text for all images

## Performance

- Lazy loading for images
- Optimized bundle size
- Efficient re-rendering
- Memory management for lightbox

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch device support
- Keyboard navigation

## Customization

### Custom Hover Effects
You can extend the hover effects by modifying the `getHoverEffectClass` function in `GalleryItem.tsx`.

### Custom Layouts
Add new layouts by extending the `renderLayout` function in `GalleryBlock.tsx`.

### Custom Lightbox
Replace the Lightbox component with your own implementation while maintaining the same props interface.

## Troubleshooting

### Images Not Loading
- Check image URLs are accessible
- Verify CORS settings for external images
- Ensure proper image dimensions

### Layout Issues
- Check responsive breakpoints
- Verify column settings
- Test on different screen sizes

### Lightbox Not Working
- Ensure lightbox prop is enabled
- Check for JavaScript errors
- Verify keyboard event handling

## Contributing

1. Follow the existing code structure
2. Add TypeScript types for new features
3. Include proper documentation
4. Test on multiple devices and browsers
5. Update this README for new features 