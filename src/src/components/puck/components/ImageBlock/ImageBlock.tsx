'use client'
import Image from 'next/image'
import { ImageBlockProps } from './ImageBlockProps'

export const ImageBlock = ({
  src,
  alt,
  width = 800,
  height = 600,
  alignment = 'center',
  rounded = false,
  shadow = false,
  maxWidth = '100%',
  padding = '16px',
}: ImageBlockProps) => {
  return (
    <div
      style={{
        textAlign: alignment,
        padding,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          maxWidth,
          height: 'auto',
          width: width ? `${width}px` : 'auto',
          borderRadius: rounded ? '8px' : '0',
          boxShadow: shadow ? '0 10px 25px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      />
    </div>
  )
}
