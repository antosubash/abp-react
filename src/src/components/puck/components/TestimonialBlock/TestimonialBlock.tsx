'use client'

import Image from 'next/image'
import { TestimonialBlockProps } from './TestimonialBlockProps'

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

export const TestimonialBlock = ({
  quote,
  author,
  position,
  company,
  avatar,
  rating = 0,
  alignment = 'left',
  style = 'default',
  backgroundColor = '#ffffff',
  textColor = '#374151',
  padding = '24px',
}: TestimonialBlockProps) => {
  const renderStars = () => {
    if (rating === 0) return null
    return (
      <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} filled={i < rating} />
        ))}
      </div>
    )
  }

  const renderAvatar = () => {
    if (!avatar) return null
    return (
      <Image
        src={avatar}
        alt={author}
        width={48}
        height={48}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '12px',
        }}
      />
    )
  }

  const baseStyles: React.CSSProperties = {
    textAlign: alignment,
    color: textColor,
    padding,
    backgroundColor,
    borderRadius: style === 'card' ? '8px' : '0',
    boxShadow: style === 'card' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    border: style === 'minimal' ? '1px solid #e5e7eb' : 'none',
  }

  const quoteStyles: React.CSSProperties = {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '16px',
    fontStyle: style === 'minimal' ? 'italic' : 'normal',
    fontWeight: style === 'minimal' ? '400' : '500',
  }

  const authorStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
  }

  const metaStyles: React.CSSProperties = {
    fontSize: '12px',
    opacity: 0.7,
  }

  return (
    <div style={baseStyles}>
      {renderStars()}
      {renderAvatar()}
      <blockquote style={quoteStyles}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div>
        <div style={authorStyles}>{author}</div>
        {(position || company) && (
          <div style={metaStyles}>
            {position && <span>{position}</span>}
            {position && company && <span> at </span>}
            {company && <span>{company}</span>}
          </div>
        )}
      </div>
    </div>
  )
} 