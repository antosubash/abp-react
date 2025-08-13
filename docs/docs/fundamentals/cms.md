---
sidebar_position: 6
---

# Content Management System (CMS)

ABP React includes a powerful Content Management System (CMS) that provides visual page building, content management, and user interaction features. This guide covers all CMS capabilities and how to use them effectively.

## Overview

The CMS system is built on top of ABP Framework's CmsKit module and includes:

- **Visual Page Builder**: Drag-and-drop interface powered by Puck
- **Page Management**: Create, edit, and manage website pages
- **Menu Management**: Dynamic navigation menu administration
- **Comment System**: User engagement and moderation
- **Content Blocks**: Pre-built components for rapid development
- **Multi-tenant Support**: Tenant-specific content management

## Visual Page Builder (Puck)

### Introduction

The visual page builder uses [Puck](https://measured.co/puck) to provide a drag-and-drop interface for creating pages without writing code. It's perfect for content creators and non-technical users.

### Key Features

- **Drag-and-Drop Interface**: Intuitive visual editing
- **Real-time Preview**: See changes instantly
- **Component Library**: Pre-built blocks for common UI patterns
- **Responsive Design**: Built-in responsive design tools
- **Template System**: Save and reuse page layouts

### Available Components

#### Content Components
- **TextBlock**: Rich text content with formatting options
- **HeadingBlock**: Various heading levels with styling
- **WelcomeBlock**: Welcome message with customizable content
- **QuoteBlock**: Quote displays with attribution
- **ListBlock**: Ordered and unordered lists

#### Layout Components
- **Hero**: Hero sections with background images and text
- **CardBlock**: Card layouts for content organization
- **ContainerBlock**: Content containers with padding and borders
- **FlexBlock**: Flexible layout containers
- **GridBlock**: Grid-based layouts
- **SpacerBlock**: Vertical spacing between elements
- **TableBlock**: Data table displays

#### Media Components
- **ImageBlock**: Image displays with alt text and captions
- **VideoBlock**: Video embedding and playback
- **GalleryBlock**: Image galleries with navigation
- **CarouselBlock**: Image carousels with controls

#### Interactive Components
- **ButtonBlock**: Call-to-action buttons
- **TestimonialBlock**: Customer testimonials and reviews

#### Utility Components
- **DividerBlock**: Visual separators between content

### Using the Page Builder

#### Creating a New Page

1. Navigate to **Admin → CMS → Pages → Create New Page**
2. Fill in basic page information (title, slug, meta description)
3. Use the visual editor to build your page content
4. Drag components from the left sidebar to the canvas
5. Configure component properties in the right sidebar
6. Save and publish your page

#### Editing Existing Pages

1. Navigate to **Admin → CMS → Pages**
2. Click the edit button for the page you want to modify
3. Make changes using the visual editor
4. Save your changes

#### Component Configuration

Each component has configurable properties:

```typescript
// Example: HeadingBlock configuration
{
  text: "Welcome to Our Site",
  level: 1, // h1, h2, h3, etc.
  align: "center",
  color: "primary",
  size: "large"
}
```

## Page Management

### Page Structure

Pages in the CMS have the following structure:

```typescript
interface Page {
  id: string
  title: string
  slug: string
  content: string // Puck JSON data
  metaDescription?: string
  isPublished: boolean
  creationTime: Date
  lastModificationTime?: Date
}
```

### Page Operations

#### Creating Pages

```typescript
// Using the admin interface
const createPage = async (pageData: CreatePageInputDto) => {
  const response = await pageAdminCreate(pageData)
  return response
}
```

#### Updating Pages

```typescript
// Update existing page content
const updatePage = async (id: string, updates: UpdatePageInputDto) => {
  const response = await pageAdminUpdate(id, updates)
  return response
}
```

#### Publishing Pages

Pages can be published or kept as drafts:

```typescript
// Set page as published
const publishPage = async (id: string) => {
  const response = await pageAdminUpdate(id, {
    isPublished: true
  })
  return response
}
```

### URL Management

Pages use SEO-friendly URLs based on their slug:

- **Auto-generation**: Slugs are automatically generated from titles
- **Custom slugs**: Override auto-generated slugs when needed
- **URL validation**: Ensures unique and valid URLs

## Menu Management

### Menu Structure

The CMS includes a flexible menu system:

```typescript
interface MenuItem {
  id: string
  name: string
  link: string
  icon?: string
  order: number
  parentId?: string
  isActive: boolean
}
```

### Menu Operations

#### Creating Menu Items

1. Navigate to **Admin → CMS → Menu Items → Create New Menu Item**
2. Configure menu item properties
3. Set parent menu for hierarchical navigation
4. Define display order

#### Menu Hierarchy

- **Parent menus**: Top-level navigation items
- **Sub-menus**: Nested navigation under parent items
- **Dynamic ordering**: Drag-and-drop menu organization

## Comment System

### Comment Features

The CMS includes a comprehensive comment system:

- **User authentication**: Only authenticated users can comment
- **Moderation tools**: Admin interface for comment management
- **Spam protection**: Built-in spam detection
- **Threaded comments**: Support for comment replies
- **Rich text**: Markdown support for comment formatting

### Comment Management

#### Admin Interface

Navigate to **Admin → CMS → Comments** to:

- View all comments across the site
- Moderate inappropriate content
- Delete spam or offensive comments
- Manage comment settings

#### Comment Permissions

```typescript
// Available comment permissions
CMSKIT_COMMENTS = 'CmsKit.Comments'
CMSKIT_COMMENTS_DELETE = 'CmsKit.Comments.Delete'
CMSKIT_COMMENTS_UPDATE = 'CmsKit.Comments.Update'
CMSKIT_COMMENTS_SETTING_MANAGEMENT = 'CmsKit.Comments.SettingManagement'
```

#### Public Comment Permissions

```typescript
// Public comment permissions
CMSKIT_PUBLIC_COMMENTS = 'CmsKitPublic.Comments'
CMSKIT_PUBLIC_COMMENTS_DELETE_ALL = 'CmsKitPublic.Comments.DeleteAll'
```

### Comment Display

Comments are automatically displayed on pages:

```typescript
// Comments component usage
<PageComments pageId={page.id} pageTitle={page.title} />
```

## Content Blocks and Components

### Block Configuration

Each content block has a configuration file that defines:

- **Properties**: Configurable options for the block
- **Default values**: Initial settings for new blocks
- **Validation**: Input validation rules
- **Styling**: CSS classes and styling options

### Custom Block Development

#### Creating New Blocks

1. Create a new component in `src/components/puck/components/`
2. Define the component's TypeScript interface
3. Create a configuration file with block settings
4. Add the block to the main Puck configuration
5. Create Storybook stories for documentation

#### Block Structure

```typescript
// Example block component
export const CustomBlock: React.FC<CustomBlockProps> = ({ 
  title, 
  content, 
  className = '' 
}) => {
  return (
    <div className={`custom-block ${className}`}>
      <h3>{title}</h3>
      <div>{content}</div>
    </div>
  )
}

// Block configuration
export const CustomBlockConfig: ComponentConfig<CustomBlockProps> = {
  fields: {
    title: { type: 'text', label: 'Title' },
    content: { type: 'textarea', label: 'Content' }
  },
  defaultProps: {
    title: 'Default Title',
    content: 'Default content'
  }
}
```

## Multi-tenant Support

### Tenant-specific Content

The CMS supports multi-tenant environments:

- **Content isolation**: Each tenant has separate content
- **Feature management**: Enable/disable CMS features per tenant
- **Permission control**: Tenant-specific access controls
- **Content sharing**: Optional content sharing between tenants

### Tenant Configuration

```typescript
// Enable CMS features for a tenant
const enableCmsFeatures = async (tenantId: string) => {
  await tenantFeatureManagement.setFeatures(tenantId, {
    'CmsKit.Pages': true,
    'CmsKit.Comments': true,
    'CmsKit.Menus': true
  })
}
```

## CMS Permissions

### Permission System

The CMS uses ABP Framework's permission system:

```typescript
// Page permissions
CMSKIT_PAGES = 'CmsKit.Pages'
CMSKIT_PAGES_CREATE = 'CmsKit.Pages.Create'
CMSKIT_PAGES_UPDATE = 'CmsKit.Pages.Update'
CMSKIT_PAGES_DELETE = 'CmsKit.Pages.Delete'
CMSKIT_PAGES_SET_AS_HOME_PAGE = 'CmsKit.Pages.SetAsHomePage'

// Blog permissions
CMSKIT_BLOGS = 'CmsKit.Blogs'
CMSKIT_BLOGS_CREATE = 'CmsKit.Blogs.Create'
CMSKIT_BLOGS_UPDATE = 'CmsKit.Blogs.Update'
CMSKIT_BLOGS_DELETE = 'CmsKit.Blogs.Delete'

// Tag permissions
CMSKIT_TAGS = 'CmsKit.Tags'
CMSKIT_TAGS_CREATE = 'CmsKit.Tags.Create'
CMSKIT_TAGS_UPDATE = 'CmsKit.Tags.Update'
CMSKIT_TAGS_DELETE = 'CmsKit.Tags.Delete'
```

### Role-based Access

Assign CMS permissions to user roles:

```typescript
// Example: Content Editor role
const contentEditorPermissions = [
  'CmsKit.Pages.Create',
  'CmsKit.Pages.Update',
  'CmsKit.Comments.Update',
  'CmsKit.Tags.Create'
]
```

## Best Practices

### Content Organization

- **Consistent naming**: Use clear, descriptive names for pages and components
- **Content hierarchy**: Organize content logically with proper navigation
- **SEO optimization**: Use descriptive titles and meta descriptions
- **Mobile-first**: Design content with mobile devices in mind

### Performance Optimization

- **Image optimization**: Use appropriate image formats and sizes
- **Lazy loading**: Implement lazy loading for media content
- **Caching**: Leverage ABP Framework's caching capabilities
- **CDN integration**: Use CDNs for static content delivery

### Security Considerations

- **Input validation**: Validate all user inputs
- **Permission checks**: Always verify user permissions
- **Content sanitization**: Sanitize user-generated content
- **Rate limiting**: Implement rate limiting for comment systems

## Troubleshooting

### Common Issues

#### Page Builder Not Loading

- Check browser console for JavaScript errors
- Verify Puck configuration is correct
- Ensure all required dependencies are installed

#### Content Not Rendering

- Validate Puck data structure
- Check component configuration
- Verify component imports and exports

#### Permission Errors

- Verify user has required permissions
- Check role assignments
- Confirm feature flags are enabled

### Debug Mode

Enable debug mode for troubleshooting:

```typescript
// Enable debug logging
const debugConfig = {
  debug: true,
  logLevel: 'debug'
}
```

## Integration Examples

### Custom Page Templates

Create reusable page templates:

```typescript
// Template configuration
const pageTemplate = {
  content: [
    {
      type: 'Hero',
      props: {
        title: 'Welcome',
        subtitle: 'Custom template',
        backgroundImage: '/images/hero-bg.jpg'
      }
    },
    {
      type: 'TextBlock',
      props: {
        content: 'Default content for template'
      }
    }
  ]
}
```

### API Integration

Integrate with external APIs:

```typescript
// Fetch content from external CMS
const fetchExternalContent = async () => {
  const response = await fetch('/api/external-content')
  const content = await response.json()
  return convertToPuckFormat(content)
}
```

## Conclusion

The ABP React CMS provides a powerful, flexible content management solution that combines the ease of visual editing with the power of modern web technologies. Whether you're building a simple blog or a complex corporate website, the CMS system offers the tools and flexibility needed to create engaging, professional content.

For more information about specific features, refer to the individual component documentation and the ABP Framework CmsKit module documentation.
