import { CodeBlock } from './CodeBlock'
import { CodeBlockDefaults } from './CodeBlockDefaults'
import { CodeBlockFields } from './CodeBlockFields'

export const CodeBlockConfig = {
  label: 'Code',
  fields: CodeBlockFields,
  defaultProps: CodeBlockDefaults,
  render: CodeBlock,
} 