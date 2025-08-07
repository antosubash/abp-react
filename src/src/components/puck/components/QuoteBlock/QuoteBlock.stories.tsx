import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { QuoteBlock } from './QuoteBlock'

const meta: Meta<typeof QuoteBlock> = {
  title: 'Puck/QuoteBlock',
  component: QuoteBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    style: {
      control: { type: 'select' },
      options: ['default', 'large', 'minimal', 'bordered'],
    },
    fontSize: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg', 'xl', '2xl', '3xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    style: 'default',
    alignment: 'left',
    fontSize: 'lg',
  },
}

export const Large: Story = {
  args: {
    quote: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
    style: 'large',
    alignment: 'center',
    fontSize: '2xl',
  },
}

export const Minimal: Story = {
  args: {
    quote: 'Stay hungry, stay foolish.',
    author: 'Steve Jobs',
    style: 'minimal',
    alignment: 'left',
    fontSize: 'base',
  },
}

export const Bordered: Story = {
  args: {
    quote: 'Design is not just what it looks like and feels like. Design is how it works.',
    author: 'Steve Jobs',
    style: 'bordered',
    alignment: 'center',
    fontSize: 'lg',
  },
}

export const WithSource: Story = {
  args: {
    quote: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    source: 'Speech at the Democratic National Convention',
    style: 'default',
    alignment: 'left',
    fontSize: 'lg',
  },
}

export const LongQuote: Story = {
  args: {
    quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts. The way to get started is to quit talking and begin doing.',
    author: 'Winston Churchill',
    style: 'large',
    alignment: 'center',
    fontSize: 'xl',
  },
} 