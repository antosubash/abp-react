import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Hero } from './Hero'

const meta: Meta<typeof Hero> = {
  title: 'Puck/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A powerful and versatile hero component for creating impactful headers.',
      },
    },
  },
  argTypes: {
    preset: {
      control: { type: 'select' },
      options: [
        'default',
        'modern-gradient',
        'dark-professional',
        'light-clean',
        'bold-bright',
        'minimal',
      ],
      description: 'The preset style of the hero section.',
    },
    title: {
      control: 'text',
      description: 'The main title of the hero section.',
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle of the hero section.',
    },
    backgroundColor: {
      control: 'color',
      description: 'The background color of the hero section.',
    },
    backgroundImage: {
      control: 'text',
      description: 'The URL of the background image.',
    },
    backgroundOverlay: {
      control: 'color',
      description: 'The color of the background overlay.',
    },
    textColor: {
      control: 'color',
      description: 'The text color of the hero section.',
    },
    showButton: {
      control: 'boolean',
      description: 'Whether to show the primary button.',
    },
    buttonText: {
      control: 'text',
      description: 'The text of the primary button.',
    },
    buttonLink: {
      control: 'text',
      description: 'The URL of the primary button.',
    },
    buttonStyle: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The style of the primary button.',
    },
    showSecondaryButton: {
      control: 'boolean',
      description: 'Whether to show the secondary button.',
    },
    secondaryButtonText: {
      control: 'text',
      description: 'The text of the secondary button.',
    },
    secondaryButtonLink: {
      control: 'text',
      description: 'The URL of the secondary button.',
    },
    secondaryButtonStyle: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The style of the secondary button.',
    },
    alignment: {
      control: { type: 'select' },
      options: ['center', 'left', 'right'],
      description: 'The alignment of the hero content.',
    },
    minHeight: {
      control: 'text',
      description: 'The minimum height of the hero section.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the hero section.',
    },
    titleSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xl'],
      description: 'The size of the title.',
    },
    subtitleSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the subtitle.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    preset: 'default',
    title: 'Welcome to our Website',
    subtitle: 'Discover amazing things and join our community.',
  },
}

export const ModernGradient: Story = {
  args: {
    ...Default.args,
    preset: 'modern-gradient',
    title: 'Modern & Vibrant',
    subtitle: 'A hero section with a beautiful gradient background.',
  },
}

export const DarkProfessional: Story = {
  args: {
    ...Default.args,
    preset: 'dark-professional',
    title: 'Professional & Sleek',
    subtitle: 'A dark and professional hero section for your business.',
  },
}

export const LightClean: Story = {
  args: {
    ...Default.args,
    preset: 'light-clean',
    title: 'Clean & Minimal',
    subtitle: 'A light and clean hero section for a modern look.',
  },
}

export const WithBackgroundImage: Story = {
  args: {
    ...Default.args,
    backgroundImage: 'https://picsum.photos/1920/1080',
  },
}
