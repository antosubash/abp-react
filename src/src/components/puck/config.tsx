import type { Config } from '@measured/puck'
// Import prop types from each component
import type { ButtonBlockProps } from './components/ButtonBlock/ButtonBlockProps'
import { ButtonBlockConfig } from './components/ButtonBlock/config'
import type { CardBlockProps } from './components/CardBlock/CardBlockProps'
import { CardBlockConfig } from './components/CardBlock/config'
import type { CarouselBlockProps } from './components/CarouselBlock/CarouselBlockProps'
import { CarouselBlockConfig } from './components/CarouselBlock/config'
import type { ContainerBlockProps } from './components/ContainerBlock/ContainerBlockProps'
import { ContainerBlockConfig } from './components/ContainerBlock/config'
import { DividerBlockConfig } from './components/DividerBlock/config'
import type { DividerBlockProps } from './components/DividerBlock/DividerBlockProps'
import { FlexBlockConfig } from './components/FlexBlock/config'
import type { FlexBlockProps } from './components/FlexBlock/FlexBlockProps'
import { GalleryBlockConfig } from './components/GalleryBlock/config'
import type { GalleryBlockProps } from './components/GalleryBlock/GalleryBlockProps'
import { GridBlockConfig } from './components/GridBlock/config'
import type { GridBlockProps } from './components/GridBlock/GridBlockProps'
import { HeadingBlockConfig } from './components/HeadingBlock/config'
import type { HeadingBlockProps } from './components/HeadingBlock/HeadingBlockProps'
import { HeroConfig } from './components/Hero/config'
import type { HeroProps } from './components/Hero/HeroProps'
import { ImageBlockConfig } from './components/ImageBlock/config'
import type { ImageBlockProps } from './components/ImageBlock/ImageBlockProps'
import { ListBlockConfig } from './components/ListBlock/config'
import type { ListBlockProps } from './components/ListBlock/ListBlockProps'
import { QuoteBlockConfig } from './components/QuoteBlock/config'
import type { QuoteBlockProps } from './components/QuoteBlock/QuoteBlockProps'
import { SpacerBlockConfig } from './components/SpacerBlock/config'
import type { SpacerBlockProps } from './components/SpacerBlock/SpacerBlockProps'
import { TableBlockConfig } from './components/TableBlock/config'
import type { TableBlockProps } from './components/TableBlock/TableBlockProps'
import { TestimonialBlockConfig } from './components/TestimonialBlock/config'
import type { TestimonialBlockProps } from './components/TestimonialBlock/TestimonialBlockProps'
import { TextBlockConfig } from './components/TextBlock/config'
import type { TextBlockProps } from './components/TextBlock/TextBlockProps'
import { VideoBlockConfig } from './components/VideoBlock/config'
import type { VideoBlockProps } from './components/VideoBlock/VideoBlockProps'
import { WelcomeBlockConfig } from './components/WelcomeBlock/config'
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
  ListBlock: ListBlockProps
  QuoteBlock: QuoteBlockProps
  SpacerBlock: SpacerBlockProps
  TableBlock: TableBlockProps
  TestimonialBlock: TestimonialBlockProps
  VideoBlock: VideoBlockProps
  GalleryBlock: GalleryBlockProps
  CarouselBlock: CarouselBlockProps
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
    ListBlock: ListBlockConfig,
    QuoteBlock: QuoteBlockConfig,
    SpacerBlock: SpacerBlockConfig,
    TableBlock: TableBlockConfig,
    TestimonialBlock: TestimonialBlockConfig,
    VideoBlock: VideoBlockConfig,
    GalleryBlock: GalleryBlockConfig,
    CarouselBlock: CarouselBlockConfig,
  },
  categories: {
    content: {
      title: 'Content',
      components: ['TextBlock', 'HeadingBlock', 'WelcomeBlock', 'QuoteBlock', 'ListBlock'],
    },
    layout: {
      title: 'Layout',
      components: [
        'Hero',
        'CardBlock',
        'ContainerBlock',
        'FlexBlock',
        'GridBlock',
        'SpacerBlock',
        'TableBlock',
      ],
    },
    media: {
      title: 'Media',
      components: ['ImageBlock', 'VideoBlock', 'GalleryBlock', 'CarouselBlock'],
    },
    interactive: {
      title: 'Interactive',
      components: ['ButtonBlock'],
    },
    social: {
      title: 'Social',
      components: ['TestimonialBlock'],
    },
    utilities: {
      title: 'Utilities',
      components: ['DividerBlock'],
    },
  },
}

export default config
