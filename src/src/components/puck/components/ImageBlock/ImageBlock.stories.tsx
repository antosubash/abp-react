import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ImageBlock } from './ImageBlock'

const meta: Meta<typeof ImageBlock> = {
  title: 'Puck/ImageBlock',
  component: ImageBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple image component with various styling options.',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'The URL of the image.',
    },
    alt: {
      control: 'text',
      description: 'The alt text for the image.',
    },
    width: {
      control: 'number',
      description: 'The width of the image.',
    },
    height: {
      control: 'number',
      description: 'The height of the image.',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'The alignment of the image.',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the image should have rounded corners.',
    },
    shadow: {
      control: 'boolean',
      description: 'Whether the image should have a box shadow.',
    },
    maxWidth: {
      control: 'text',
      description: 'The maximum width of the image.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the image container.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/800/600',
    alt: 'Placeholder Image',
    width: 800,
    height: 600,
    alignment: 'center',
    rounded: false,
    shadow: false,
    maxWidth: '100%',
    padding: '16px',
  },
}

export const RoundedAndShadowed: Story = {
  args: {
    ...Default.args,
    rounded: true,
    shadow: true,
  },
}
