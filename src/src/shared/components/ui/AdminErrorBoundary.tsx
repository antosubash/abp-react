'use client'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Admin Error Boundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto p-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Admin Page Error
              </CardTitle>
              <CardDescription>
                Something went wrong while loading the admin page. This might be due to network issues, authentication problems, or a temporary server error.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium mb-1">Error Details:</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {this.state.error.message || 'Unknown error occurred'}
                  </p>
                </div>
              )}
              <div className="flex gap-2">
                <Button 
                  onClick={this.handleRetry} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </Button>
                <Link href="/">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Go to Home
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">
                If this problem persists, please check your internet connection and try again later.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
} 