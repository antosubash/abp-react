import { ImageBlock } from './ImageBlock'
import { ImageBlockDefaults } from './ImageBlockDefaults'
import { ImageBlockFields } from './ImageBlockFields'

export const ImageBlockConfig = {
  label: 'Image',
  fields: ImageBlockFields,
  defaultProps: ImageBlockDefaults,
  render: ImageBlock,
}
