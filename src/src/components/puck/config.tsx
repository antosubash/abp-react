import type { Config } from '@measured/puck'
import { ButtonBlockConfig } from './components/ButtonBlock/config'
import { CardBlockConfig } from './components/CardBlock/config'
import { ContainerBlockConfig } from './components/ContainerBlock/config'
import { DividerBlockConfig } from './components/DividerBlock/config'
import { FlexBlockConfig } from './components/FlexBlock/config'
import { GridBlockConfig } from './components/GridBlock/config'
import { HeadingBlockConfig } from './components/HeadingBlock/config'
import { HeroConfig } from './components/Hero/config'
import { ImageBlockConfig } from './components/ImageBlock/config'
import { SpacerBlockConfig } from './components/SpacerBlock/config'
import { TextBlockConfig } from './components/TextBlock/config'
import { VideoBlockConfig } from './components/VideoBlock/config'
import { WelcomeBlockConfig } from './components/WelcomeBlock/config'

// Import prop types from each component
import type { ButtonBlockProps } from './components/ButtonBlock/ButtonBlockProps'
import type { CardBlockProps } from './components/CardBlock/CardBlockProps'
import type { ContainerBlockProps } from './components/ContainerBlock/ContainerBlockProps'
import type { DividerBlockProps } from './components/DividerBlock/DividerBlockProps'
import type { FlexBlockProps } from './components/FlexBlock/FlexBlockProps'
import type { GridBlockProps } from './components/GridBlock/GridBlockProps'
import type { HeadingBlockProps } from './components/HeadingBlock/HeadingBlockProps'
import type { HeroProps } from './components/Hero/HeroProps'
import type { ImageBlockProps } from './components/ImageBlock/ImageBlockProps'
import type { SpacerBlockProps } from './components/SpacerBlock/SpacerBlockProps'
import type { TextBlockProps } from './components/TextBlock/TextBlockProps'
import type { VideoBlockProps } from './components/VideoBlock/VideoBlockProps'
import type { WelcomeBlockProps } from './components/WelcomeBlock/WelcomeBlockProps'

type Props = {
  HeadingBlock: HeadingBlockProps
  TextBlock: TextBlockProps
  WelcomeBlock: WelcomeBlockProps
  Hero: HeroProps
  ImageBlock: ImageBlockProps
  CardBlock: CardBlockProps
  ButtonBlock: ButtonBlockProps
  ContainerBlock: ContainerBlockProps
  DividerBlock: DividerBlockProps
  FlexBlock: FlexBlockProps
  GridBlock: GridBlockProps
  SpacerBlock: SpacerBlockProps
  VideoBlock: VideoBlockProps
}

export const config: Config<Props> = {
  components: {
    HeadingBlock: HeadingBlockConfig,
    TextBlock: TextBlockConfig,
    WelcomeBlock: WelcomeBlockConfig,
    Hero: HeroConfig,
    ImageBlock: ImageBlockConfig,
    CardBlock: CardBlockConfig,
    ButtonBlock: ButtonBlockConfig,
    ContainerBlock: ContainerBlockConfig,
    DividerBlock: DividerBlockConfig,
    FlexBlock: FlexBlockConfig,
    GridBlock: GridBlockConfig,
    SpacerBlock: SpacerBlockConfig,
    VideoBlock: VideoBlockConfig,
  },
  categories: {
    content: {
      title: 'Content',
      components: ['TextBlock', 'HeadingBlock', 'WelcomeBlock'],
    },
    layout: {
      title: 'Layout',
      components: ['Hero', 'CardBlock', 'ContainerBlock', 'FlexBlock', 'GridBlock', 'SpacerBlock'],
    },
    media: {
      title: 'Media',
      components: ['ImageBlock', 'VideoBlock'],
    },
    interactive: {
      title: 'Interactive',
      components: ['ButtonBlock'],
    },
    utilities: {
      title: 'Utilities',
      components: ['DividerBlock'],
    },
  },
}

export default config
