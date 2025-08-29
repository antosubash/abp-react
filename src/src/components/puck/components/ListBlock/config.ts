import { ListBlock } from './ListBlock'
import { ListBlockDefaults } from './ListBlockDefaults'
import { ListBlockFields } from './ListBlockFields'

export const ListBlockConfig = {
  label: 'List',
  fields: ListBlockFields,
  defaultProps: ListBlockDefaults,
  render: ListBlock,
}
