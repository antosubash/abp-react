import { TableBlock } from './TableBlock'
import { TableBlockDefaults } from './TableBlockDefaults'
import { TableBlockFields } from './TableBlockFields'

export const TableBlockConfig = {
  label: 'Table',
  fields: TableBlockFields,
  defaultProps: TableBlockDefaults,
  render: TableBlock,
} 