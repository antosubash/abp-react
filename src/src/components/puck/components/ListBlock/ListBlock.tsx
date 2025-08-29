'use client'

import type { ListBlockProps } from './ListBlockProps'

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

export const ListBlock = ({
  items,
  type = 'unordered',
  style = 'default',
  alignment = 'left',
  fontSize = 'base',
  spacing = 'normal',
  markerColor = '#3b82f6',
  textColor = '#374151',
  backgroundColor = '#ffffff',
  padding = '16px',
  maxWidth = 'full',
}: ListBlockProps) => {
  const fontSizeMap = {
    sm: '12px',
    base: '14px',
    lg: '16px',
  }

  const spacingMap = {
    tight: '4px',
    normal: '8px',
    loose: '12px',
  }

  const maxWidthMap = {
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    full: '100%',
  }

  // Parse items if it's a string (one item per line)
  const parseItems = (items: string[] | string): string[] => {
    if (typeof items === 'string') {
      return items
        .trim()
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    }
    return items
  }

  const listItems = parseItems(items)

  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      textAlign: alignment,
      fontSize: fontSizeMap[fontSize],
      color: textColor,
      backgroundColor,
      padding,
      maxWidth: maxWidthMap[maxWidth],
      margin: '0 auto',
    }

    switch (style) {
      case 'bordered':
        return {
          ...baseStyles,
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
        }
      case 'minimal':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
        }
      default:
        return baseStyles
    }
  }

  const getListItemStyles = (): React.CSSProperties => ({
    marginBottom: spacingMap[spacing],
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  })

  const getMarkerStyles = (): React.CSSProperties => ({
    color: markerColor,
    flexShrink: 0,
    marginTop: '2px',
  })

  const renderUnorderedList = () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {listItems.map((item, index) => (
        <li key={index} style={getListItemStyles()}>
          <span style={getMarkerStyles()}>•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )

  const renderOrderedList = () => (
    <ol style={{ padding: 0, margin: 0, listStyle: 'none', counterReset: 'list-counter' }}>
      {listItems.map((item, index) => (
        <li key={index} style={getListItemStyles()}>
          <span
            style={{
              ...getMarkerStyles(),
              counterIncrement: 'list-counter',
            }}
          >
            {index + 1}.
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )

  const renderChecklist = () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {listItems.map((item, index) => (
        <li key={index} style={getListItemStyles()}>
          <span style={getMarkerStyles()}>
            <CheckIcon />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )

  const renderList = () => {
    switch (type) {
      case 'ordered':
        return renderOrderedList()
      case 'checklist':
        return renderChecklist()
      default:
        return renderUnorderedList()
    }
  }

  if (!listItems.length) {
    return (
      <div style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>
        No list items provided
      </div>
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      <div style={getContainerStyles()}>{renderList()}</div>
    </div>
  )
}
