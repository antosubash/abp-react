export const CardBlockFields = {
  title: {
    type: 'text' as const,
    label: 'Title',
  },
  description: {
    type: 'textarea' as const,
    label: 'Description',
  },
  content: {
    type: 'textarea' as const,
    label: 'Content',
  },
  image: {
    type: 'text' as const,
    label: 'Image URL',
  },
  buttonText: {
    type: 'text' as const,
    label: 'Button Text',
  },
  buttonLink: {
    type: 'text' as const,
    label: 'Button Link',
  },
  variant: {
    type: 'select' as const,
    label: 'Variant',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Outline', value: 'outline' },
    ],
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
  backgroundColor: {
    type: 'text' as const,
    label: 'Background Color (hex or CSS color)',
  },
  borderColor: {
    type: 'text' as const,
    label: 'Border Color (hex or CSS color)',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
  borderRadius: {
    type: 'text' as const,
    label: 'Border Radius (CSS value)',
  },
}
