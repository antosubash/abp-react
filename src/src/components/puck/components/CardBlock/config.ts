import { CardBlock } from './CardBlock'
import { CardBlockDefaults } from './CardBlockDefaults'
import { CardBlockFields } from './CardBlockFields'

export const CardBlockConfig = {
  label: 'Card',
  fields: CardBlockFields,
  defaultProps: CardBlockDefaults,
  render: CardBlock,
}
