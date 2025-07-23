export const HeroFields = {
  title: {
    type: 'text' as const,
    label: 'Title',
  },
  subtitle: {
    type: 'text' as const,
    label: 'Subtitle',
  },
  backgroundColor: {
    type: 'text' as const,
    label: 'Background Color (hex or CSS color)',
  },
  textColor: {
    type: 'text' as const,
    label: 'Text Color (hex or CSS color)',
  },
  showButton: {
    type: 'select' as const,
    label: 'Show Button',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  buttonText: {
    type: 'text' as const,
    label: 'Button Text',
  },
  buttonLink: {
    type: 'text' as const,
    label: 'Button Link',
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
  minHeight: {
    type: 'text' as const,
    label: 'Minimum Height (CSS value)',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
}
