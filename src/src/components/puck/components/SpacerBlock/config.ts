import { SpacerBlock } from './SpacerBlock'
import { SpacerBlockDefaults } from './SpacerBlockDefaults'
import { SpacerBlockFields } from './SpacerBlockFields'

export const SpacerBlockConfig = {
  label: 'Spacer',
  fields: SpacerBlockFields,
  defaultProps: SpacerBlockDefaults,
  render: SpacerBlock,
}
