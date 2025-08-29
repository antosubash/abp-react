import { GalleryBlock } from './GalleryBlock'
import { GalleryBlockDefaults } from './GalleryBlockDefaults'
import { GalleryBlockFields } from './GalleryBlockFields'

export const GalleryBlockConfig = {
  label: 'Gallery',
  fields: GalleryBlockFields,
  defaultProps: GalleryBlockDefaults,
  render: GalleryBlock,
}
