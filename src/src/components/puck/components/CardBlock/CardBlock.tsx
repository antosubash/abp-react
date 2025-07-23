'use client'
import Image from 'next/image'
import { CardBlockProps } from './CardBlockProps'

export const CardBlock = ({
  title,
  description,
  content,
  image,
  buttonText,
  buttonLink,
  variant = 'default',
  alignment = 'left',
  backgroundColor = '#ffffff',
  borderColor = '#e5e7eb',
  padding = '24px',
  borderRadius = '8px',
}: CardBlockProps) => {
  return (
    <div
      style={{
        border: variant === 'outline' ? `1px solid ${borderColor}` : 'none',
        backgroundColor: variant === 'default' ? backgroundColor : 'transparent',
        borderRadius,
        padding,
        margin: '16px',
        boxShadow: variant === 'default' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
        textAlign: alignment,
      }}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '6px',
            marginBottom: '16px',
          }}
        />
      )}
      <h3
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#1f2937',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: content ? '12px' : '16px',
          lineHeight: '1.5',
        }}
      >
        {description}
      </p>
      {content && (
        <p
          style={{
            fontSize: '14px',
            color: '#374151',
            marginBottom: '16px',
            lineHeight: '1.6',
          }}
        >
          {content}
        </p>
      )}
      {buttonText && (
        <a
          href={buttonLink || '#'}
          style={{
            display: 'inline-block',
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {buttonText}
        </a>
      )}
    </div>
  )
}
