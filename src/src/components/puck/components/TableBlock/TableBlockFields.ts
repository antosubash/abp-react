export const TableBlockFields = {
  data: {
    type: 'textarea' as const,
    label: 'Table Data (CSV format - comma separated values, new lines for rows)',
  },
  headers: {
    type: 'text' as const,
    label: 'Headers (comma separated)',
  },
  style: {
    type: 'select' as const,
    label: 'Table Style',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Striped', value: 'striped' },
      { label: 'Bordered', value: 'bordered' },
      { label: 'Minimal', value: 'minimal' },
    ],
  },
  alignment: {
    type: 'select' as const,
    label: 'Text Alignment',
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
  padding: {
    type: 'text' as const,
    label: 'Cell Padding (CSS value)',
  },
  borderColor: {
    type: 'text' as const,
    label: 'Border Color (hex or CSS color)',
  },
  headerBackgroundColor: {
    type: 'text' as const,
    label: 'Header Background Color (hex or CSS color)',
  },
  headerTextColor: {
    type: 'text' as const,
    label: 'Header Text Color (hex or CSS color)',
  },
  rowBackgroundColor: {
    type: 'text' as const,
    label: 'Row Background Color (hex or CSS color)',
  },
  rowTextColor: {
    type: 'text' as const,
    label: 'Row Text Color (hex or CSS color)',
  },
  stripedRowColor: {
    type: 'text' as const,
    label: 'Striped Row Color (hex or CSS color)',
  },
}
