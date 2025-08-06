'use client'

import { useState } from 'react'
import { CodeBlockProps } from './CodeBlockProps'

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

export const CodeBlock = ({
  code,
  language = 'javascript',
  title,
  showLineNumbers = true,
  theme = 'vs-code',
  fontSize = 'base',
  maxHeight = '400px',
  padding = '16px',
  borderRadius = '6px',
  showCopyButton = true,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const fontSizeMap = {
    sm: '12px',
    base: '14px',
    lg: '16px',
  }

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          border: '1px solid #404040',
        }
      case 'github':
        return {
          backgroundColor: '#f6f8fa',
          color: '#24292e',
          border: '1px solid #e1e4e8',
        }
      case 'light':
        return {
          backgroundColor: '#ffffff',
          color: '#333333',
          border: '1px solid #e5e5e5',
        }
      default: // vs-code
        return {
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          border: '1px solid #404040',
        }
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const formatCode = (code: string) => {
    const lines = code.split('\n')
    return lines.map((line, index) => (
      <div key={index} style={{ display: 'flex' }}>
        {showLineNumbers && (
          <span
            style={{
              color: '#6a737d',
              paddingRight: '12px',
              userSelect: 'none',
              minWidth: '40px',
              textAlign: 'right',
            }}
          >
            {index + 1}
          </span>
        )}
        <span>{line || ' '}</span>
      </div>
    ))
  }

  const themeStyles = getThemeStyles()

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{
          ...themeStyles,
          borderRadius,
          overflow: 'hidden',
          maxHeight,
          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
          fontSize: fontSizeMap[fontSize],
          lineHeight: '1.5',
        }}
      >
        {(title || showCopyButton) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 16px',
              backgroundColor: theme === 'github' ? '#f1f3f4' : '#2d2d30',
              borderBottom: `1px solid ${theme === 'github' ? '#e1e4e8' : '#404040'}`,
              color: theme === 'github' ? '#586069' : '#cccccc',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            <span>{title || language}</span>
            {showCopyButton && (
              <button
                onClick={handleCopy}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Copy code"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            )}
          </div>
        )}
        <div
          style={{
            padding,
            overflow: 'auto',
            maxHeight: title || showCopyButton ? `calc(${maxHeight} - 40px)` : maxHeight,
          }}
        >
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {formatCode(code)}
          </pre>
        </div>
      </div>
    </div>
  )
} 