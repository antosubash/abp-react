import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { action } from 'storybook/actions'
import { ButtonBlock } from './ButtonBlock'

const meta: Meta<typeof ButtonBlock> = {
  title: 'Puck/ButtonBlock',
  component: ButtonBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable button block component for the Puck visual page builder. Supports various styles, sizes, and configurations.',
      },
    },
  },
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'The text displayed on the button',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'The alignment of the button within its container',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the button should take full width of its container',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    href: {
      control: { type: 'text' },
      description: 'Optional URL to make the button a link',
    },
    target: {
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Target attribute for the link (if href is provided)',
    },
    padding: {
      control: { type: 'text' },
      description: 'CSS padding for the button container',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default button
export const Default: Story = {
  args: {
    text: 'Click me',
    variant: 'primary',
    size: 'medium',
    alignment: 'left',
  },
}

// All variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Primary</h3>
        <ButtonBlock text="Primary Button" variant="primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Secondary</h3>
        <ButtonBlock text="Secondary Button" variant="secondary" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Outline</h3>
        <ButtonBlock text="Outline Button" variant="outline" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Ghost</h3>
        <ButtonBlock text="Ghost Button" variant="ghost" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants with their distinct visual styles.',
      },
    },
  },
}

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <ButtonBlock text="Small Button" size="small" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <ButtonBlock text="Medium Button" size="medium" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <ButtonBlock text="Large Button" size="large" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes for various UI contexts.',
      },
    },
  },
}

// Alignments
export const Alignments: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Left Aligned</h3>
        <div className="border border-gray-200 p-4 rounded">
          <ButtonBlock text="Left Button" alignment="left" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Center Aligned</h3>
        <div className="border border-gray-200 p-4 rounded">
          <ButtonBlock text="Center Button" alignment="center" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Right Aligned</h3>
        <div className="border border-gray-200 p-4 rounded">
          <ButtonBlock text="Right Button" alignment="right" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different alignment options for positioning the button within its container.',
      },
    },
  },
}

// Full width
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Normal Width</h3>
        <ButtonBlock text="Normal Button" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Full Width</h3>
        <ButtonBlock text="Full Width Button" fullWidth />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between normal and full-width button layouts.',
      },
    },
  },
}

// Link button
export const LinkButton: Story = {
  args: {
    text: 'Visit Website',
    href: 'https://example.com',
    target: '_blank',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button configured as a link that opens in a new tab.',
      },
    },
  },
}

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Enabled</h3>
        <ButtonBlock text="Enabled Button" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Disabled</h3>
        <ButtonBlock text="Disabled Button" disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between enabled and disabled button states.',
      },
    },
  },
}

// Interactive example
export const Interactive: Story = {
  args: {
    text: 'Click me!',
    variant: 'primary',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive button example. Try clicking it to see the hover effects.',
      },
    },
  },
}

// Custom padding
export const CustomPadding: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Padding</h3>
        <ButtonBlock text="Default Padding" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Custom Padding (32px)</h3>
        <ButtonBlock text="Custom Padding" padding="32px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of different padding configurations for the button container.',
      },
    },
  },
}
