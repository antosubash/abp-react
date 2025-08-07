import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TestimonialBlock } from './TestimonialBlock'

const meta: Meta<typeof TestimonialBlock> = {
  title: 'Puck/TestimonialBlock',
  component: TestimonialBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    style: {
      control: { type: 'select' },
      options: ['default', 'card', 'minimal'],
    },
    rating: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    quote: 'This product has completely transformed our workflow. Highly recommended!',
    author: 'John Doe',
    position: 'CEO',
    company: 'Tech Corp',
    rating: 5,
    alignment: 'left',
    style: 'default',
  },
}

export const WithAvatar: Story = {
  args: {
    quote: 'The customer support is exceptional and the product quality is outstanding.',
    author: 'Sarah Johnson',
    position: 'Marketing Director',
    company: 'Innovation Inc',
    avatar: 'https://picsum.photos/48/48?random=1',
    rating: 5,
    alignment: 'center',
    style: 'card',
  },
}

export const Minimal: Story = {
  args: {
    quote: 'Simple, effective, and exactly what we needed.',
    author: 'Mike Chen',
    position: 'Developer',
    company: 'StartupXYZ',
    rating: 4,
    alignment: 'left',
    style: 'minimal',
  },
}

export const NoRating: Story = {
  args: {
    quote: 'A great experience working with this team.',
    author: 'Lisa Wang',
    position: 'Product Manager',
    company: 'Growth Co',
    rating: 0,
    alignment: 'right',
    style: 'default',
  },
}

export const LongQuote: Story = {
  args: {
    quote: 'This platform has revolutionized how we handle our daily operations. The intuitive interface, powerful features, and exceptional performance have made it an indispensable tool for our team. We\'ve seen a significant improvement in productivity and efficiency since implementing this solution.',
    author: 'David Rodriguez',
    position: 'Operations Manager',
    company: 'Enterprise Solutions',
    avatar: 'https://picsum.photos/48/48?random=2',
    rating: 5,
    alignment: 'left',
    style: 'card',
  },
} 