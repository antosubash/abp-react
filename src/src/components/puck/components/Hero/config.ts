import { Hero } from './Hero'
import { HeroDefaults } from './HeroDefaults'
import { HeroFields } from './HeroFields'

export const HeroConfig = {
  label: 'Hero',
  fields: HeroFields,
  defaultProps: HeroDefaults,
  render: Hero,
}
