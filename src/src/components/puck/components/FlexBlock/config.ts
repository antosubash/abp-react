import { FlexBlock } from './FlexBlock'
import { FlexBlockDefaults } from './FlexBlockDefaults'
import { FlexBlockFields } from './FlexBlockFields'

export const FlexBlockConfig = {
  label: 'Flex Container',
  fields: FlexBlockFields,
  defaultProps: FlexBlockDefaults,
  render: FlexBlock,
} 