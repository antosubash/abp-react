
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ContainerBlock } from './ContainerBlock'

const meta: Meta<typeof ContainerBlock> = {
  title: 'Puck/ContainerBlock',
  component: ContainerBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A container component that wraps other components and provides layout and styling options.',
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: 'text',
      description: 'The maximum width of the container.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the container.',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the container.',
    },
    borderColor: {
      control: 'color',
      description: 'The border color of the container.',
    },
    borderRadius: {
      control: 'text',
      description: 'The border radius of the container.',
    },
    borderWidth: {
      control: 'text',
      description: 'The border width of the container.',
    },
    margin: {
      control: 'text',
      description: 'The margin of the container.',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'The text alignment of the container content.',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
      description: 'The box shadow of the container.',
    },
    items: {
      control: 'object',
      description: 'The content to be rendered inside the container.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const MockItems = () => (
  <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
    <h3 style={{ margin: 0, paddingBottom: '10px' }}>Hello from inside the container!</h3>
    <p style={{ margin: 0 }}>This is some content rendered by the `items` prop.</p>
  </div>
);


export const Default: Story = {
  args: {
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    borderRadius: '8px',
    borderWidth: '1px',
    margin: '20px',
    alignment: 'left',
    shadow: 'medium',
    items: MockItems,
  },
}
