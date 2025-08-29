import type { ComponentConfig } from '@measured/puck'
import { CarouselBlock } from './CarouselBlock'
import { CarouselBlockDefaults } from './CarouselBlockDefaults'
import { CarouselBlockFields } from './CarouselBlockFields'
import type { CarouselBlockProps } from './CarouselBlockProps'

export const CarouselBlockConfig: ComponentConfig<CarouselBlockProps> = {
  fields: CarouselBlockFields,
  defaultProps: CarouselBlockDefaults,
  render: CarouselBlock,
  label: 'Carousel',
}
