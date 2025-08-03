export const FlexBlockFields = {
  items: {
    type: 'slot' as const,
  },
  direction: {
    type: 'select' as const,
    label: 'Direction',
    options: [
      { label: 'Row', value: 'row' },
      { label: 'Row Reverse', value: 'row-reverse' },
      { label: 'Column', value: 'column' },
      { label: 'Column Reverse', value: 'column-reverse' },
    ],
  },
  justify: {
    type: 'select' as const,
    label: 'Justify Content',
    options: [
      { label: 'Start', value: 'flex-start' },
      { label: 'End', value: 'flex-end' },
      { label: 'Center', value: 'center' },
      { label: 'Space Between', value: 'space-between' },
      { label: 'Space Around', value: 'space-around' },
      { label: 'Space Evenly', value: 'space-evenly' },
    ],
  },
  align: {
    type: 'select' as const,
    label: 'Align Items',
    options: [
      { label: 'Stretch', value: 'stretch' },
      { label: 'Start', value: 'flex-start' },
      { label: 'End', value: 'flex-end' },
      { label: 'Center', value: 'center' },
      { label: 'Baseline', value: 'baseline' },
    ],
  },
  wrap: {
    type: 'select' as const,
    label: 'Flex Wrap',
    options: [
      { label: 'No Wrap', value: 'nowrap' },
      { label: 'Wrap', value: 'wrap' },
      { label: 'Wrap Reverse', value: 'wrap-reverse' },
    ],
  },
  gap: {
    type: 'text' as const,
    label: 'Gap (CSS value)',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
  backgroundColor: {
    type: 'text' as const,
    label: 'Background Color (hex or CSS color)',
  },
  minHeight: {
    type: 'text' as const,
    label: 'Min Height (CSS value)',
  },
  width: {
    type: 'text' as const,
    label: 'Width (CSS value)',
  },
} 