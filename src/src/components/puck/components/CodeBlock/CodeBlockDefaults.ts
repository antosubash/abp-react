export const CodeBlockDefaults = {
  code: 'console.log("Hello, World!");\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}',
  language: 'javascript',
  title: '',
  showLineNumbers: true,
  theme: 'vs-code' as const,
  fontSize: 'base' as const,
  maxHeight: '400px',
  padding: '16px',
  borderRadius: '6px',
  showCopyButton: true,
} 