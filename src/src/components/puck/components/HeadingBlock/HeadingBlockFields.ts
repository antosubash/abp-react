export const HeadingBlockFields = {
  title: {
    type: 'text' as const,
    label: 'Heading Text',
  },
  level: {
    type: 'select' as const,
    label: 'Heading Level',
    options: [
      { label: 'H1', value: 'h1' },
      { label: 'H2', value: 'h2' },
      { label: 'H3', value: 'h3' },
      { label: 'H4', value: 'h4' },
      { label: 'H5', value: 'h5' },
      { label: 'H6', value: 'h6' },
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
  fontSize: {
    type: 'select' as const,
    label: 'Font Size',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Base', value: 'base' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: '2XL', value: '2xl' },
      { label: '3XL', value: '3xl' },
      { label: '4XL', value: '4xl' },
      { label: '5XL', value: '5xl' },
    ],
  },
  fontWeight: {
    type: 'select' as const,
    label: 'Font Weight',
    options: [
      { label: 'Normal', value: 'normal' },
      { label: 'Medium', value: 'medium' },
      { label: 'Semibold', value: 'semibold' },
      { label: 'Bold', value: 'bold' },
      { label: 'Extrabold', value: 'extrabold' },
    ],
  },
  color: {
    type: 'text' as const,
    label: 'Text Color (hex or CSS color)',
  },
  margin: {
    type: 'text' as const,
    label: 'Margin (CSS value)',
  },
}
