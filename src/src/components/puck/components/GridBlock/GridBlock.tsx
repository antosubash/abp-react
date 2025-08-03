'use client'

import { ReactNode } from 'react'
import { GridBlockProps } from './GridBlockProps'

export const GridBlock = ({
  items,
  columns = '1fr',
  rows = 'auto',
  gap = '16px',
  justify = 'start',
  align = 'start',
  padding = '16px',
  backgroundColor = 'transparent',
  minHeight = 'auto',
  width = '100%',
}: GridBlockProps) => {
  // Convert justify to Tailwind classes
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    stretch: 'justify-stretch',
    'space-around': 'justify-around',
    'space-between': 'justify-between',
    'space-evenly': 'justify-evenly'
  }

  // Convert align to Tailwind classes
  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
  }

  // Convert gap to Tailwind classes (approximate mapping)
  const getGapClass = (gap: string) => {
    const gapValue = parseInt(gap)
    if (gapValue <= 8) return 'gap-2'
    if (gapValue <= 12) return 'gap-3'
    if (gapValue <= 16) return 'gap-4'
    if (gapValue <= 20) return 'gap-5'
    if (gapValue <= 24) return 'gap-6'
    if (gapValue <= 32) return 'gap-8'
    if (gapValue <= 40) return 'gap-10'
    return 'gap-4' // default
  }

  // Convert padding to Tailwind classes (approximate mapping)
  const getPaddingClass = (padding: string) => {
    const paddingValue = parseInt(padding)
    if (paddingValue <= 8) return 'p-2'
    if (paddingValue <= 12) return 'p-3'
    if (paddingValue <= 16) return 'p-4'
    if (paddingValue <= 20) return 'p-5'
    if (paddingValue <= 24) return 'p-6'
    if (paddingValue <= 32) return 'p-8'
    if (paddingValue <= 40) return 'p-10'
    return 'p-4' // default
  }

  // Convert minHeight to Tailwind classes (approximate mapping)
  const getMinHeightClass = (minHeight: string) => {
    if (minHeight === 'auto') return 'min-h-0'
    const heightValue = parseInt(minHeight)
    if (heightValue <= 100) return 'min-h-24'
    if (heightValue <= 200) return 'min-h-48'
    if (heightValue <= 300) return 'min-h-72'
    if (heightValue <= 400) return 'min-h-96'
    return 'min-h-0' // default
  }

  // Convert width to Tailwind classes (approximate mapping)
  const getWidthClass = (width: string) => {
    if (width === '100%') return 'w-full'
    if (width === 'auto') return 'w-auto'
    const widthValue = parseInt(width)
    if (widthValue <= 200) return 'w-48'
    if (widthValue <= 300) return 'w-72'
    if (widthValue <= 400) return 'w-96'
    if (widthValue <= 500) return 'w-[500px]'
    return 'w-full' // default
  }

  // Enhanced grid template columns for common patterns
  const getGridColumnsClass = (columns: string) => {
    // Common patterns
    if (columns === '1fr') return 'grid-cols-1'
    if (columns === '1fr 1fr') return 'grid-cols-2'
    if (columns === '1fr 1fr 1fr') return 'grid-cols-3'
    if (columns === 'repeat(2, 1fr)') return 'grid-cols-2'
    if (columns === 'repeat(3, 1fr)') return 'grid-cols-3'
    if (columns === 'repeat(4, 1fr)') return 'grid-cols-4'
    if (columns === 'repeat(5, 1fr)') return 'grid-cols-5'
    if (columns === 'repeat(6, 1fr)') return 'grid-cols-6'
    
    // Responsive patterns
    if (columns.includes('auto-fit') || columns.includes('auto-fill')) {
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }
    
    // Custom grid - fallback to inline style
    return ''
  }

  const gridColumnsClass = getGridColumnsClass(columns)
  const customGridStyle = gridColumnsClass ? {} : { gridTemplateColumns: columns }

  const Items = items
  return (
    <div
      className={`
        ${gridColumnsClass}
        ${getGapClass(gap)}
        ${justifyClasses[justify]}
        ${alignClasses[align]}
        ${getPaddingClass(padding)}
        ${getMinHeightClass(minHeight)}
        ${getWidthClass(width)}
        
        /* Enhanced styling */
        relative
        overflow-hidden
        rounded-2xl
        backdrop-blur-sm
        
        /* Background with gradient */
        bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90
        border border-gray-200/50
        
        /* Shadow and hover effects */
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-500
        ease-out
        
        /* Subtle background pattern */
        before:absolute
        before:inset-0
        before:bg-gradient-to-br
        before:from-blue-500/5
        before:via-transparent
        before:to-purple-500/5
        before:opacity-0
        before:transition-opacity
        before:duration-500
        before:ease-out
        hover:before:opacity-100
        
        /* Responsive design */
        w-full
        max-w-7xl
        mx-auto
        
        /* Animation on mount */
        animate-in
        fade-in
        duration-700
        ease-out
      `}
      style={{
        backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
        gridTemplateRows: rows !== 'auto' ? rows : undefined,
        ...customGridStyle
      }}
    >
      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full" />
      
      {/* Grid content */}
      <div className="relative z-10 w-full h-full">
        {Items && <Items />}
      </div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-blue-300/20 transition-all duration-500 pointer-events-none" />
    </div>
  )
} 