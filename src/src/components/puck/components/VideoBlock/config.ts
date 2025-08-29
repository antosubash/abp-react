import { VideoBlock } from './VideoBlock'
import { VideoBlockDefaults } from './VideoBlockDefaults'
import { VideoBlockFields } from './VideoBlockFields'

export const VideoBlockConfig = {
  label: 'Video',
  fields: VideoBlockFields,
  defaultProps: VideoBlockDefaults,
  render: VideoBlock,
}
