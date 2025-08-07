export const ListBlockFields = {
  items: {
    type: 'textarea' as const,
    label: 'List Items (one item per line)',
  },
  type: {
    type: 'select' as const,
    label: 'List Type',
    options: [
      { label: 'Unordered (Bullets)', value: 'unordered' },
      { label: 'Ordered (Numbers)', value: 'ordered' },
      { label: 'Checklist', value: 'checklist' },
    ],
  },
  style: {
    type: 'select' as const,
    label: 'Style',
    options: [
      { label: 'Default', value: 'default' },
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
    ],
  },
  spacing: {
    type: 'select' as const,
    label: 'Spacing',
    options: [
      { label: 'Tight', value: 'tight' },
      { label: 'Normal', value: 'normal' },
      { label: 'Loose', value: 'loose' },
    ],
  },
  markerColor: {
    type: 'text' as const,
    label: 'Marker Color (hex or CSS color)',
  },
  textColor: {
    type: 'text' as const,
    label: 'Text Color (hex or CSS color)',
  },
  backgroundColor: {
    type: 'text' as const,
    label: 'Background Color (hex or CSS color)',
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