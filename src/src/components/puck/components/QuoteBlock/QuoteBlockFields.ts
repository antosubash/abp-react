export const QuoteBlockFields = {
  quote: {
    type: 'textarea' as const,
    label: 'Quote Text',
  },
  author: {
    type: 'text' as const,
    label: 'Author',
  },
  source: {
    type: 'text' as const,
    label: 'Source (e.g., book, speech, etc.)',
  },
  style: {
    type: 'select' as const,
    label: 'Style',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Large', value: 'large' },
      { label: 'Minimal', value: 'minimal' },
      { label: 'Bordered', value: 'bordered' },
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
    ],
  },
  color: {
    type: 'text' as const,
    label: 'Text Color (hex or CSS color)',
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
  maxWidth: {
    type: 'select' as const,
    label: 'Max Width',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: 'Full', value: 'full' },
    ],
  },
}
