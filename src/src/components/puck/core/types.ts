import { ReactNode, ComponentType } from 'react'

export type Slot = ComponentType<any>

export interface ComponentConfig<T> {
  fields: Record<string, any>
  defaultProps: Partial<T>
  render: (props: T) => ReactNode
}

export type WithLayout<T> = T & {
  layout?: {
    grow?: boolean
    [key: string]: any
  }
} 