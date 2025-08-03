# CarouselBlock Component

A comprehensive, responsive carousel component for Puck CMS that supports images, text content, and interactive elements with full customization options.

## Features

- **🎠 Multiple Content Types**: Images, text, buttons, and mixed content
- **📱 Responsive Design**: Mobile-first approach with breakpoint-specific settings
- **🎯 Auto-play**: Configurable auto-play with pause on hover
- **🎮 Navigation**: Previous/Next arrows and dots indicator
- **♻️ Loop Support**: Seamless infinite scrolling
- **🎨 Customizable**: Colors, spacing, typography, and layout options
- **♿ Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **⚡ Performance**: Optimized with Next.js Image component and lazy loading

## Usage

### Basic Usage

```tsx
import { CarouselBlock } from '@/components/puck/components/CarouselBlock'

const MyCarousel = () => {
  const carouselProps = {
    slides: [
      {
        id: '1',
        imageUrl: 'https://example.com/image1.jpg',
        title: 'Welcome',
        description: 'This is a sample slide',
        buttonText: 'Learn More',
        buttonUrl: '#',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        textAlignment: 'center',
        overlayOpacity: 0.3,
      },
      // ... more slides
    ],
    autoPlay: true,
    autoPlayInterval: 5000,
    showArrows: true,
    showDots: true,
  }

  return <CarouselBlock {...carouselProps} />
}
```

### Advanced Configuration

```tsx
const advancedCarouselProps = {
  slides: [
    {
      id: '1',
      imageUrl: 'https://example.com/hero.jpg',
      title: 'Transform Your Business',
      description: 'Leverage cutting-edge technology',
      buttonText: 'Get Started',
      buttonUrl: '/signup',
      backgroundColor: '#1e40af',
      textColor: '#ffffff',
      textAlignment: 'center',
      overlayOpacity: 0.6,
    },
  ],
  autoPlay: true,
  autoPlayInterval: 7000,
  showArrows: true,
  showDots: true,
  loop: true,
  pauseOnHover: true,
  height: '600px',
  borderRadius: '12px',
  shadow: true,
  responsive: {
    mobile: {
      height: '400px',
      showArrows: false,
      showDots: true,
    },
    tablet: {
      height: '500px',
      showArrows: true,
      showDots: true,
    },
    desktop: {
      height: '600px',
      showArrows: true,
      showDots: true,
    },
  },
}
```

## Props

### CarouselBlockProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `CarouselSlide[]` | `[]` | Array of carousel slides |
| `autoPlay` | `boolean` | `true` | Enable auto-play functionality |
| `autoPlayInterval` | `number` | `5000` | Auto-play interval in milliseconds |
| `showArrows` | `boolean` | `true` | Show navigation arrows |
| `showDots` | `boolean` | `true` | Show dots indicator |
| `loop` | `boolean` | `true` | Enable infinite loop |
| `pauseOnHover` | `boolean` | `true` | Pause auto-play on hover |
| `height` | `string` | `'400px'` | Carousel height |
| `width` | `string` | `'100%'` | Carousel width |
| `maxWidth` | `string` | `'100%'` | Maximum width |
| `padding` | `string` | `'0'` | Container padding |
| `borderRadius` | `string` | `'8px'` | Border radius |
| `shadow` | `boolean` | `false` | Enable shadow effect |
| `arrowColor` | `string` | `'#ffffff'` | Arrow color |
| `arrowBackgroundColor` | `string` | `'rgba(0, 0, 0, 0.5)'` | Arrow background |
| `dotColor` | `string` | `'rgba(255, 255, 255, 0.5)'` | Dot color |
| `dotActiveColor` | `string` | `'#ffffff'` | Active dot color |
| `responsive` | `ResponsiveSettings` | `{}` | Responsive breakpoint settings |

### CarouselSlide

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique slide identifier |
| `imageUrl` | `string` | ❌ | Background image URL |
| `title` | `string` | ❌ | Slide title |
| `description` | `string` | ❌ | Slide description |
| `buttonText` | `string` | ❌ | Call-to-action button text |
| `buttonUrl` | `string` | ❌ | Button link URL |
| `backgroundColor` | `string` | ❌ | Background color (hex) |
| `textColor` | `string` | ❌ | Text color (hex) |
| `textAlignment` | `'left' \| 'center' \| 'right'` | ❌ | Text alignment |
| `overlayOpacity` | `number` | ❌ | Image overlay opacity (0-1) |

### ResponsiveSettings

| Prop | Type | Description |
|------|------|-------------|
| `mobile` | `BreakpointSettings` | Mobile breakpoint settings (< 768px) |
| `tablet` | `BreakpointSettings` | Tablet breakpoint settings (768px - 1024px) |
| `desktop` | `BreakpointSettings` | Desktop breakpoint settings (> 1024px) |

### BreakpointSettings

| Prop | Type | Description |
|------|------|-------------|
| `height` | `string` | Height for this breakpoint |
| `showArrows` | `boolean` | Show arrows for this breakpoint |
| `showDots` | `boolean` | Show dots for this breakpoint |

## Examples

### Hero Carousel

```tsx
const heroCarousel = {
  slides: [
    {
      id: '1',
      imageUrl: '/hero-1.jpg',
      title: 'Welcome to Our Platform',
      description: 'Discover amazing features and possibilities.',
      buttonText: 'Get Started',
      buttonUrl: '/signup',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      textAlignment: 'center',
      overlayOpacity: 0.4,
    },
  ],
  height: '600px',
  autoPlay: true,
  autoPlayInterval: 7000,
  responsive: {
    mobile: { height: '400px', showArrows: false },
    tablet: { height: '500px' },
    desktop: { height: '600px' },
  },
}
```

### Minimal Carousel

```tsx
const minimalCarousel = {
  slides: [
    {
      id: '1',
      imageUrl: '/slide-1.jpg',
      title: 'Minimal Design',
      description: 'Clean and simple.',
      backgroundColor: '#f3f4f6',
      textColor: '#1f2937',
      textAlignment: 'center',
      overlayOpacity: 0.1,
    },
  ],
  autoPlay: false,
  showArrows: true,
  showDots: true,
  loop: false,
  height: '350px',
  borderRadius: '12px',
  shadow: true,
}
```

## Accessibility

The CarouselBlock component includes comprehensive accessibility features:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Arrow keys for navigation
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Descriptive text and announcements
- **Semantic HTML**: Proper heading hierarchy and structure

## Performance

- **Next.js Image Optimization**: Automatic image optimization
- **Lazy Loading**: Images load as needed
- **Efficient Rendering**: Optimized re-renders with React hooks
- **Memory Management**: Proper cleanup of event listeners and intervals

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

- `embla-carousel-react`: Carousel functionality
- `next/image`: Image optimization
- `lucide-react`: Icons
- `@/components/ui/carousel`: Base carousel components
- `@/components/ui/button`: Button component

## Contributing

When contributing to the CarouselBlock component:

1. Follow the existing code style and patterns
2. Add comprehensive TypeScript types
3. Include accessibility considerations
4. Test across different screen sizes
5. Update documentation for new features 