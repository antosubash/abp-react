export const VideoBlockFields = {
  src: {
    type: 'text' as const,
    label: 'Video URL or ID',
  },
  type: {
    type: 'select' as const,
    label: 'Video Type',
    options: [
      { label: 'Video File', value: 'video' },
      { label: 'YouTube', value: 'youtube' },
      { label: 'Vimeo', value: 'vimeo' },
    ],
  },
  width: {
    type: 'text' as const,
    label: 'Width (CSS value)',
  },
  height: {
    type: 'text' as const,
    label: 'Height (CSS value)',
  },
  alignment: {
    type: 'select' as const,
    label: 'Alignment',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  },
  autoplay: {
    type: 'radio' as const,
    label: 'Autoplay',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  controls: {
    type: 'radio' as const,
    label: 'Show Controls',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  loop: {
    type: 'radio' as const,
    label: 'Loop',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  muted: {
    type: 'radio' as const,
    label: 'Muted',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  poster: {
    type: 'text' as const,
    label: 'Poster Image URL',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
}
