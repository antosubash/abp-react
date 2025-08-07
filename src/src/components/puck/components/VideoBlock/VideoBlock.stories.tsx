
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { VideoBlock } from './VideoBlock'

const meta: Meta<typeof VideoBlock> = {
  title: 'Puck/VideoBlock',
  component: VideoBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for embedding videos from various sources.',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'The source of the video (URL or ID).',
    },
    type: {
      control: { type: 'select' },
      options: ['video', 'youtube', 'vimeo'],
      description: 'The type of video source.',
    },
    width: {
      control: 'text',
      description: 'The width of the video player.',
    },
    height: {
      control: 'text',
      description: 'The height of the video player.',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'The alignment of the video player.',
    },
    autoplay: {
      control: 'boolean',
      description: 'Whether the video should autoplay.',
    },
    controls: {
      control: 'boolean',
      description: 'Whether to show video controls.',
    },
    loop: {
      control: 'boolean',
      description: 'Whether the video should loop.',
    },
    muted: {
      control: 'boolean',
      description: 'Whether the video should be muted.',
    },
    poster: {
      control: 'text',
      description: 'The URL of a poster image to show before the video plays.',
    },
    padding: {
      control: 'text',
      description: 'The padding of the video container.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultVideo: Story = {
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    type: 'video',
    width: '100%',
    height: '400px',
    alignment: 'center',
    controls: true,
  },
}

export const YouTube: Story = {
    args: {
      ...DefaultVideo.args,
      src: 'dQw4w9WgXcQ',
      type: 'youtube',
    },
  }
  
  export const Vimeo: Story = {
    args: {
      ...DefaultVideo.args,
      src: '148751763',
      type: 'vimeo',
    },
  }
  
  export const AutoplayMuted: Story = {
    args: {
      ...DefaultVideo.args,
      autoplay: true,
      muted: true,
    },
  }
