'use client'
import { VoloCmsKitContentsPageDto } from '@/client'
import { PageView } from '@/features/cms/components/page/PageView'
import { usePageBySlug } from '@/features/cms/hooks/usePages'
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Error,
  Loader,
} from '@/shared/components/ui'
import { AlertTriangle, Home, RefreshCw, Search } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function PageViewPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [retryCount, setRetryCount] = useState(0)

  const { data: page, isLoading, isError, error, refetch } = usePageBySlug(slug)

  // Handle retry logic
  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    refetch()
  }

  // Reset retry count when slug changes
  useEffect(() => {
    setRetryCount(0)
  }, [slug])

  // Loading state with better UX
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader />
          <p className="text-muted-foreground">Loading page...</p>
        </div>
      </div>
    )
  }

  // Handle different types of errors gracefully
  if (isError) {
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? String(error.message)
        : 'An unexpected error occurred'

    // Network or server errors
    if (
      errorMessage.includes('fetch') ||
      errorMessage.includes('network') ||
      errorMessage.includes('timeout')
    ) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Connection Error</CardTitle>
              <CardDescription>
                We&apos;re having trouble connecting to our servers. This might be a temporary
                issue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {retryCount > 0
                    ? `Attempt ${retryCount + 1} failed. Please try again.`
                    : 'Please check your internet connection and try again.'}
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button onClick={handleRetry} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => router.push('/')}>
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // 404 or page not found errors
    if (errorMessage.includes('not found') || errorMessage.includes('404')) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Page Not Found</CardTitle>
              <CardDescription>
                The page you&apos;re looking for doesn&apos;t exist or may have been moved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>
                  Slug: <code className="bg-muted px-1 rounded">{slug}</code>
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Generic error fallback
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Something Went Wrong</CardTitle>
            <CardDescription>
              We encountered an unexpected error while loading this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button onClick={handleRetry} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Handle case where page data is null/undefined
  if (!page) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-6 w-6 text-gray-600" />
            </div>
            <CardTitle>Page Not Available</CardTitle>
            <CardDescription>
              This page exists but is currently not available for viewing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render the page with error boundary
  return (
    <ErrorBoundary fallback={<Error />}>
      <PageView page={page as VoloCmsKitContentsPageDto} />
    </ErrorBoundary>
  )
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
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
    console.error('PageView Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
