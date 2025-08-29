export const ButtonBlockFields = {
  text: {
    type: 'text' as const,
    label: 'Button Text',
  },
  variant: {
    type: 'select' as const,
    label: 'Variant',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
    ],
  },
  size: {
    type: 'select' as const,
    label: 'Size',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
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
  fullWidth: {
    type: 'radio' as const,
    label: 'Full Width',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  disabled: {
    type: 'radio' as const,
    label: 'Disabled',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  href: {
    type: 'text' as const,
    label: 'Link URL',
  },
  target: {
    type: 'select' as const,
    label: 'Link Target',
    options: [
      { label: 'Same Window', value: '_self' },
      { label: 'New Window', value: '_blank' },
      { label: 'Parent Frame', value: '_parent' },
      { label: 'Top Frame', value: '_top' },
    ],
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
}
