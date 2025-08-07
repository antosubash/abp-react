
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { WelcomeBlock } from './WelcomeBlock'

const meta: Meta<typeof WelcomeBlock> = {
  title: 'Puck/WelcomeBlock',
  component: WelcomeBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A welcome block component to greet users.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the welcome block.',
    },
    description: {
      control: 'text',
      description: 'The description of the welcome block.',
    },
    showTips: {
      control: 'boolean',
      description: 'Whether to show the tips section.',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'The alignment of the welcome block.',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the welcome block.',
    },
    textColor: {
      control: 'color',
      description: 'The text color of the welcome block.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the welcome block.',
    },
    borderRadius: {
      control: 'text',
      description: 'The border radius of the welcome block.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Welcome to the Page Builder!',
    description: 'This is a welcome block. You can customize the title, description, and other properties.',
    showTips: true,
    alignment: 'center',
    backgroundColor: '#f8fafc',
    textColor: '#1f2937',
    padding: '48px 24px',
    borderRadius: '8px',
  },
}

export const WithoutTips: Story = {
    args: {
      ...Default.args,
      showTips: false,
    },
  }
  
  export const CustomColors: Story = {
    args: {
      ...Default.args,
      backgroundColor: '#1f2937',
      textColor: '#ffffff',
    },
  }
