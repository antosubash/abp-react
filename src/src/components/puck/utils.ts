import { v4 as uuidv4 } from 'uuid'
export interface PuckData {
  content: Array<{
    type: string
    props: Record<string, any>
  }>
  root: {
    props: Record<string, any>
  }
}

export interface PageData {
  title: string
  slug: string
  layoutName?: string
  content: string | PuckData
  script?: string
  style?: string
}

/**
 * Helper function to ensure data structure is valid for Puck
 */
export const ensureValidPuckData = (data: any) => {
  if (!data) {
    return {
      content: [],
      root: { props: { title: 'New Page' } },
      zones: {},
    }
  }

  // Define valid component types that exist in our config
  const validComponentTypes = [
    'HeadingBlock',
    'TextBlock',
    'WelcomeBlock',
    'Hero',
    'ImageBlock',
    'CardBlock',
  ]

  // Helper function to generate a safe string ID
  const generateSafeId = (type: string, index: number): string => {
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substring(2, 9)
    return `${type}-${index}-${timestamp}-${randomSuffix}`
  }

  // Helper function to ensure a value is a valid string ID
  const ensureStringId = (value: any, fallback: string): string => {
    if (typeof value === 'string' && value.length > 0) {
      return value
    }
    if (typeof value === 'number') {
      return value.toString()
    }
    return fallback
  }

  // Ensure content is an array and all items have required properties
  const content = Array.isArray(data.content)
    ? data.content
        .filter((item: any) => {
          // Filter out components with invalid types or null/undefined items
          return (
            item &&
            typeof item === 'object' &&
            item.type &&
            typeof item.type === 'string' &&
            validComponentTypes.includes(item.type)
          )
        })
        .map((item: any, index: number) => {
          const safeId = generateSafeId(item.type, index)
          const itemId = ensureStringId(item.id, safeId)
          const itemKey = ensureStringId(item.key, itemId)

          return {
            type: item.type,
            props: item.props && typeof item.props === 'object' ? item.props : {},
            readOnly: Boolean(item.readOnly),
            id: itemId,
            key: itemKey,
          }
        })
    : []

  // If no valid content and this is initial data, add a welcome block
  if (content.length === 0 && data.content?.length > 0) {
    const welcomeId = generateSafeId('WelcomeBlock', 0)
    content.push({
      type: 'WelcomeBlock',
      props: {
        title: 'Welcome to Your New Page',
        description:
          'Start building your page by adding components from the sidebar. Drag and drop components to create your layout.',
        showTips: true,
        alignment: 'center',
      },
      id: welcomeId,
      key: welcomeId,
      readOnly: false,
    })
  }

  // Process zones to ensure they also have valid structure
  const processedZones: any = {}
  if (data.zones && typeof data.zones === 'object') {
    Object.keys(data.zones).forEach((zoneKey) => {
      if (Array.isArray(data.zones[zoneKey])) {
        processedZones[zoneKey] = data.zones[zoneKey]
          .filter((item: any) => {
            return (
              item &&
              typeof item === 'object' &&
              item.type &&
              typeof item.type === 'string' &&
              validComponentTypes.includes(item.type)
            )
          })
          .map((item: any, index: number) => {
            const safeId = generateSafeId(item.type, index)
            const itemId = ensureStringId(item.id, safeId)
            const itemKey = ensureStringId(item.key, itemId)

            return {
              type: item.type,
              props: item.props && typeof item.props === 'object' ? item.props : {},
              readOnly: Boolean(item.readOnly),
              id: itemId,
              key: itemKey,
            }
          })
      }
    })
  }

  return {
    content,
    root: {
      props:
        data.root?.props && typeof data.root.props === 'object'
          ? data.root.props
          : { title: 'New Page' },
      readOnly: Boolean(data.root?.readOnly),
      id: ensureStringId(data.root?.id, 'root'),
    },
    zones: processedZones,
  }
}

/**
 * Check if content is Puck data or HTML
 */
export function isPuckData(content: any): content is PuckData {
  return (
    content && typeof content === 'object' && 'content' in content && Array.isArray(content.content)
  )
}

/**
 * Convert HTML content to Puck data structure
 */
export function htmlToPuckData(html: string): PuckData {
  if (!html || html.trim() === '') {
    return {
      content: [],
      root: { props: {} },
    }
  }

  // Simple conversion - wrap HTML in a TextBlock
  return {
    content: [
      {
        type: 'TextBlock',
        props: {
          text: html,
          type: 'paragraph',
          alignment: 'left',
          fontSize: 'base',
          fontWeight: 'normal',
          color: 'default',
          maxWidth: 'full',
        },
      },
    ],
    root: { props: {} },
  }
}

/**
 * Convert Puck data back to HTML
 */
export function puckDataToHtml(data: PuckData): string {
  if (!data || !data.content || data.content.length === 0) {
    return ''
  }

  // Simple conversion - extract text from TextBlock components
  const textContent = data.content
    .filter((item) => item.type === 'TextBlock')
    .map((item) => item.props.text || '')
    .join('\n\n')

  return textContent
}

/**
 * Add unique keys to Puck components recursively
 */
export function addKeysToPuckComponents(components: any[]): any[] {
  return components.map((item: any, index: number) => {
    // Keep original ID or generate one if missing
    const itemId = item.id || `${item.type || 'component'}-${index}-${Date.now()}`
    // Always generate a new UUID for the key
    const uniqueKey = uuidv4()

    const processedItem = {
      ...item,
      id: itemId,
      key: uniqueKey,
    }

    // If the component has children, process them recursively
    if (item.children && Array.isArray(item.children)) {
      processedItem.children = addKeysToPuckComponents(item.children)
    }

    return processedItem
  })
}

/**
 * Process Puck data to ensure all components have proper keys
 */
export function processPuckData(data: any): any {
  if (!data) return data

  // Ensure we have the basic structure
  const processedData = {
    content: data.content || [],
    root: data.root || { props: {} },
    zones: data.zones || {},
  }

  // Only process content if it exists and is an array
  if (processedData.content && Array.isArray(processedData.content)) {
    processedData.content = addKeysToPuckComponents(processedData.content)
  }

  // Process zones to ensure they also have proper structure
  Object.keys(processedData.zones).forEach((zoneKey) => {
    if (Array.isArray(processedData.zones[zoneKey])) {
      processedData.zones[zoneKey] = addKeysToPuckComponents(processedData.zones[zoneKey])
    }
  })

  return processedData
}

/**
 * Walk tree utility from Puck 0.19
 * Recursively walks all slots in the entire tree and optionally modifies the nodes
 */
export function walkTree(
  data: any,
  config: any,
  callback: (nestedComponents: any[]) => any[]
): any {
  if (!data) return data

  const walkComponent = (component: any): any => {
    if (!component || !component.props) return component

    const newComponent = { ...component }
    const newProps = { ...component.props }

    // Walk through all props to find slots
    Object.keys(newProps).forEach((propKey) => {
      const propValue = newProps[propKey]

      // Check if this prop is a slot (array of components)
      if (Array.isArray(propValue)) {
        // Apply the callback to transform the slot components
        const transformedComponents = callback(propValue)

        // Recursively walk each component in the slot
        newProps[propKey] = transformedComponents.map(walkComponent)
      }
    })

    newComponent.props = newProps
    return newComponent
  }

  // Walk through content array
  if (data.content && Array.isArray(data.content)) {
    data.content = data.content.map(walkComponent)
  }

  // Walk through zones
  if (data.zones) {
    Object.keys(data.zones).forEach((zoneKey) => {
      if (Array.isArray(data.zones[zoneKey])) {
        data.zones[zoneKey] = data.zones[zoneKey].map(walkComponent)
      }
    })
  }

  return data
}

/**
 * Normalize page data to ensure consistent format
 */
export function normalizePageData(pageData: Partial<PageData>): PageData {
  const normalized = {
    title: pageData.title || '',
    slug: pageData.slug || '',
    layoutName: pageData.layoutName || '',
    content: pageData.content || '',
    script: pageData.script || '',
    style: pageData.style || '',
  }

  // If content is HTML string, convert to Puck data
  if (typeof normalized.content === 'string') {
    normalized.content = htmlToPuckData(normalized.content)
  }

  return normalized
}

/**
 * Convert page data for API submission
 */
export function preparePageDataForAPI(pageData: PageData): any {
  const apiData = { ...pageData }

  // Convert Puck data back to HTML for API compatibility
  if (isPuckData(pageData.content)) {
    apiData.content = puckDataToHtml(pageData.content)
  }

  return apiData
}

/**
 * Convert API data to page data format
 */
export function preparePageDataFromAPI(apiData: any): PageData {
  return {
    title: apiData.title || '',
    slug: apiData.slug || '',
    layoutName: apiData.layoutName || '',
    content: apiData.content || '',
    script: apiData.script || '',
    style: apiData.style || '',
  }
}
