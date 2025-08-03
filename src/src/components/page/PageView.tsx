'use client'

/**
 * PageView Component
 *
 * Displays a CMS page with its content using Puck rendering system.
 * This is a clean public-facing page that renders Puck data without editor interface.
 */

import { VoloCmsKitContentsPageDto } from '@/client'
import { PageComments } from '@/components/comment/PageComments'
import { htmlToPuckData, isPuckData } from '@/components/puck'
import { config } from '@/components/puck/config'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Render } from '@measured/puck'
import { AlertTriangle, FileText, RefreshCw } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export type PageViewProps = {
  page: VoloCmsKitContentsPageDto
}

export const PageView = ({ page }: PageViewProps) => {
  const [styleError, setStyleError] = useState<string | null>(null)
  const [scriptError, setScriptError] = useState<string | null>(null)
  const [renderError, setRenderError] = useState<string | null>(null)
  const [contentError, setContentError] = useState<string | null>(null)

  /**
   * Inject custom CSS styles into the document head
   * This allows pages to have custom styling without affecting other pages
   */
  useEffect(() => {
    if (page.style) {
      try {
        // Create a new style element with the page's custom CSS
        const styleElement = document.createElement('style')
        styleElement.textContent = page.style
        styleElement.setAttribute('data-page-style', page.id || 'unknown')
        document.head.appendChild(styleElement)

        // Cleanup: remove the style element when component unmounts
        // This prevents styles from persisting after leaving the page
        return () => {
          const existingStyle = document.querySelector(
            `[data-page-style="${page.id || 'unknown'}"]`
          )
          if (existingStyle) {
            document.head.removeChild(existingStyle)
          }
        }
      } catch (error) {
        console.error('Error injecting page styles:', error)
        setStyleError('Failed to load page styles')
      }
    }
  }, [page.style, page.id])

  /**
   * Handle custom JavaScript execution for the page
   * Currently disabled for security reasons - needs proper sandboxing
   */
  useEffect(() => {
    if (page.script && typeof page.script === 'string' && page.script.trim().length > 0) {
      try {

        // TODO: Implement proper script sandboxing for security
        // Script execution is temporarily disabled to prevent security vulnerabilities
        console.warn('Script execution is temporarily disabled for security reasons')
        setScriptError('Script execution is disabled for security reasons')

        /* 
        // Future implementation with proper sandboxing:
        // Create a safer execution environment by wrapping in try-catch
        const safeScript = `
          try {
            ${page.script}
          } catch (scriptError) {
            console.error('Script execution error:', scriptError);
          }
        `
        
        // Create a new function with a comprehensive execution context
        const scriptFunction = new Function(
          'document', 
          'window', 
          'console', 
          'location',
          'history',
          'localStorage',
          'sessionStorage',
          'navigator',
          'screen',
          'innerWidth',
          'innerHeight',
          'outerWidth', 
          'outerHeight',
          safeScript
        )
        
        // Execute with all available browser APIs
        scriptFunction(
          document, 
          window, 
          console, 
          window.location,
          window.history,
          window.localStorage,
          window.sessionStorage,
          window.navigator,
          window.screen,
          window.innerWidth,
          window.innerHeight,
          window.outerWidth,
          window.outerHeight
        )
        */
      } catch (error) {
        console.error('Error creating or executing page script:', error)
        setScriptError('Failed to process page script')
      }
    }
  }, [page.script])

  // Convert content to Puck data if it's HTML
  const getPuckData = () => {
    if (!page.content) {
      setContentError('No content available')
      return null
    }

    let parsedContent = page.content

    // Try to parse as JSON if it's a string
    if (typeof page.content === 'string') {
      try {
        parsedContent = JSON.parse(page.content)
      } catch (error) {
        // If it's not valid JSON, treat it as HTML
        try {
          return htmlToPuckData(page.content)
        } catch (htmlError) {
          console.error('Error converting HTML to Puck data:', htmlError)
          setContentError('Failed to process page content')
          return null
        }
      }
    }

    // Check if the parsed content is Puck data
    if (isPuckData(parsedContent)) {
      return parsedContent
    }

    // If it's not Puck data, convert HTML to Puck data
    if (typeof page.content === 'string') {
      try {
        return htmlToPuckData(page.content)
      } catch (htmlError) {
        console.error('Error converting HTML to Puck data:', htmlError)
        setContentError('Failed to process page content')
        return null
      }
    }

    setContentError('Unsupported content format')
    return null
  }

  const puckData = getPuckData()

  // Handle rendering errors
  const handleRenderError = (error: Error) => {
    console.error('Puck rendering error:', error)
    setRenderError('Failed to render page content')
  }

  // Reset errors when page changes
  useEffect(() => {
    setStyleError(null)
    setScriptError(null)
    setRenderError(null)
    setContentError(null)
  }, [page.id])

  return (
    <div className="min-h-screen bg-background">
      {/* Error Alerts */}
      {(styleError || scriptError || contentError) && (
        <div className="container mx-auto px-4 py-4 space-y-2">
          {styleError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Style Error:</strong> {styleError}
              </AlertDescription>
            </Alert>
          )}
          {scriptError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Script Error:</strong> {scriptError}
              </AlertDescription>
            </Alert>
          )}
          {contentError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Content Error:</strong> {contentError}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Main Content - Full Page */}
      <div className="w-full">
        {/* Render Puck Content */}
        {puckData ? (
          <div>
            {/* Try to render with Puck */}
            <ErrorBoundary onError={handleRenderError}>
              <Render config={config} data={puckData as any} />
            </ErrorBoundary>
          </div>
        ) : (
          // Fallback for empty content or rendering errors
          <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>
                  {contentError || renderError || "This page doesn&apos;t have any content yet."}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="mx-auto"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reload Page
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comments Section - Full Width */}
        <div className="w-full bg-background">
          <div className="container mx-auto px-4 py-8">
            <ErrorBoundary onError={(error) => console.error('Comments error:', error)}>
              <PageComments pageId={page.id!} pageTitle={page.title!} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}

// Error Boundary Component for rendering errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; onError?: (error: Error) => void }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: unknown) {
    const errorObj =
      error && typeof error === 'object' && 'message' in error
        ? (error as Error)
        : ({ message: String(error), name: 'Error' } as Error)
    return { hasError: true, error: errorObj }
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
    const errorObj =
      error && typeof error === 'object' && 'message' in error
        ? (error as Error)
        : ({ message: String(error), name: 'Error' } as Error)
    this.props.onError?.(errorObj)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Rendering Error</CardTitle>
              <CardDescription>There was an error rendering this content.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                variant="outline"
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="mx-auto"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
