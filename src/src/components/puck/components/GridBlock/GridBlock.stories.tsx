
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { GridBlock } from './GridBlock'

const meta: Meta<typeof GridBlock> = {
  title: 'Puck/GridBlock',
  component: GridBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A grid container component for creating grid-based layouts.',
      },
    },
  },
  argTypes: {
    columns: {
      control: 'text',
      description: 'The grid-template-columns value.',
    },
    rows: {
      control: 'text',
      description: 'The grid-template-rows value.',
    },
    gap: {
      control: 'text',
      description: 'The gap between the grid items.',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly'],
      description: 'How to justify the grid items.',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'stretch', 'baseline'],
      description: 'How to align the grid items.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the grid container.',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the grid container.',
    },
    minHeight: {
      control: 'text',
      description: 'The minimum height of the grid container.',
    },
    width: {
      control: 'text',
      description: 'The width of the grid container.',
    },
    items: {
      control: 'object',
      description: 'The content to be rendered inside the grid container.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const MockItems = () => (
    <>
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, paddingBottom: '10px' }}>Item 1</h3>
        <p style={{ margin: 0 }}>This is the first item.</p>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#e0e0e0', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, paddingBottom: '10px' }}>Item 2</h3>
        <p style={{ margin: 0 }}>This is the second item.</p>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#d0d0d0', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, paddingBottom: '10px' }}>Item 3</h3>
        <p style={{ margin: 0 }}>This is the third item.</p>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#c0c0c0', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, paddingBottom: '10px' }}>Item 4</h3>
        <p style={{ margin: 0 }}>This is the fourth item.</p>
      </div>
    </>
  );

export const Default: Story = {
  args: {
    columns: 'repeat(2, 1fr)',
    rows: 'auto',
    gap: '20px',
    justify: 'center',
    align: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    minHeight: '300px',
    width: '100%',
    items: MockItems,
  },
}
