import { ButtonBlock } from './ButtonBlock'
import { ButtonBlockDefaults } from './ButtonBlockDefaults'
import { ButtonBlockFields } from './ButtonBlockFields'

export const ButtonBlockConfig = {
  label: 'Button',
  fields: ButtonBlockFields,
  defaultProps: ButtonBlockDefaults,
  render: ButtonBlock,
}
