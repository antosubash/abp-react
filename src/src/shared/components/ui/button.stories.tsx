import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { action } from 'storybook/actions'
import { Button } from './button'
import { Download, Heart, Plus } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Built on top of Radix UI and styled with Tailwind CSS.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Whether to render as a child component using Radix Slot',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants. Each variant has a distinct visual style for different use cases.',
      },
    },
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes for various UI contexts. The icon size is perfect for square buttons with icons.',
      },
    },
  },
}

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Download />
        Download
      </Button>
      <Button variant="outline">
        <Heart />
        Like
      </Button>
      <Button variant="ghost" size="sm">
        <Plus />
        Add Item
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons. Icons are automatically sized and positioned correctly.',
      },
    },
  },
}

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states including normal and disabled states.',
      },
    },
  },
}

// Interactive example
export const Interactive: Story = {
  args: {
    children: 'Click me!',
    onClick: action('onClick'),
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive button example using explicit action function. The action will be logged in the Actions panel.',
      },
    },
  },
}

// As child example
export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Link Button
      </a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using the asChild prop to render the button as a different element (like a link).',
      },
    },
  },
}

// Full width
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Button className="w-full">Full Width Button</Button>
      <Button variant="outline" className="w-full">
        Full Width Outline
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-width buttons using the w-full utility class.',
      },
    },
  },
} 