'use client'

import type { TableBlockProps } from './TableBlockProps'

export const TableBlock = ({
  data,
  headers,
  style = 'default',
  alignment = 'left',
  fontSize = 'base',
  maxWidth = 'full',
  padding = '12px',
  borderColor = '#e5e7eb',
  headerBackgroundColor = '#f9fafb',
  headerTextColor = '#374151',
  rowBackgroundColor = '#ffffff',
  rowTextColor = '#374151',
  stripedRowColor = '#f9fafb',
}: TableBlockProps) => {
  const fontSizeMap = {
    sm: '12px',
    base: '14px',
    lg: '16px',
  }

  const maxWidthMap = {
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    full: '100%',
  }

  // Parse data if it's a string (CSV format)
  const parseData = (data: string[][] | string): string[][] => {
    if (typeof data === 'string') {
      return data
        .trim()
        .split('\n')
        .map((row) => row.split(',').map((cell) => cell.trim()))
    }
    return data
  }

  // Parse headers if it's a string (comma separated)
  const parseHeaders = (headers: string[] | string | undefined): string[] => {
    if (typeof headers === 'string') {
      return headers.split(',').map((header) => header.trim())
    }
    return headers || []
  }

  const tableData = parseData(data)
  const tableHeaders = parseHeaders(headers)

  const getTableStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: '100%',
      maxWidth: maxWidthMap[maxWidth],
      borderCollapse: 'collapse',
      fontSize: fontSizeMap[fontSize],
      margin: '0 auto',
    }

    switch (style) {
      case 'bordered':
        return {
          ...baseStyles,
          border: `1px solid ${borderColor}`,
        }
      case 'minimal':
        return {
          ...baseStyles,
          border: 'none',
        }
      default:
        return baseStyles
    }
  }

  const getHeaderStyles = (): React.CSSProperties => ({
    backgroundColor: headerBackgroundColor,
    color: headerTextColor,
    fontWeight: '600',
    textAlign: alignment,
    padding,
    borderBottom: style === 'bordered' ? `1px solid ${borderColor}` : 'none',
  })

  const getCellStyles = (rowIndex: number): React.CSSProperties => {
    const isStriped = style === 'striped' && rowIndex % 2 === 1
    return {
      backgroundColor: isStriped ? stripedRowColor : rowBackgroundColor,
      color: rowTextColor,
      textAlign: alignment,
      padding,
      borderBottom: style === 'bordered' ? `1px solid ${borderColor}` : '1px solid #f3f4f6',
    }
  }

  if (!tableData.length) {
    return (
      <div style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>
        No table data provided
      </div>
    )
  }

  return (
    <div style={{ padding: '16px', overflowX: 'auto' }}>
      <table style={getTableStyles()}>
        {tableHeaders.length > 0 && (
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} style={getHeaderStyles()}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={getCellStyles(rowIndex)}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
