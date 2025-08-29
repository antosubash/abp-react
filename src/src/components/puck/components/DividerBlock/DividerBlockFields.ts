export const DividerBlockFields = {
  style: {
    type: 'select' as const,
    label: 'Divider Style',
    options: [
      { label: 'Solid', value: 'solid' },
      { label: 'Dashed', value: 'dashed' },
      { label: 'Dotted', value: 'dotted' },
      { label: 'Double', value: 'double' },
    ],
  },
  color: {
    type: 'text' as const,
    label: 'Color (hex or CSS color)',
  },
  width: {
    type: 'text' as const,
    label: 'Width (CSS value)',
  },
  height: {
    type: 'text' as const,
    label: 'Height (CSS value)',
  },
  margin: {
    type: 'text' as const,
    label: 'Margin (CSS value)',
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
}
