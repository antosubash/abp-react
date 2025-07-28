import { DividerBlock } from './DividerBlock'
import { DividerBlockDefaults } from './DividerBlockDefaults'
import { DividerBlockFields } from './DividerBlockFields'

export const DividerBlockConfig = {
  label: 'Divider',
  fields: DividerBlockFields,
  defaultProps: DividerBlockDefaults,
  render: DividerBlock,
} 