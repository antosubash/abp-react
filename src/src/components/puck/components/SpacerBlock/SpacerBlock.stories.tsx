
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SpacerBlock } from './SpacerBlock'

const meta: Meta<typeof SpacerBlock> = {
  title: 'Puck/SpacerBlock',
  component: SpacerBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple spacer component to add vertical space between other components.',
      },
    },
  },
  argTypes: {
    height: {
      control: 'text',
      description: 'The height of the spacer.',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the spacer.',
    },
    borderTop: {
      control: 'text',
      description: 'The top border of the spacer.',
    },
    borderBottom: {
      control: 'text',
      description: 'The bottom border of the spacer.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    height: '40px',
    backgroundColor: 'transparent',
    borderTop: 'none',
    borderBottom: 'none',
  },
}

export const WithColor: Story = {
    args: {
      ...Default.args,
      height: '60px',
      backgroundColor: '#f0f0f0',
    },
  }
  
  export const WithBorders: Story = {
    args: {
      ...Default.args,
      height: '80px',
      borderTop: '2px solid #3b82f6',
      borderBottom: '2px solid #3b82f6',
    },
  }
