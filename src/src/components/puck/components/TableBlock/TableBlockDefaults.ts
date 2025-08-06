export const TableBlockDefaults = {
  data: [
    ['John Doe', 'john@example.com', 'Developer'],
    ['Jane Smith', 'jane@example.com', 'Designer'],
    ['Bob Johnson', 'bob@example.com', 'Manager'],
  ],
  headers: ['Name', 'Email', 'Role'],
  style: 'default' as const,
  alignment: 'left' as const,
  fontSize: 'base' as const,
  maxWidth: 'full' as const,
  padding: '12px',
  borderColor: '#e5e7eb',
  headerBackgroundColor: '#f9fafb',
  headerTextColor: '#374151',
  rowBackgroundColor: '#ffffff',
  rowTextColor: '#374151',
  stripedRowColor: '#f9fafb',
} 