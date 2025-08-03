# Enhanced Hero Component

A modern, responsive, and highly customizable Hero component for Puck CMS with advanced features and beautiful animations. Built with Tailwind CSS for optimal performance and maintainability.

## Features

### 🎨 **Visual Design**
- **Background Options**: Solid colors, gradients, or background images
- **Overlay Support**: Customizable overlays for background images
- **Shadow Effects**: Multiple shadow levels (sm, md, lg, xl)
- **Border Radius**: Customizable border radius
- **Typography**: Multiple title and subtitle sizes

### 🎯 **Content Customization**
- **Text Alignment**: Left, center, or right alignment
- **Title & Subtitle**: Customizable text content and sizes
- **Multiple Buttons**: Primary and secondary button support
- **Button Styles**: Primary, secondary, outline, and ghost styles

### 🎬 **Animations**
- **Fade In**: Smooth fade-in animation
- **Slide Up**: Content slides up from bottom
- **Slide Down**: Content slides down from top
- **None**: No animation

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Flexible Layout**: Adapts to different content lengths
- **Touch-Friendly**: Optimized for mobile interactions

### ♿ **Accessibility**
- **ARIA Labels**: Proper accessibility attributes
- **Semantic HTML**: Uses appropriate HTML elements
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper heading structure

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Welcome to Our Site'` | Main heading text |
| `subtitle` | `string` | `'Discover amazing content...'` | Subtitle text |
| `backgroundColor` | `string` | `'#1f2937'` | Background color (hex or CSS) |
| `backgroundImage` | `string` | `''` | Background image URL |
| `backgroundOverlay` | `string` | `'rgba(0, 0, 0, 0.4)'` | Overlay color for background |
| `textColor` | `string` | `'#ffffff'` | Text color |
| `showButton` | `boolean` | `true` | Show primary button |
| `buttonText` | `string` | `'Get Started'` | Primary button text |
| `buttonLink` | `string` | `'#'` | Primary button link |
| `buttonStyle` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Primary button style |
| `showSecondaryButton` | `boolean` | `false` | Show secondary button |
| `secondaryButtonText` | `string` | `'Learn More'` | Secondary button text |
| `secondaryButtonLink` | `string` | `'#'` | Secondary button link |
| `secondaryButtonStyle` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'outline'` | Secondary button style |
| `alignment` | `'left' \| 'center' \| 'right'` | `'center'` | Content alignment |
| `minHeight` | `string` | `'500px'` | Minimum height |
| `padding` | `string` | `'80px 24px'` | Padding |
| `titleSize` | `'small' \| 'medium' \| 'large' \| 'xl'` | `'large'` | Title font size |
| `subtitleSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Subtitle font size |
| `showGradient` | `boolean` | `false` | Enable gradient background |
| `gradientDirection` | `string` | `'to-r'` | Gradient direction |
| `gradientColors` | `string` | `'#667eea, #764ba2'` | Gradient colors (comma-separated) |
| `animation` | `'none' \| 'fade-in' \| 'slide-up' \| 'slide-down'` | `'fade-in'` | Animation type |
| `borderRadius` | `string` | `'0px'` | Border radius |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Shadow level |

## Usage Examples

### Basic Hero
```tsx
<Hero
  title="Welcome to Our Platform"
  subtitle="Discover amazing features"
  backgroundColor="#1f2937"
  textColor="#ffffff"
  showButton={true}
  buttonText="Get Started"
  buttonLink="/signup"
/>
```

### Gradient Hero with Two Buttons
```tsx
<Hero
  title="Modern Design"
  subtitle="Beautiful gradient backgrounds"
  showGradient={true}
  gradientDirection="to-r"
  gradientColors="#667eea, #764ba2"
  showButton={true}
  buttonText="Get Started"
  showSecondaryButton={true}
  secondaryButtonText="Learn More"
  secondaryButtonStyle="outline"
  animation="slide-up"
/>
```

### Background Image Hero
```tsx
<Hero
  title="Hero with Background"
  subtitle="Stunning visual impact"
  backgroundImage="https://example.com/image.jpg"
  backgroundOverlay="rgba(0, 0, 0, 0.5)"
  showButton={true}
  buttonText="View Gallery"
  titleSize="xl"
  animation="fade-in"
  borderRadius="16px"
/>
```

### Left-Aligned Hero
```tsx
<Hero
  title="Personal Touch"
  subtitle="More intimate feel"
  backgroundColor="#2d3748"
  alignment="left"
  padding="100px 48px"
  buttonStyle="primary"
  animation="slide-down"
/>
```

## Button Styles

### Primary
- Solid background with hover effects
- Best for main call-to-action

### Secondary
- Alternative solid style
- Good for secondary actions

### Outline
- Transparent with border
- Subtle but visible

### Ghost
- Minimal styling
- Clean and modern

## Responsive Behavior

- **Desktop**: Full-size typography and horizontal button layout
- **Tablet**: Slightly reduced typography, buttons remain horizontal
- **Mobile**: Significantly reduced typography, buttons stack vertically

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- CSS-only animations for smooth performance
- Optimized Tailwind CSS with minimal reflows
- Efficient class generation with `clsx` and `tailwind-merge`
- Lazy loading support for background images
- Utility-first CSS approach for better performance

## Tailwind CSS Integration

This component is built entirely with Tailwind CSS utilities, providing:

- **Consistent Design System**: Uses Tailwind's design tokens for colors, spacing, and typography
- **Responsive Design**: Built-in responsive utilities for all screen sizes
- **Performance**: Only includes the CSS classes that are actually used
- **Maintainability**: Easy to customize using Tailwind's utility classes
- **Dark Mode Support**: Compatible with Tailwind's dark mode utilities

## Accessibility Features

- Proper heading hierarchy (h1 for title)
- ARIA labels for buttons and sections
- Keyboard navigation support
- Screen reader friendly structure
- High contrast support
- Focus indicators for interactive elements 