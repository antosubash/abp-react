import React from 'react'

interface CustomFieldProps {
  value: boolean | undefined
  onChange: (value: boolean) => void
}

export const CodeBlockFields = {
  code: {
    type: 'textarea' as const,
    label: 'Code Content',
  },
  language: {
    type: 'select' as const,
    label: 'Programming Language',
    options: [
      { label: 'JavaScript', value: 'javascript' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' },
      { label: 'C++', value: 'cpp' },
      { label: 'C#', value: 'csharp' },
      { label: 'PHP', value: 'php' },
      { label: 'Ruby', value: 'ruby' },
      { label: 'Go', value: 'go' },
      { label: 'Rust', value: 'rust' },
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
      { label: 'SQL', value: 'sql' },
      { label: 'JSON', value: 'json' },
      { label: 'YAML', value: 'yaml' },
      { label: 'Markdown', value: 'markdown' },
      { label: 'Shell', value: 'bash' },
      { label: 'Plain Text', value: 'text' },
    ],
  },
  title: {
    type: 'text' as const,
    label: 'Code Block Title',
  },
  showLineNumbers: {
    type: 'custom' as const,
    label: 'Show Line Numbers',
    render: ({ value, onChange }: CustomFieldProps) => (
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
        />
        Show Line Numbers
      </label>
    ),
  },
  theme: {
    type: 'select' as const,
    label: 'Theme',
    options: [
      { label: 'VS Code', value: 'vs-code' },
      { label: 'GitHub', value: 'github' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
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
  maxHeight: {
    type: 'text' as const,
    label: 'Max Height (CSS value)',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
  borderRadius: {
    type: 'text' as const,
    label: 'Border Radius (CSS value)',
  },
  showCopyButton: {
    type: 'custom' as const,
    label: 'Show Copy Button',
    render: ({ value, onChange }: CustomFieldProps) => (
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
        />
        Show Copy Button
      </label>
    ),
  },
} 