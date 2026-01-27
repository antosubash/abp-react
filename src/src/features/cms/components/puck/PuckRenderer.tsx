'use client'

import { Puck } from '@measured/puck'
import { v4 as uuidv4 } from 'uuid'
import { config } from './config'

export interface PuckRendererProps {
  data: any
  className?: string
}

export const PuckRenderer = ({ data, className = '' }: PuckRendererProps) => {
  if (!data || !data.content) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        <p>No content available</p>
      </div>
    )
  }

  // Recursive function to add keys to all components
  const addKeysToComponents = (components: any[]): any[] => {
    return components.map((item: any) => {
      const processedItem = {
        ...item,
        key: item.key || uuidv4(),
      }

      // If the component has children, process them recursively
      if (item.children && Array.isArray(item.children)) {
        processedItem.children = addKeysToComponents(item.children)
      }

      return processedItem
    })
  }

  // Ensure all content items have UUID keys while preserving IDs
  const processedData = {
    ...data,
    content: data.content ? addKeysToComponents(data.content) : [],
  }

  return (
    <div className={`w-full puck-editor ${className}`}>
      <Puck config={config} data={processedData} />
    </div>
  )
}
