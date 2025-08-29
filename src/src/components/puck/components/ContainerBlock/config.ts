import { ContainerBlock } from './ContainerBlock'
import { ContainerBlockDefaults } from './ContainerBlockDefaults'
import { ContainerBlockFields } from './ContainerBlockFields'

export const ContainerBlockConfig = {
  label: 'Container',
  fields: ContainerBlockFields,
  defaultProps: ContainerBlockDefaults,
  render: ContainerBlock,
}
