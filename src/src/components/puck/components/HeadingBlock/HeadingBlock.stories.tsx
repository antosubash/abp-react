import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HeadingBlock } from './HeadingBlock'

const meta: Meta<typeof HeadingBlock> = {
  title: 'Puck/HeadingBlock',
  component: HeadingBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple heading component with various styling options.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The text of the heading.',
    },
    level: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The heading level.',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'The alignment of the heading.',
    },
    fontSize: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      description: 'The font size of the heading.',
    },
    fontWeight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold', 'extrabold'],
      description: 'The font weight of the heading.',
    },
    color: {
      control: 'color',
      description: 'The color of the heading.',
    },
    margin: {
      control: 'text',
      description: 'The margin of the heading.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'This is a Heading',
    level: 'h1',
    alignment: 'left',
    fontSize: '3xl',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '16px',
  },
}

export const CenteredH2: Story = {
  args: {
    ...Default.args,
    title: 'This is a Centered H2 Heading',
    level: 'h2',
    alignment: 'center',
    fontSize: '2xl',
  },
}

export const RightAlignedH3: Story = {
  args: {
    ...Default.args,
    title: 'This is a Right-Aligned H3 Heading',
    level: 'h3',
    alignment: 'right',
    fontSize: 'xl',
  },
}

export const CustomStyled: Story = {
  args: {
    ...Default.args,
    title: 'This is a Custom Styled Heading',
    level: 'h1',
    alignment: 'center',
    fontSize: '5xl',
    fontWeight: 'extrabold',
    color: '#3b82f6',
  },
}
