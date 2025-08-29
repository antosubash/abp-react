export const GridBlockFields = {
  items: {
    type: 'slot' as const,
  },
  columns: {
    type: 'text' as const,
    label: 'Grid Columns (e.g., "1fr 1fr" or "repeat(3, 1fr)")',
  },
  rows: {
    type: 'text' as const,
    label: 'Grid Rows (e.g., "auto" or "repeat(2, 200px)")',
  },
  gap: {
    type: 'text' as const,
    label: 'Gap (CSS value)',
  },
  justify: {
    type: 'select' as const,
    label: 'Justify Content',
    options: [
      { label: 'Start', value: 'start' },
      { label: 'End', value: 'end' },
      { label: 'Center', value: 'center' },
      { label: 'Stretch', value: 'stretch' },
      { label: 'Space Around', value: 'space-around' },
      { label: 'Space Between', value: 'space-between' },
      { label: 'Space Evenly', value: 'space-evenly' },
    ],
  },
  align: {
    type: 'select' as const,
    label: 'Align Items',
    options: [
      { label: 'Start', value: 'start' },
      { label: 'End', value: 'end' },
      { label: 'Center', value: 'center' },
      { label: 'Stretch', value: 'stretch' },
      { label: 'Baseline', value: 'baseline' },
    ],
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
