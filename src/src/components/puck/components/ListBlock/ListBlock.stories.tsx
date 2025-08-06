import type { Meta, StoryObj } from '@storybook/react'
import { ListBlock } from './ListBlock'

const meta: Meta<typeof ListBlock> = {
  title: 'Puck/ListBlock',
  component: ListBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['ordered', 'unordered', 'checklist'],
    },
    style: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'bordered'],
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    fontSize: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
    },
    spacing: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'loose'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Unordered: Story = {
  args: {
    items: [
      'First item in the list',
      'Second item in the list',
      'Third item in the list',
    ],
    type: 'unordered',
    style: 'default',
    alignment: 'left',
    fontSize: 'base',
    spacing: 'normal',
  },
}

export const Ordered: Story = {
  args: {
    items: [
      'Step one: Prepare the ingredients',
      'Step two: Mix the ingredients',
      'Step three: Bake at 350°F for 30 minutes',
      'Step four: Let cool before serving',
    ],
    type: 'ordered',
    style: 'default',
    alignment: 'left',
    fontSize: 'base',
    spacing: 'normal',
  },
}

export const Checklist: Story = {
  args: {
    items: [
      'Review the requirements',
      'Set up the development environment',
      'Write the initial code',
      'Test the functionality',
      'Deploy to production',
    ],
    type: 'checklist',
    style: 'default',
    alignment: 'left',
    fontSize: 'base',
    spacing: 'normal',
  },
}

export const Minimal: Story = {
  args: {
    items: [
      'Simple item one',
      'Simple item two',
      'Simple item three',
    ],
    type: 'unordered',
    style: 'minimal',
    alignment: 'left',
    fontSize: 'base',
    spacing: 'normal',
  },
}

export const Bordered: Story = {
  args: {
    items: [
      'Feature highlights',
      'Technical specifications',
      'Pricing information',
      'Contact details',
    ],
    type: 'unordered',
    style: 'bordered',
    alignment: 'left',
    fontSize: 'base',
    spacing: 'normal',
  },
}

export const TightSpacing: Story = {
  args: {
    items: [
      'Compact item 1',
      'Compact item 2',
      'Compact item 3',
      'Compact item 4',
    ],
    type: 'unordered',
    style: 'default',
    alignment: 'left',
    fontSize: 'base',
    spacing: 'tight',
  },
}

export const LooseSpacing: Story = {
  args: {
    items: [
      'Spacious item one',
      'Spacious item two',
      'Spacious item three',
    ],
    type: 'ordered',
    style: 'default',
    alignment: 'left',
    fontSize: 'base',
    spacing: 'loose',
  },
}

export const CenterAligned: Story = {
  args: {
    items: [
      'Centered item 1',
      'Centered item 2',
      'Centered item 3',
    ],
    type: 'unordered',
    style: 'default',
    alignment: 'center',
    fontSize: 'base',
    spacing: 'normal',
  },
}

export const LargeFont: Story = {
  args: {
    items: [
      'Large text item one',
      'Large text item two',
      'Large text item three',
    ],
    type: 'checklist',
    style: 'default',
    alignment: 'left',
    fontSize: 'lg',
    spacing: 'normal',
  },
} 