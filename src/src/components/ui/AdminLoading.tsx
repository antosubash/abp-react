import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, User, Building, Globe } from 'lucide-react'

export function AdminLoading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Loading Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Loading Admin Dashboard...
          </h1>
          <p className="text-muted-foreground mt-2">
            Please wait while we load your system information.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      </div>

      {/* Loading User Profile Card */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </CardTitle>
          <CardDescription>Loading your account information...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
            </div>
            <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Loading System Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Multi-tenancy</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Tenant</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Session</CardTitle>
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
          </CardContent>
        </Card>
      </div>

    </div>
  )
} 