import { TextBlock } from './TextBlock'
import { TextBlockDefaults } from './TextBlockDefaults'
import { TextBlockFields } from './TextBlockFields'

export const TextBlockConfig = {
  label: 'Text',
  fields: TextBlockFields,
  defaultProps: TextBlockDefaults,
  render: TextBlock,
}
