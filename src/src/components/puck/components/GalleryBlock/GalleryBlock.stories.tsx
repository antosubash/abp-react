
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { GalleryBlock } from './GalleryBlock'

const meta: Meta<typeof GalleryBlock> = {
  title: 'Puck/GalleryBlock',
  component: GalleryBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A powerful gallery component for displaying a collection of images in various layouts.',
      },
    },
  },
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['grid', 'masonry', 'carousel', 'slideshow', 'list'],
      description: 'The layout of the gallery.',
    },
    columns: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
      description: 'The number of columns in the grid layout.',
    },
    gap: {
      control: 'text',
      description: 'The gap between the gallery items.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the gallery container.',
    },
    images: {
      control: 'object',
      description: 'An array of image objects to display in the gallery.',
    },
    borderRadius: {
      control: 'text',
      description: 'The border radius of the gallery items.',
    },
    shadow: {
      control: 'boolean',
      description: 'Whether to apply a box shadow to the gallery items.',
    },
    hoverEffect: {
      control: { type: 'select' },
      options: ['none', 'zoom', 'lift', 'glow'],
      description: 'The hover effect for the gallery items.',
    },
    lightbox: {
      control: 'boolean',
      description: 'Whether to enable the lightbox for viewing images.',
    },
    lightboxTheme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'The theme of the lightbox.',
    },
    showCaptions: {
      control: 'boolean',
      description: 'Whether to show captions for the images.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const mockImages = [
  { id: '1', src: 'https://picsum.photos/400/300?random=1', caption: 'Caption for Image 1' },
  { id: '2', src: 'https://picsum.photos/400/400?random=2', caption: 'Caption for Image 2' },
  { id: '3', src: 'https://picsum.photos/400/250?random=3', caption: 'Caption for Image 3' },
  { id: '4', src: 'https://picsum.photos/300/400?random=4', caption: 'Caption for Image 4' },
  { id: '5', src: 'https://picsum.photos/400/350?random=5', caption: 'Caption for Image 5' },
  { id: '6', src: 'https://picsum.photos/350/400?random=6', caption: 'Caption for Image 6' },
];

export const Grid: Story = {
  args: {
    layout: 'grid',
    columns: 3,
    gap: '16px',
    padding: '16px',
    images: mockImages,
    borderRadius: '8px',
    shadow: true,
    hoverEffect: 'zoom',
    lightbox: true,
    showCaptions: true,
  },
}

export const Masonry: Story = {
    args: {
      ...Grid.args,
      layout: 'masonry',
    },
  }
  
  export const Carousel: Story = {
    args: {
      ...Grid.args,
      layout: 'carousel',
    },
  }
  
  export const Slideshow: Story = {
    args: {
      ...Grid.args,
      layout: 'slideshow',
    },
  }
  
  export const List: Story = {
    args: {
      ...Grid.args,
      layout: 'list',
    },
  }
