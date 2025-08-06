import type { Meta, StoryObj } from '@storybook/react'
import { TableBlock } from './TableBlock'

const meta: Meta<typeof TableBlock> = {
  title: 'Puck/TableBlock',
  component: TableBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: { type: 'select' },
      options: ['default', 'striped', 'bordered', 'minimal'],
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    fontSize: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      ['John Doe', 'john@example.com', 'Developer'],
      ['Jane Smith', 'jane@example.com', 'Designer'],
      ['Bob Johnson', 'bob@example.com', 'Manager'],
    ],
    headers: ['Name', 'Email', 'Role'],
    style: 'default',
    alignment: 'left',
    fontSize: 'base',
  },
}

export const Striped: Story = {
  args: {
    data: [
      ['Product A', '$100', 'In Stock'],
      ['Product B', '$250', 'Low Stock'],
      ['Product C', '$75', 'Out of Stock'],
      ['Product D', '$300', 'In Stock'],
    ],
    headers: ['Product', 'Price', 'Status'],
    style: 'striped',
    alignment: 'left',
    fontSize: 'base',
  },
}

export const Bordered: Story = {
  args: {
    data: [
      ['Q1', '$50,000', '15%'],
      ['Q2', '$65,000', '30%'],
      ['Q3', '$75,000', '15%'],
      ['Q4', '$90,000', '20%'],
    ],
    headers: ['Quarter', 'Revenue', 'Growth'],
    style: 'bordered',
    alignment: 'center',
    fontSize: 'base',
  },
}

export const Minimal: Story = {
  args: {
    data: [
      ['Feature 1', 'Available'],
      ['Feature 2', 'Available'],
      ['Feature 3', 'Coming Soon'],
      ['Feature 4', 'Available'],
    ],
    headers: ['Feature', 'Status'],
    style: 'minimal',
    alignment: 'left',
    fontSize: 'base',
  },
}

export const NoHeaders: Story = {
  args: {
    data: [
      ['Apple', 'Fruit', 'Red'],
      ['Banana', 'Fruit', 'Yellow'],
      ['Carrot', 'Vegetable', 'Orange'],
      ['Spinach', 'Vegetable', 'Green'],
    ],
    style: 'default',
    alignment: 'left',
    fontSize: 'base',
  },
}

export const LargeData: Story = {
  args: {
    data: [
      ['John Doe', 'john@example.com', 'Developer', 'Active', '2023-01-15'],
      ['Jane Smith', 'jane@example.com', 'Designer', 'Active', '2023-02-20'],
      ['Bob Johnson', 'bob@example.com', 'Manager', 'Inactive', '2023-03-10'],
      ['Alice Brown', 'alice@example.com', 'Developer', 'Active', '2023-04-05'],
      ['Charlie Wilson', 'charlie@example.com', 'Designer', 'Active', '2023-05-12'],
    ],
    headers: ['Name', 'Email', 'Role', 'Status', 'Join Date'],
    style: 'striped',
    alignment: 'left',
    fontSize: 'sm',
  },
} 