export const ContainerBlockFields = {
  maxWidth: {
    type: 'text' as const,
    label: 'Max Width (CSS value)',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
  backgroundColor: {
    type: 'text' as const,
    label: 'Background Color (hex or CSS color)',
  },
  borderColor: {
    type: 'text' as const,
    label: 'Border Color (hex or CSS color)',
  },
  borderRadius: {
    type: 'text' as const,
    label: 'Border Radius (CSS value)',
  },
  borderWidth: {
    type: 'text' as const,
    label: 'Border Width (CSS value)',
  },
  margin: {
    type: 'text' as const,
    label: 'Margin (CSS value)',
  },
  alignment: {
    type: 'select' as const,
    label: 'Content Alignment',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  },
  shadow: {
    type: 'select' as const,
    label: 'Shadow',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
    ],
  },
  items: {
    type: 'slot' as const,
  },
}
