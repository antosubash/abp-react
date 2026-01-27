// Global error handler for Puck-related React key warnings and Slots API
let isErrorHandlerInstalled = false
let originalConsoleError: typeof console.error | null = null
let originalConsoleWarn: typeof console.warn | null = null

export const installPuckErrorHandler = () => {
  if (isErrorHandlerInstalled) return

  originalConsoleError = console.error
  originalConsoleWarn = console.warn

  console.error = (...args: any[]) => {
    const message = args[0]

    // Suppress specific React key warnings from Puck
    if (
      typeof message === 'string' &&
      (message.includes('Each child in a list should have a unique "key" prop') ||
        message.includes('Warning: Each child in a list should have a unique "key" prop'))
    ) {
      return
    }

    // Suppress Slots API related warnings that might be expected
    if (typeof message === 'string' && message.includes('slots') && message.includes('puck')) {
      return
    }

    // Suppress drag-and-drop related errors
    if (
      typeof message === 'string' &&
      (message.includes('Cannot read properties of undefined') ||
        message.includes('toString') ||
        message.includes('@dnd-kit'))
    ) {
      return
    }

    // Pass through all other console errors
    originalConsoleError?.(...args)
  }

  console.warn = (...args: any[]) => {
    const message = args[0]

    // Suppress specific warnings related to Puck slots
    if (
      (typeof message === 'string' && message.includes('slots') && message.includes('puck')) ||
      (message.includes('DropZone') && message.includes('deprecated'))
    ) {
      return
    }

    // Suppress drag-and-drop related warnings
    if (
      typeof message === 'string' &&
      (message.includes('@dnd-kit') || message.includes('CollisionObserver'))
    ) {
      return
    }

    // Pass through all other console warnings
    originalConsoleWarn?.(...args)
  }

  isErrorHandlerInstalled = true
}

export const uninstallPuckErrorHandler = () => {
  if (!isErrorHandlerInstalled || !originalConsoleError || !originalConsoleWarn) return

  console.error = originalConsoleError
  console.warn = originalConsoleWarn
  isErrorHandlerInstalled = false
  originalConsoleError = null
  originalConsoleWarn = null
}
