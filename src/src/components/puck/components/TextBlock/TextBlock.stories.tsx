import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TextBlock } from './TextBlock'

const meta: Meta<typeof TextBlock> = {
  title: 'Puck/TextBlock',
  component: TextBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile text component for displaying paragraphs, headings, and quotes.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content.',
    },
    type: {
      control: { type: 'select' },
      options: ['paragraph', 'heading', 'subheading', 'quote'],
      description: 'The type of text.',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'The alignment of the text.',
    },
    fontSize: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg', 'xl', '2xl', '3xl'],
      description: 'The font size of the text.',
    },
    fontWeight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'The font weight of the text.',
    },
    color: {
      control: 'color',
      description: 'The color of the text.',
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'The maximum width of the text.',
    },
    lineHeight: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'relaxed'],
      description: 'The line height of the text.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the text container.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Paragraph: Story = {
  args: {
    text: 'This is a paragraph of text. It can be used to display long-form content.',
    type: 'paragraph',
    alignment: 'left',
    fontSize: 'base',
    fontWeight: 'normal',
    color: '#374151',
    maxWidth: 'md',
    lineHeight: 'normal',
    padding: '16px',
  },
}

export const Heading: Story = {
  args: {
    ...Paragraph.args,
    text: 'This is a Heading',
    type: 'heading',
    fontSize: '2xl',
    fontWeight: 'bold',
  },
}

export const Subheading: Story = {
  args: {
    ...Paragraph.args,
    text: 'This is a Subheading',
    type: 'subheading',
    fontSize: 'xl',
    fontWeight: 'semibold',
  },
}

export const Quote: Story = {
  args: {
    ...Paragraph.args,
    text: 'This is a quote. It is used to highlight a specific piece of text.',
    type: 'quote',
    fontSize: 'lg',
    fontWeight: 'medium',
    color: '#1f2937',
  },
}
