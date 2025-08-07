
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CardBlock } from './CardBlock'

const meta: Meta<typeof CardBlock> = {
  title: 'Puck/CardBlock',
  component: CardBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component for displaying content in a structured format. Supports different styles, alignments, and content types.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The title of the card',
    },
    description: {
      control: { type: 'text' },
      description: 'The main description or content of the card',
    },
    content: {
        control: { type: 'text' },
        description: 'Additional content for the card',
    },
    image: {
      control: { type: 'text' },
      description: 'URL of the image to display at the top of the card',
    },
    buttonText: {
      control: { type: 'text' },
      description: 'Text for the call-to-action button',
    },
    buttonLink: {
      control: { type: 'text' },
      description: 'URL for the call-to-action button',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
      description: 'The visual style of the card',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'The text alignment of the card content',
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color of the card',
    },
    borderColor: {
      control: { type: 'color' },
      description: 'Border color of the card (for outline variant)',
    },
    padding: {
      control: { type: 'text' },
      description: 'CSS padding for the card container',
    },
    borderRadius: {
      control: { type: 'text' },
      description: 'CSS border radius for the card',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a description of the card. It can be a short summary of the content.',
    image: 'https://picsum.photos/400/200',
    buttonText: 'Learn More',
    buttonLink: '#',
  },
}

export const Outline: Story = {
    args: {
      title: 'Outline Card',
      description: 'This card has an outline style, which is great for a cleaner look.',
      image: 'https://picsum.photos/400/200',
      buttonText: 'Read More',
      buttonLink: '#',
      variant: 'outline',
    },
  }
  
  export const Centered: Story = {
    args: {
      title: 'Centered Card',
      description: 'All the content in this card is center-aligned.',
      image: 'https://picsum.photos/400/200',
      buttonText: 'Get Started',
      buttonLink: '#',
      alignment: 'center',
    },
  }
  
  export const WithoutImage: Story = {
    args: {
      title: 'Card Without an Image',
      description: 'This card demonstrates how the component looks without an image.',
      buttonText: 'More Info',
      buttonLink: '#',
    },
  }
  
  export const WithExtraContent: Story = {
    args: {
      title: 'Card With Extra Content',
      description: 'This is the main description.',
      content: 'This is some additional content that can be used to provide more details.',
      image: 'https://picsum.photos/400/200',
      buttonText: 'Explore',
      buttonLink: '#',
    },
  }
