import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Lock, Mail, Phone, Search, User } from 'lucide-react'
import { action } from 'storybook/actions'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible input component with consistent styling and accessibility features. Supports all HTML input types and includes proper focus states.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'file'],
      description: 'The type of input field',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required',
    },
    'aria-invalid': {
      control: { type: 'select' },
      options: ['true', 'false'],
      description: 'Accessibility attribute for invalid state',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default input
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

// Input types
export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="text-input">Text Input</Label>
        <Input id="text-input" type="text" placeholder="Enter text..." />
      </div>
      <div>
        <Label htmlFor="email-input">Email Input</Label>
        <Input id="email-input" type="email" placeholder="Enter email..." />
      </div>
      <div>
        <Label htmlFor="password-input">Password Input</Label>
        <Input id="password-input" type="password" placeholder="Enter password..." />
      </div>
      <div>
        <Label htmlFor="number-input">Number Input</Label>
        <Input id="number-input" type="number" placeholder="Enter number..." />
      </div>
      <div>
        <Label htmlFor="tel-input">Phone Input</Label>
        <Input id="tel-input" type="tel" placeholder="Enter phone number..." />
      </div>
      <div>
        <Label htmlFor="url-input">URL Input</Label>
        <Input id="url-input" type="url" placeholder="Enter URL..." />
      </div>
      <div>
        <Label htmlFor="search-input">Search Input</Label>
        <Input id="search-input" type="search" placeholder="Search..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input types with appropriate labels and placeholders.',
      },
    },
  },
}

// Input with icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input className="pl-10" placeholder="Search..." />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input className="pl-10" type="email" placeholder="Enter email..." />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input className="pl-10" type="password" placeholder="Enter password..." />
      </div>
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input className="pl-10" placeholder="Enter username..." />
      </div>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input className="pl-10" type="tel" placeholder="Enter phone number..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input fields with icons positioned on the left side.',
      },
    },
  },
}

// Input states
export const States: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="normal">Normal</Label>
        <Input id="normal" placeholder="Normal input..." />
      </div>
      <div>
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" placeholder="Disabled input..." disabled />
      </div>
      <div>
        <Label htmlFor="required">Required</Label>
        <Input id="required" placeholder="Required input..." required />
      </div>
      <div>
        <Label htmlFor="invalid">Invalid</Label>
        <Input
          id="invalid"
          placeholder="Invalid input..."
          aria-invalid="true"
          defaultValue="Invalid value"
        />
      </div>
      <div>
        <Label htmlFor="readonly">Read Only</Label>
        <Input
          id="readonly"
          placeholder="Read only input..."
          readOnly
          defaultValue="Read only value"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different input states including normal, disabled, required, invalid, and read-only.',
      },
    },
  },
}

// Form example
export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Enter your full name" required />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter your email" required />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="Enter your phone number" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter your password" required />
      </div>
      <Button className="w-full">Submit</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A complete form example showing how inputs work together with labels and buttons.',
      },
    },
  },
}

// File input
export const FileInput: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="file">Upload File</Label>
        <Input id="file" type="file" />
      </div>
      <div>
        <Label htmlFor="image">Upload Image</Label>
        <Input id="image" type="file" accept="image/*" />
      </div>
      <div>
        <Label htmlFor="document">Upload Document</Label>
        <Input id="document" type="file" accept=".pdf,.doc,.docx" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'File input examples with different accept attributes.',
      },
    },
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="small">Small Input</Label>
        <Input id="small" className="h-8 text-sm" placeholder="Small input..." />
      </div>
      <div>
        <Label htmlFor="default">Default Input</Label>
        <Input id="default" placeholder="Default input..." />
      </div>
      <div>
        <Label htmlFor="large">Large Input</Label>
        <Input id="large" className="h-12 text-lg" placeholder="Large input..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input sizes using custom height and text size classes.',
      },
    },
  },
}

// Interactive example
export const Interactive: Story = {
  args: {
    placeholder: 'Type something...',
    onChange: action('onChange'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive input example with explicit action functions. Try typing, focusing, and interacting with it. Actions will be logged in the Actions panel.',
      },
    },
  },
}
