export const ImageBlockFields = {
  src: {
    type: 'text' as const,
    label: 'Image URL',
  },
  alt: {
    type: 'text' as const,
    label: 'Alt Text',
  },
  width: {
    type: 'number' as const,
    label: 'Width (px)',
  },
  height: {
    type: 'number' as const,
    label: 'Height (px)',
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
  rounded: {
    type: 'select' as const,
    label: 'Rounded Corners',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  shadow: {
    type: 'select' as const,
    label: 'Shadow',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  maxWidth: {
    type: 'text' as const,
    label: 'Max Width (CSS value)',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
}
