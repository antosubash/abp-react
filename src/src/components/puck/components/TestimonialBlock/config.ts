import { TestimonialBlock } from './TestimonialBlock'
import { TestimonialBlockDefaults } from './TestimonialBlockDefaults'
import { TestimonialBlockFields } from './TestimonialBlockFields'

export const TestimonialBlockConfig = {
  label: 'Testimonial',
  fields: TestimonialBlockFields,
  defaultProps: TestimonialBlockDefaults,
  render: TestimonialBlock,
}
