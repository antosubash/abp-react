export const TestimonialBlockFields = {
  quote: {
    type: 'textarea' as const,
    label: 'Testimonial Quote',
  },
  author: {
    type: 'text' as const,
    label: 'Author Name',
  },
  position: {
    type: 'text' as const,
    label: 'Position/Title',
  },
  company: {
    type: 'text' as const,
    label: 'Company',
  },
  avatar: {
    type: 'text' as const,
    label: 'Avatar URL',
  },
  rating: {
    type: 'select' as const,
    label: 'Rating',
    options: [
      { label: 'No Rating', value: 0 },
      { label: '1 Star', value: 1 },
      { label: '2 Stars', value: 2 },
      { label: '3 Stars', value: 3 },
      { label: '4 Stars', value: 4 },
      { label: '5 Stars', value: 5 },
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
  style: {
    type: 'select' as const,
    label: 'Style',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Card', value: 'card' },
      { label: 'Minimal', value: 'minimal' },
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
} 