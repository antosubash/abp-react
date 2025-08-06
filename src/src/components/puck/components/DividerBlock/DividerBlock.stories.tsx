
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DividerBlock } from './DividerBlock'

const meta: Meta<typeof DividerBlock> = {
  title: 'Puck/DividerBlock',
  component: DividerBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple divider component to separate content.',
      },
    },
  },
  argTypes: {
    style: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted', 'double'],
      description: 'The style of the divider.',
    },
    color: {
      control: 'color',
      description: 'The color of the divider.',
    },
    width: {
      control: 'text',
      description: 'The width of the divider.',
    },
    height: {
      control: 'text',
      description: 'The height of the divider.',
    },
    margin: {
      control: 'text',
      description: 'The margin of the divider.',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'The alignment of the divider.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    style: 'solid',
    color: '#e5e7eb',
    width: '100%',
    height: '1px',
    margin: '24px 0',
    alignment: 'center',
  },
}

export const Dashed: Story = {
    args: {
      ...Default.args,
      style: 'dashed',
    },
  }
  
  export const Dotted: Story = {
    args: {
      ...Default.args,
      style: 'dotted',
    },
  }
  
  export const Double: Story = {
    args: {
      ...Default.args,
      style: 'double',
      height: '3px',
    },
  }
  
  export const Colored: Story = {
    args: {
      ...Default.args,
      color: '#3b82f6',
      height: '2px',
    },
  }
