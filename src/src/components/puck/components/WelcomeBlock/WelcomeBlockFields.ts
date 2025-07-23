export const WelcomeBlockFields = {
  title: {
    type: 'text' as const,
    label: 'Title',
  },
  description: {
    type: 'textarea' as const,
    label: 'Description',
  },
  showTips: {
    type: 'select' as const,
    label: 'Show Tips',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
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
  textColor: {
    type: 'text' as const,
    label: 'Text Color (hex or CSS color)',
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
