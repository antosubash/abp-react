import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FlexBlock } from './FlexBlock'

const meta: Meta<typeof FlexBlock> = {
  title: 'Puck/FlexBlock',
  component: FlexBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexbox container component for creating flexible layouts.',
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'The direction of the flex items.',
    },
    justify: {
      control: { type: 'select' },
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'How to justify the flex items.',
    },
    align: {
      control: { type: 'select' },
      options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      description: 'How to align the flex items.',
    },
    wrap: {
      control: { type: 'select' },
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Whether the flex items should wrap.',
    },
    gap: {
      control: 'text',
      description: 'The gap between the flex items.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the flex container.',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the flex container.',
    },
    minHeight: {
      control: 'text',
      description: 'The minimum height of the flex container.',
    },
    width: {
      control: 'text',
      description: 'The width of the flex container.',
    },
    items: {
      control: 'object',
      description: 'The content to be rendered inside the flex container.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const MockItems = () => (
  <>
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', flex: 1 }}>
      <h3 style={{ margin: 0, paddingBottom: '10px' }}>Item 1</h3>
      <p style={{ margin: 0 }}>This is the first item.</p>
    </div>
    <div style={{ padding: '20px', backgroundColor: '#e0e0e0', borderRadius: '8px', flex: 1 }}>
      <h3 style={{ margin: 0, paddingBottom: '10px' }}>Item 2</h3>
      <p style={{ margin: 0 }}>This is the second item.</p>
    </div>
    <div style={{ padding: '20px', backgroundColor: '#d0d0d0', borderRadius: '8px', flex: 1 }}>
      <h3 style={{ margin: 0, paddingBottom: '10px' }}>Item 3</h3>
      <p style={{ margin: 0 }}>This is the third item.</p>
    </div>
  </>
)

export const Default: Story = {
  args: {
    direction: 'row',
    justify: 'space-between',
    align: 'center',
    wrap: 'nowrap',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    minHeight: '200px',
    width: '100%',
    items: MockItems,
  },
}
