---
sidebar_position: 5
---

# CMS Components

ABP React includes a comprehensive set of CMS components that can be used in the visual page builder (Puck) to create rich, interactive content. This guide covers all available components, their properties, and usage examples.

## Overview

CMS components are the building blocks of your website content. Each component is designed to be:

- **Configurable**: Easy to customize through the visual editor
- **Responsive**: Automatically adapt to different screen sizes
- **Accessible**: Built with accessibility best practices
- **Performant**: Optimized for fast loading and rendering

## Component Categories

### Content Components

#### TextBlock

A versatile text component for displaying formatted content.

**Properties:**
- `content` (string): The text content to display
- `align` (string): Text alignment (left, center, right, justify)
- `size` (string): Text size (small, medium, large)
- `color` (string): Text color (primary, secondary, muted, etc.)
- `weight` (string): Font weight (normal, medium, semibold, bold)

**Usage Example:**
```typescript
{
  type: 'TextBlock',
  props: {
    content: 'This is a sample text block with custom styling.',
    align: 'center',
    size: 'large',
    color: 'primary',
    weight: 'semibold'
  }
}
```

#### HeadingBlock

Display headings with various levels and styling options.

**Properties:**
- `text` (string): The heading text
- `level` (number): Heading level (1-6, corresponding to h1-h6)
- `align` (string): Text alignment
- `color` (string): Text color
- `size` (string): Heading size (small, medium, large, xlarge)

**Usage Example:**
```typescript
{
  type: 'HeadingBlock',
  props: {
    text: 'Welcome to Our Website',
    level: 1,
    align: 'center',
    color: 'primary',
    size: 'xlarge'
  }
}
```

#### WelcomeBlock

A specialized welcome message component with customizable content.

**Properties:**
- `title` (string): Main welcome title
- `subtitle` (string): Secondary welcome text
- `description` (string): Additional description text
- `showButton` (boolean): Whether to display a call-to-action button
- `buttonText` (string): Button text
- `buttonLink` (string): Button destination URL

**Usage Example:**
```typescript
{
  type: 'WelcomeBlock',
  props: {
    title: 'Welcome to ABP React',
    subtitle: 'Build amazing web applications',
    description: 'Start your journey with our comprehensive React framework.',
    showButton: true,
    buttonText: 'Get Started',
    buttonLink: '/docs'
  }
}
```

#### QuoteBlock

Display quotes with attribution and styling.

**Properties:**
- `quote` (string): The quote text
- `author` (string): Quote author name
- `source` (string): Source of the quote
- `style` (string): Quote style (default, modern, classic)
- `align` (string): Quote alignment

**Usage Example:**
```typescript
{
  type: 'QuoteBlock',
  props: {
    quote: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
    source: 'Computer Scientist',
    style: 'modern',
    align: 'center'
  }
}
```

#### ListBlock

Create ordered and unordered lists with custom styling.

**Properties:**
- `items` (string[]): Array of list items
- `type` (string): List type (ordered, unordered)
- `style` (string): List style (default, bullet, numbered)
- `spacing` (string): Spacing between items (tight, normal, loose)

**Usage Example:**
```typescript
{
  type: 'ListBlock',
  props: {
    items: [
      'Feature 1: Visual page builder',
      'Feature 2: Component library',
      'Feature 3: Responsive design'
    ],
    type: 'unordered',
    style: 'bullet',
    spacing: 'normal'
  }
}
```

### Layout Components

#### Hero

Full-width hero sections with background images and text overlay.

**Properties:**
- `title` (string): Hero title
- `subtitle` (string): Hero subtitle
- `backgroundImage` (string): Background image URL
- `overlay` (boolean): Whether to show text overlay
- `height` (string): Hero height (small, medium, large, full)
- `textColor` (string): Text color for overlay
- `showButton` (boolean): Display call-to-action button
- `buttonText` (string): Button text
- `buttonLink` (string): Button destination

**Usage Example:**
```typescript
{
  type: 'Hero',
  props: {
    title: 'Build Amazing Websites',
    subtitle: 'With ABP React and Visual Page Builder',
    backgroundImage: '/images/hero-bg.jpg',
    overlay: true,
    height: 'large',
    textColor: 'white',
    showButton: true,
    buttonText: 'Learn More',
    buttonLink: '/features'
  }
}
```

#### CardBlock

Display content in card format with various layouts.

**Properties:**
- `title` (string): Card title
- `content` (string): Card content
- `image` (string): Optional card image URL
- `layout` (string): Card layout (default, horizontal, featured)
- `shadow` (string): Shadow style (none, small, medium, large)
- `border` (boolean): Show card border
- `padding` (string): Internal padding (tight, normal, loose)

**Usage Example:**
```typescript
{
  type: 'CardBlock',
  props: {
    title: 'Feature Card',
    content: 'This is a feature description with supporting text.',
    image: '/images/feature.jpg',
    layout: 'horizontal',
    shadow: 'medium',
    border: true,
    padding: 'normal'
  }
}
```

#### ContainerBlock

Content containers with customizable spacing and borders.

**Properties:**
- `content` (string): Container content
- `maxWidth` (string): Maximum container width (sm, md, lg, xl, full)
- `padding` (string): Internal padding
- `margin` (string): External margin
- `background` (string): Background color or image
- `border` (boolean): Show container border
- `borderRadius` (string): Border radius style

**Usage Example:**
```typescript
{
  type: 'ContainerBlock',
  props: {
    content: 'This content is wrapped in a container with custom styling.',
    maxWidth: 'lg',
    padding: 'loose',
    margin: 'normal',
    background: 'muted',
    border: true,
    borderRadius: 'rounded-lg'
  }
}
```

#### FlexBlock

Flexible layout container for arranging child elements.

**Properties:**
- `direction` (string): Flex direction (row, column, row-reverse, column-reverse)
- `justify` (string): Justify content (start, center, end, between, around)
- `align` (string): Align items (start, center, end, stretch, baseline)
- `wrap` (boolean): Allow flex wrapping
- `gap` (string): Gap between flex items (none, small, medium, large)
- `padding` (string): Container padding

**Usage Example:**
```typescript
{
  type: 'FlexBlock',
  props: {
    direction: 'row',
    justify: 'between',
    align: 'center',
    wrap: true,
    gap: 'medium',
    padding: 'normal'
  }
}
```

#### GridBlock

Grid-based layout system for complex arrangements.

**Properties:**
- `columns` (number): Number of grid columns (1-12)
- `gap` (string): Gap between grid items
- `padding` (string): Grid container padding
- `responsive` (boolean): Enable responsive grid behavior
- `autoFit` (boolean): Automatically fit items to available space

**Usage Example:**
```typescript
{
  type: 'GridBlock',
  props: {
    columns: 3,
    gap: 'medium',
    padding: 'normal',
    responsive: true,
    autoFit: true
  }
}
```

#### SpacerBlock

Add vertical spacing between content elements.

**Properties:**
- `height` (string): Spacer height (small, medium, large, xlarge)
- `customHeight` (string): Custom height in CSS units
- `background` (string): Optional background color
- `border` (boolean): Show top border

**Usage Example:**
```typescript
{
  type: 'SpacerBlock',
  props: {
    height: 'large',
    customHeight: '80px',
    background: 'transparent',
    border: false
  }
}
```

#### TableBlock

Display data in table format with sorting and styling.

**Properties:**
- `headers` (string[]): Table column headers
- `rows` (string[][]): Table data rows
- `sortable` (boolean): Enable column sorting
- `striped` (boolean): Alternate row colors
- `bordered` (boolean): Show table borders
- `compact` (boolean): Compact table layout

**Usage Example:**
```typescript
{
  type: 'TableBlock',
  props: {
    headers: ['Name', 'Email', 'Role'],
    rows: [
      ['John Doe', 'john@example.com', 'Admin'],
      ['Jane Smith', 'jane@example.com', 'User']
    ],
    sortable: true,
    striped: true,
    bordered: true,
    compact: false
  }
}
```

### Media Components

#### ImageBlock

Display images with various styling and optimization options.

**Properties:**
- `src` (string): Image source URL
- `alt` (string): Image alt text for accessibility
- `caption` (string): Optional image caption
- `width` (string): Image width (auto, small, medium, large, full)
- `height` (string): Image height
- `fit` (string): Image fit style (cover, contain, fill)
- `rounded` (boolean): Apply rounded corners
- `shadow` (string): Image shadow style

**Usage Example:**
```typescript
{
  type: 'ImageBlock',
  props: {
    src: '/images/sample.jpg',
    alt: 'Sample image description',
    caption: 'This is a sample image',
    width: 'medium',
    height: 'auto',
    fit: 'cover',
    rounded: true,
    shadow: 'medium'
  }
}
```

#### VideoBlock

Embed and display video content with controls.

**Properties:**
- `src` (string): Video source URL
- `poster` (string): Video poster image URL
- `autoplay` (boolean): Auto-play video
- `controls` (boolean): Show video controls
- `loop` (boolean): Loop video playback
- `muted` (boolean): Start video muted
- `width` (string): Video width
- `height` (string): Video height

**Usage Example:**
```typescript
{
  type: 'VideoBlock',
  props: {
    src: '/videos/demo.mp4',
    poster: '/images/video-poster.jpg',
    autoplay: false,
    controls: true,
    loop: false,
    muted: true,
    width: 'full',
    height: 'auto'
  }
}
```

#### GalleryBlock

Image gallery with navigation and lightbox functionality.

**Properties:**
- `images` (string[]): Array of image URLs
- `columns` (number): Number of gallery columns
- `gap` (string): Gap between images
- `lightbox` (boolean): Enable lightbox view
- `navigation` (boolean): Show navigation arrows
- `thumbnails` (boolean): Display thumbnail navigation
- `autoplay` (boolean): Auto-advance gallery

**Usage Example:**
```typescript
{
  type: 'GalleryBlock',
  props: {
    images: [
      '/images/gallery1.jpg',
      '/images/gallery2.jpg',
      '/images/gallery3.jpg'
    ],
    columns: 3,
    gap: 'medium',
    lightbox: true,
    navigation: true,
    thumbnails: true,
    autoplay: false
  }
}
```

#### CarouselBlock

Image carousel with automatic rotation and controls.

**Properties:**
- `images` (string[]): Array of carousel images
- `autoplay` (boolean): Auto-rotate carousel
- `interval` (number): Rotation interval in milliseconds
- `showIndicators` (boolean): Display position indicators
- `showControls` (boolean): Show navigation controls
- `height` (string): Carousel height
- `transition` (string): Transition effect (slide, fade)

**Usage Example:**
```typescript
{
  type: 'CarouselBlock',
  props: {
    images: [
      '/images/carousel1.jpg',
      '/images/carousel2.jpg',
      '/images/carousel3.jpg'
    ],
    autoplay: true,
    interval: 5000,
    showIndicators: true,
    showControls: true,
    height: 'medium',
    transition: 'slide'
  }
}
```

### Interactive Components

#### ButtonBlock

Call-to-action buttons with various styles and behaviors.

**Properties:**
- `text` (string): Button text
- `variant` (string): Button style (primary, secondary, outline, ghost)
- `size` (string): Button size (sm, md, lg)
- `link` (string): Button destination URL
- `icon` (string): Optional icon name
- `iconPosition` (string): Icon position (left, right)
- `fullWidth` (boolean): Full-width button
- `disabled` (boolean): Disable button

**Usage Example:**
```typescript
{
  type: 'ButtonBlock',
  props: {
    text: 'Get Started',
    variant: 'primary',
    size: 'lg',
    link: '/signup',
    icon: 'arrow-right',
    iconPosition: 'right',
    fullWidth: false,
    disabled: false
  }
}
```

#### TestimonialBlock

Display customer testimonials and reviews.

**Properties:**
- `quote` (string): Testimonial text
- `author` (string): Author name
- `position` (string): Author position/company
- `avatar` (string): Author avatar image URL
- `rating` (number): Star rating (1-5)
- `style` (string): Testimonial style (default, card, modern)
- `align` (string): Content alignment

**Usage Example:**
```typescript
{
  type: 'TestimonialBlock',
  props: {
    quote: 'ABP React has transformed how we build web applications.',
    author: 'Sarah Johnson',
    position: 'Lead Developer',
    avatar: '/images/avatar.jpg',
    rating: 5,
    style: 'card',
    align: 'center'
  }
}
```

### Utility Components

#### DividerBlock

Visual separators between content sections.

**Properties:**
- `style` (string): Divider style (solid, dashed, dotted)
- `color` (string): Divider color
- `thickness` (string): Line thickness (thin, normal, thick)
- `spacing` (string): Vertical spacing around divider
- `text` (string): Optional divider text
- `textAlign` (string): Text alignment

**Usage Example:**
```typescript
{
  type: 'DividerBlock',
  props: {
    style: 'solid',
    color: 'muted',
    thickness: 'normal',
    spacing: 'medium',
    text: 'Section Break',
    textAlign: 'center'
  }
}
```

## Component Configuration

### Field Types

Each component uses specific field types for configuration:

- **text**: Single-line text input
- **textarea**: Multi-line text input
- **number**: Numeric input with validation
- **select**: Dropdown selection from predefined options
- **boolean**: Checkbox for true/false values
- **color**: Color picker for color selection
- **image**: Image upload and selection
- **array**: Array of values (e.g., list items)

### Default Values

Every component includes sensible default values:

```typescript
// Example: TextBlock defaults
defaultProps: {
  content: 'Enter your text here...',
  align: 'left',
  size: 'medium',
  color: 'foreground',
  weight: 'normal'
}
```

### Validation Rules

Components include input validation:

```typescript
// Example: Required field validation
fields: {
  title: {
    type: 'text',
    label: 'Title',
    required: true,
    minLength: 3,
    maxLength: 100
  }
}
```

## Custom Component Development

### Creating New Components

1. **Component File**: Create the React component
2. **Configuration**: Define component properties and defaults
3. **Styling**: Add CSS classes and responsive styles
4. **Documentation**: Create Storybook stories
5. **Integration**: Add to Puck configuration

### Component Structure

```typescript
// Component implementation
export const CustomComponent: React.FC<CustomComponentProps> = (props) => {
  return (
    <div className="custom-component">
      {/* Component content */}
    </div>
  )
}

// Component configuration
export const CustomComponentConfig: ComponentConfig<CustomComponentProps> = {
  fields: {
    // Field definitions
  },
  defaultProps: {
    // Default values
  },
  category: 'custom', // Component category
  label: 'Custom Component' // Display name
}
```

### Best Practices

- **Accessibility**: Include proper ARIA labels and keyboard navigation
- **Responsiveness**: Ensure components work on all screen sizes
- **Performance**: Optimize rendering and avoid unnecessary re-renders
- **Documentation**: Provide clear usage examples and property descriptions
- **Testing**: Include comprehensive tests and Storybook stories

## Component Categories

### Content Organization

Components are organized into logical categories:

- **Content**: Text, headings, quotes, lists
- **Layout**: Containers, grids, flexboxes, spacers
- **Media**: Images, videos, galleries, carousels
- **Interactive**: Buttons, forms, testimonials
- **Utilities**: Dividers, separators, placeholders

### Category Usage

```typescript
// Component categories in Puck config
categories: {
  content: {
    title: 'Content',
    components: ['TextBlock', 'HeadingBlock', 'WelcomeBlock', 'QuoteBlock', 'ListBlock']
  },
  layout: {
    title: 'Layout',
    components: ['Hero', 'CardBlock', 'ContainerBlock', 'FlexBlock', 'GridBlock']
  },
  media: {
    title: 'Media',
    components: ['ImageBlock', 'VideoBlock', 'GalleryBlock', 'CarouselBlock']
  }
}
```

## Responsive Design

### Mobile-First Approach

All components are designed with mobile devices in mind:

- **Flexible layouts**: Components adapt to different screen sizes
- **Touch-friendly**: Interactive elements work well on touch devices
- **Performance**: Optimized for mobile performance
- **Accessibility**: Mobile-accessible design patterns

### Breakpoint System

Components use consistent breakpoints:

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

## Accessibility Features

### ARIA Support

Components include proper ARIA attributes:

- **Labels**: Descriptive labels for screen readers
- **Roles**: Semantic HTML roles
- **States**: Dynamic state management
- **Navigation**: Keyboard navigation support

### Screen Reader Support

- **Alt text**: Descriptive image alt text
- **Headings**: Proper heading hierarchy
- **Landmarks**: Semantic page structure
- **Focus management**: Clear focus indicators

## Performance Optimization

### Lazy Loading

Media components support lazy loading:

- **Images**: Load only when visible
- **Videos**: Defer video loading
- **Galleries**: Progressive image loading
- **Carousels**: Load visible slides first

### Bundle Optimization

- **Tree shaking**: Remove unused component code
- **Code splitting**: Load components on demand
- **Minification**: Optimize component bundles
- **Caching**: Leverage browser caching

## Conclusion

The CMS components in ABP React provide a comprehensive toolkit for building rich, interactive websites. Whether you're creating simple content pages or complex layouts, these components offer the flexibility and functionality needed for modern web development.

For more information about specific components, refer to their individual Storybook stories and the component source code. The components are designed to be extensible, so you can easily create custom components that integrate seamlessly with the existing system.
