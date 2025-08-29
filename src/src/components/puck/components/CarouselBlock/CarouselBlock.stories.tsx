import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CarouselBlock } from './CarouselBlock'
import { CarouselBlockDefaults } from './CarouselBlockDefaults'

const meta: Meta<typeof CarouselBlock> = {
  title: 'Puck/CarouselBlock',
  component: CarouselBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A highly customizable carousel component for showcasing a series of images or content. Supports auto-play, navigation controls, and various styling options.',
      },
    },
  },
  argTypes: {
    slides: {
      control: 'object',
      description: 'An array of slide objects to display in the carousel.',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Whether the carousel should automatically transition between slides.',
    },
    autoPlayInterval: {
      control: 'number',
      description: 'The time in milliseconds between auto-play transitions.',
    },
    showArrows: {
      control: 'boolean',
      description: 'Whether to display navigation arrows.',
    },
    showDots: {
      control: 'boolean',
      description: 'Whether to display pagination dots.',
    },
    loop: {
      control: 'boolean',
      description: 'Whether the carousel should loop back to the beginning after the last slide.',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Whether to pause auto-play when the mouse is over the carousel.',
    },
    height: {
      control: 'text',
      description: 'The height of the carousel container.',
    },
    width: {
      control: 'text',
      description: 'The width of the carousel container.',
    },
    maxWidth: {
      control: 'text',
      description: 'The max-width of the carousel container.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the carousel container.',
    },
    borderRadius: {
      control: 'text',
      description: 'The border-radius of the carousel container.',
    },
    shadow: {
      control: 'boolean',
      description: 'Whether to apply a box shadow to the carousel.',
    },
    arrowColor: {
      control: 'color',
      description: 'The color of the navigation arrows.',
    },
    arrowBackgroundColor: {
      control: 'color',
      description: 'The background color of the navigation arrows.',
    },
    dotColor: {
      control: 'color',
      description: 'The color of the pagination dots.',
    },
    dotActiveColor: {
      control: 'color',
      description: 'The color of the active pagination dot.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...CarouselBlockDefaults,
    slides: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/800/400?random=1',
        title: 'First Slide',
        description: 'This is the first slide of the carousel.',
        buttonText: 'Learn More',
        buttonUrl: '#',
        backgroundColor: '#ff7e7e',
        textColor: '#ffffff',
        textAlignment: 'center',
      },
      {
        id: '2',
        imageUrl: 'https://picsum.photos/800/400?random=2',
        title: 'Second Slide',
        description: 'This is the second slide of the carousel.',
        buttonText: 'Get Started',
        buttonUrl: '#',
        backgroundColor: '#7e7eff',
        textColor: '#ffffff',
        textAlignment: 'center',
      },
      {
        id: '3',
        imageUrl: 'https://picsum.photos/800/400?random=3',
        title: 'Third Slide',
        description: 'This is the third slide of the carousel.',
        buttonText: 'Explore',
        buttonUrl: '#',
        backgroundColor: '#7eff7e',
        textColor: '#ffffff',
        textAlignment: 'center',
      },
    ],
  },
}
