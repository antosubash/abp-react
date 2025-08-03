import { GridBlock } from './GridBlock'
import { GridBlockDefaults } from './GridBlockDefaults'
import { GridBlockFields } from './GridBlockFields'

export const GridBlockConfig = {
  label: 'Grid Container',
  fields: GridBlockFields,
  defaultProps: GridBlockDefaults,
  render: GridBlock,
} 