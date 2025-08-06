import type { Config } from '@measured/puck'
import { ButtonBlockConfig } from './components/ButtonBlock/config'
import { CardBlockConfig } from './components/CardBlock/config'
import { CodeBlockConfig } from './components/CodeBlock/config'
import { ContainerBlockConfig } from './components/ContainerBlock/config'
import { DividerBlockConfig } from './components/DividerBlock/config'
import { FlexBlockConfig } from './components/FlexBlock/config'
import { GridBlockConfig } from './components/GridBlock/config'
import { HeadingBlockConfig } from './components/HeadingBlock/config'
import { HeroConfig } from './components/Hero/config'
import { ImageBlockConfig } from './components/ImageBlock/config'
import { ListBlockConfig } from './components/ListBlock/config'
import { QuoteBlockConfig } from './components/QuoteBlock/config'
import { SpacerBlockConfig } from './components/SpacerBlock/config'
import { TableBlockConfig } from './components/TableBlock/config'
import { TestimonialBlockConfig } from './components/TestimonialBlock/config'
import { TextBlockConfig } from './components/TextBlock/config'
import { VideoBlockConfig } from './components/VideoBlock/config'
import { WelcomeBlockConfig } from './components/WelcomeBlock/config'
import { GalleryBlockConfig } from './components/GalleryBlock/config'
import { CarouselBlockConfig } from './components/CarouselBlock/config'



// Import prop types from each component
import type { ButtonBlockProps } from './components/ButtonBlock/ButtonBlockProps'
import type { CardBlockProps } from './components/CardBlock/CardBlockProps'
import type { CodeBlockProps } from './components/CodeBlock/CodeBlockProps'
import type { ContainerBlockProps } from './components/ContainerBlock/ContainerBlockProps'
import type { DividerBlockProps } from './components/DividerBlock/DividerBlockProps'
import type { FlexBlockProps } from './components/FlexBlock/FlexBlockProps'
import type { GridBlockProps } from './components/GridBlock/GridBlockProps'
import type { HeadingBlockProps } from './components/HeadingBlock/HeadingBlockProps'
import type { HeroProps } from './components/Hero/HeroProps'
import type { ImageBlockProps } from './components/ImageBlock/ImageBlockProps'
import type { ListBlockProps } from './components/ListBlock/ListBlockProps'
import type { QuoteBlockProps } from './components/QuoteBlock/QuoteBlockProps'
import type { SpacerBlockProps } from './components/SpacerBlock/SpacerBlockProps'
import type { TableBlockProps } from './components/TableBlock/TableBlockProps'
import type { TestimonialBlockProps } from './components/TestimonialBlock/TestimonialBlockProps'
import type { TextBlockProps } from './components/TextBlock/TextBlockProps'
import type { VideoBlockProps } from './components/VideoBlock/VideoBlockProps'
import type { WelcomeBlockProps } from './components/WelcomeBlock/WelcomeBlockProps'
import type { GalleryBlockProps } from './components/GalleryBlock/GalleryBlockProps'
import type { CarouselBlockProps } from './components/CarouselBlock/CarouselBlockProps'

type Props = {
  HeadingBlock: HeadingBlockProps
  TextBlock: TextBlockProps
  WelcomeBlock: WelcomeBlockProps
  Hero: HeroProps
  ImageBlock: ImageBlockProps
  CardBlock: CardBlockProps
  ButtonBlock: ButtonBlockProps
  CodeBlock: CodeBlockProps
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
    CodeBlock: CodeBlockConfig,
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
      components: ['TextBlock', 'HeadingBlock', 'WelcomeBlock', 'QuoteBlock', 'ListBlock', 'CodeBlock'],
    },
    layout: {
      title: 'Layout',
      components: ['Hero', 'CardBlock', 'ContainerBlock', 'FlexBlock', 'GridBlock', 'SpacerBlock', 'TableBlock'],
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
