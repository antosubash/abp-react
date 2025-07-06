'use client'
import { VoloCmsKitContentsPageDtoReadable } from '@/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FileText, Code, Palette } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export type PageViewProps = {
  page: VoloCmsKitContentsPageDtoReadable
}

export const PageView = ({ page }: PageViewProps) => {
  // Inject custom styles if provided
  useEffect(() => {
    if (page.style) {
      const styleElement = document.createElement('style')
      styleElement.textContent = page.style
      document.head.appendChild(styleElement)
      
      return () => {
        document.head.removeChild(styleElement)
      }
    }
  }, [page.style])

  // Execute custom scripts if provided
  useEffect(() => {
    if (page.script && typeof page.script === 'string' && page.script.trim().length > 0) {
      try {
        // Log the script content for debugging
        console.log('Executing page script:', page.script)
        
        // For now, let's disable script execution to prevent errors
        // TODO: Implement proper script sandboxing
        console.warn('Script execution is temporarily disabled for security reasons')
        
        // Commented out script execution until we can properly sandbox it
        /*
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
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{page.title}</h1>
            <p className="text-muted-foreground">Page Details</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/cms/pages">
              <Button variant="outline">Back to Pages</Button>
            </Link>
            <Link href={`/admin/cms/pages/${page.id}/edit`}>
              <Button>Edit Page</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Page Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Slug</label>
                <p className="text-sm bg-muted p-2 rounded-md font-mono">{page.slug}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Layout</label>
                <p className="text-sm">{page.layoutName || 'Default'}</p>
              </div>

              <Separator />

              {page.script && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Code className="w-4 h-4" />
                    Custom Script
                  </label>
                  <p className="text-sm text-green-600">✓ Included</p>
                </div>
              )}

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

        {/* Page Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
            </CardHeader>
            <CardContent>
              {page.content ? (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No content available for this page.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 