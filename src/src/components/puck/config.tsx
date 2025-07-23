import type { Config } from '@measured/puck'
import { CardBlockConfig } from './components/CardBlock/config'
import { HeadingBlockConfig } from './components/HeadingBlock/config'
import { HeroConfig } from './components/Hero/config'
import { ImageBlockConfig } from './components/ImageBlock/config'
import { TextBlockConfig } from './components/TextBlock/config'
import { WelcomeBlockConfig } from './components/WelcomeBlock/config'

// Import prop types from each component
import type { CardBlockProps } from './components/CardBlock/CardBlockProps'
import type { HeadingBlockProps } from './components/HeadingBlock/HeadingBlockProps'
import type { HeroProps } from './components/Hero/HeroProps'
import type { ImageBlockProps } from './components/ImageBlock/ImageBlockProps'
import type { TextBlockProps } from './components/TextBlock/TextBlockProps'
import type { WelcomeBlockProps } from './components/WelcomeBlock/WelcomeBlockProps'

type Props = {
  HeadingBlock: HeadingBlockProps
  TextBlock: TextBlockProps
  WelcomeBlock: WelcomeBlockProps
  Hero: HeroProps
  ImageBlock: ImageBlockProps
  CardBlock: CardBlockProps
}

export const config: Config<Props> = {
  components: {
    HeadingBlock: HeadingBlockConfig,
    TextBlock: TextBlockConfig,
    WelcomeBlock: WelcomeBlockConfig,
    Hero: HeroConfig,
    ImageBlock: ImageBlockConfig,
    CardBlock: CardBlockConfig,
  },
  categories: {
    content: {
      title: 'Content',
      components: ['TextBlock', 'HeadingBlock', 'WelcomeBlock'],
    },
    layout: {
      title: 'Layout',
      components: ['Hero', 'CardBlock'],
    },
    media: {
      title: 'Media',
      components: ['ImageBlock'],
    },
  },
}

export default config
