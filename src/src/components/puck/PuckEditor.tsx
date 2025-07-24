'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Puck, usePuck } from '@measured/puck'
import { ArrowLeft, Edit, Eye, Maximize2, Minimize2, Save } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { config } from './config'
import { ensureValidPuckData } from './utils'

export interface PuckEditorProps {
  data: any
  onChange: (data: any) => void
  onSave?: (data: any) => void
  readOnly?: boolean
  className?: string
}

// Custom Header Actions component that uses usePuck hook
const CustomHeaderActions = ({
  onSave,
  onBack,
}: {
  onSave?: (data: any) => void
  onBack?: () => void
}) => {
  const { appState } = usePuck()
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleSave = useCallback(() => {
    if (onSave && appState.data) {
      onSave(appState.data)
    }
  }, [onSave, appState.data])

  const togglePreview = useCallback(() => {
    setIsPreviewMode(!isPreviewMode)
  }, [isPreviewMode])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  return (
    <div className="flex items-center gap-2">
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={togglePreview}
        className="flex items-center gap-2"
      >
        {isPreviewMode ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {isPreviewMode ? 'Edit' : 'Preview'}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={toggleFullscreen}
        className="flex items-center gap-2"
      >
        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </Button>

      {onSave && (
        <Button size="sm" onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save
        </Button>
      )}
    </div>
  )
}

// Custom Layout component using Puck composition
const CustomPuckLayout = ({
  onSave,
  onBack,
}: {
  onSave?: (data: any) => void
  onBack?: () => void
}) => {
  return (
    <div className="flex">
      {/* Left Sidebar - Components */}
      <div className="w-80 border-r bg-background flex flex-col min-h-screen">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Components
          </h3>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <Puck.Components />
        </div>
      </div>

      {/* Main Content - Preview */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-slate-50 p-4 overflow-visible">
          <Puck.Preview />
        </div>
      </div>

      {/* Right Sidebar - Fields */}
      <div className="w-80 border-l bg-background flex flex-col min-h-screen">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Properties
          </h3>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <Puck.Fields />
        </div>
      </div>
    </div>
  )
}

export const PuckEditor = ({
  data,
  onChange,
  onSave,
  readOnly = false,
  className = '',
}: PuckEditorProps) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [puckData, setPuckData] = useState<any>(null)

  // Initialize data with better error handling
  React.useEffect(() => {
    try {
      // Handle different data formats
      let processedData = data
      if (typeof data === 'string') {
        try {
          processedData = JSON.parse(data)
        } catch (parseError) {
          console.warn('Failed to parse data as JSON, using as-is:', parseError)
          // If it's HTML string, create basic structure
          processedData = {
            content: [],
            root: { props: { title: 'New Page' } },
            zones: {},
          }
        }
      }

      // Ensure we have a proper Puck data structure
      if (!processedData || typeof processedData !== 'object') {
        console.warn('Invalid data structure, creating default Puck data')
        processedData = {
          content: [],
          root: { props: { title: 'New Page' } },
          zones: {},
        }
      }

      // Ensure content is an array, not a string
      if (typeof processedData.content === 'string') {
        console.warn('Content is string, converting to proper Puck structure')
        processedData = {
          content: [],
          root: { props: { title: 'New Page' } },
          zones: {},
        }
      }

      const validData = ensureValidPuckData(processedData)

      setPuckData(validData)
      setIsInitialized(true)
      setHasError(false)
    } catch (error) {
      console.error('Error initializing Puck data:', error)
      setHasError(true)
      setErrorMessage('Failed to load page content. Please try refreshing the page.')

      // Fallback to valid empty data
      const fallbackData = ensureValidPuckData(null)
      setPuckData(fallbackData)
      setIsInitialized(true)
    }
  }, [data, isInitialized]) // Add isInitialized dependency to allow data updates

  const handleChange = useCallback(
    (newData: any) => {
      try {
        if (!newData) {
          console.warn('Received empty data in handleChange')
          return
        }

        const validData = ensureValidPuckData(newData)
        setPuckData(validData)

        // Call onChange immediately without debouncing for better responsiveness
        try {
          const dataToSend = JSON.stringify(validData)
          onChange(dataToSend)
        } catch (error) {
          console.error('Error in onChange:', error)
          setHasError(true)
          setErrorMessage('Failed to save changes. Please try again.')
        }
      } catch (error) {
        console.error('Error handling change:', error)
        setHasError(true)
        setErrorMessage('Failed to update content. Please try again.')
      }
    },
    [onChange]
  )

  const handleSave = useCallback(
    (data: any) => {
      try {
        if (onSave) {
          onSave(data)
        }
      } catch (error) {
        console.error('Error in handleSave:', error)
        setHasError(true)
        setErrorMessage('Failed to save. Please try again.')
      }
    },
    [onSave]
  )

  const resetError = useCallback(() => {
    setHasError(false)
    setErrorMessage('')
    setIsInitialized(false)
  }, [])

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Editor Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {errorMessage ||
                'The page editor encountered an error. Please try refreshing the page.'}
            </p>
            <Button onClick={resetError} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Retry Editor
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isInitialized || !puckData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    )
  }

  // Additional safety check before rendering
  if (!puckData.content || !Array.isArray(puckData.content)) {
    console.error('Invalid puckData structure:', puckData)
    const fallbackData = ensureValidPuckData(null)
    setPuckData(fallbackData)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing editor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <Puck
        key={JSON.stringify(puckData)} // Force re-render when data changes
        config={config}
        data={puckData}
        onChange={handleChange}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <CustomHeaderActions onSave={handleSave} onBack={() => window.history.back()} />
              {/* Include the default publish button */}
              {children}
            </>
          ),
        }}
      >
        <CustomPuckLayout onSave={handleSave} onBack={() => window.history.back()} />
      </Puck>
    </div>
  )
}
