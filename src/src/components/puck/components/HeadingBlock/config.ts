import { HeadingBlock } from './HeadingBlock'
import { HeadingBlockDefaults } from './HeadingBlockDefaults'
import { HeadingBlockFields } from './HeadingBlockFields'

export const HeadingBlockConfig = {
  label: 'Heading',
  fields: HeadingBlockFields,
  defaultProps: HeadingBlockDefaults,
  render: HeadingBlock,
}
