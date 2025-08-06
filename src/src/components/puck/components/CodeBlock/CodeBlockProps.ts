export interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  theme?: 'light' | 'dark' | 'github' | 'vs-code'
  fontSize?: 'sm' | 'base' | 'lg'
  maxHeight?: string
  padding?: string
  borderRadius?: string
  showCopyButton?: boolean
} 