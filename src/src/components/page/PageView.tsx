'use client'

/**
 * PageView Component
 * 
 * Displays a CMS page with its content, metadata, and custom styling.
 * This component handles both the visual presentation and dynamic behavior
 * of CMS pages including custom styles and scripts.
 */

import { VoloCmsKitContentsPageDtoReadable } from '@/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FileText, Code, Palette } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { PageComments } from '@/components/comment/PageComments'

export type PageViewProps = {
  page: VoloCmsKitContentsPageDtoReadable
}

export const PageView = ({ page }: PageViewProps) => {
  /**
   * Inject custom CSS styles into the document head
   * This allows pages to have custom styling without affecting other pages
   */
  useEffect(() => {
    if (page.style) {
      // Create a new style element with the page's custom CSS
      const styleElement = document.createElement('style')
      styleElement.textContent = page.style
      document.head.appendChild(styleElement)
      
      // Cleanup: remove the style element when component unmounts
      // This prevents styles from persisting after leaving the page
      return () => {
        document.head.removeChild(styleElement)
      }
    }
  }, [page.style])

  /**
   * Handle custom JavaScript execution for the page
   * Currently disabled for security reasons - needs proper sandboxing
   */
  useEffect(() => {
    if (page.script && typeof page.script === 'string' && page.script.trim().length > 0) {
      try {
        // Log the script content for debugging purposes
        console.log('Executing page script:', page.script)
        
        // TODO: Implement proper script sandboxing for security
        // Script execution is temporarily disabled to prevent security vulnerabilities
        console.warn('Script execution is temporarily disabled for security reasons')
        
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
        console.error('Script content:', page.script)
      }
    }
  }, [page.script])

  // Note: Public API doesn't include audit fields like creationTime, lastModificationTime, etc.
  // These are only available in the admin API

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Page Header with title and navigation buttons */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{page.title}</h1>
            <p className="text-muted-foreground">Page Details</p>
          </div>
          <div className="flex gap-2">
            {/* Navigation buttons */}
            <Link href="/admin/cms/pages">
              <Button variant="outline">Back to Pages</Button>
            </Link>
            <Link href={`/admin/cms/pages/${page.id}/edit`}>
              <Button>Edit Page</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content grid - sidebar + content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar: Page metadata and information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Page Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Page slug - used for URL routing */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Slug</label>
                <p className="text-sm bg-muted p-2 rounded-md font-mono">{page.slug}</p>
              </div>
              
              {/* Page layout - determines the page structure */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Layout</label>
                <p className="text-sm">{page.layoutName || 'Default'}</p>
              </div>

              <Separator />

              {/* Custom script indicator */}
              {page.script && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Code className="w-4 h-4" />
                    Custom Script
                  </label>
                  <p className="text-sm text-green-600">✓ Included</p>
                </div>
              )}

              {/* Custom styles indicator */}
              {page.style && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Palette className="w-4 h-4" />
                    Custom Styles
                  </label>
                  <p className="text-sm text-green-600">✓ Included</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main content area: Page content display */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
            </CardHeader>
            <CardContent>
              {page.content ? (
                // Render HTML content safely using dangerouslySetInnerHTML
                // Note: This assumes the content is sanitized on the server side
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              ) : (
                // Empty state when no content is available
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No content available for this page.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <PageComments pageId={page.id!} pageTitle={page.title!} />
      </div>
    </div>
  )
} 