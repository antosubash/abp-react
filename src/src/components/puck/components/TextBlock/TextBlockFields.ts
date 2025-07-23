export const TextBlockFields = {
  text: {
    type: 'textarea' as const,
    label: 'Text Content',
  },
  type: {
    type: 'select' as const,
    label: 'Text Type',
    options: [
      { label: 'Paragraph', value: 'paragraph' },
      { label: 'Heading', value: 'heading' },
      { label: 'Subheading', value: 'subheading' },
      { label: 'Quote', value: 'quote' },
    ],
  },
  alignment: {
    type: 'select' as const,
    label: 'Alignment',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
      { label: 'Justify', value: 'justify' },
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
  lineHeight: {
    type: 'select' as const,
    label: 'Line Height',
    options: [
      { label: 'Tight', value: 'tight' },
      { label: 'Normal', value: 'normal' },
      { label: 'Relaxed', value: 'relaxed' },
    ],
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
}
