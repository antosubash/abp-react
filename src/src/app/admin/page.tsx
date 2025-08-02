import { abpApplicationConfigurationGet, ApplicationConfigurationDto } from '@/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Building,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  Phone,
  Settings,
  Shield,
  User,
  Users,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering since this page uses server-side API calls and authentication
export const dynamic = 'force-dynamic'

/**
 * The AdminIndex component is an asynchronous function that fetches the application configuration
 * and displays a comprehensive admin dashboard with user information and system status.
 * Next.js will automatically show the loading.tsx component while this page is loading.
 *
 * @returns A React component that renders a modern admin dashboard with user details and system information.
 */
export default async function AdminIndex() {
  const response = await abpApplicationConfigurationGet()
  let appConfig = response.data as ApplicationConfigurationDto

  // Provide fallback data if appConfig is null or undefined
  if (!appConfig) {
    appConfig = {
      localization: undefined,
      auth: undefined,
      setting: undefined,
      currentUser: undefined,
      features: undefined,
      globalFeatures: undefined,
      multiTenancy: undefined,
      currentTenant: undefined,
      timing: undefined,
      clock: undefined,
      objectExtensions: undefined,
      extraProperties: undefined,
    } as ApplicationConfigurationDto
  }

  const currentUser = appConfig?.currentUser

  const getInitials = (name?: string | null, surname?: string | null) => {
    const first = name?.charAt(0) || ''
    const last = surname?.charAt(0) || ''
    return (first + last).toUpperCase() || 'U'
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (err) {
      console.error('Error formatting date:', err)
      return 'Invalid Date'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Welcome back, {currentUser?.name || 'Administrator'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s what&apos;s happening with your system today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {appConfig?.currentTenant?.name || 'Host'}
          </Badge>
        </div>
      </div>

      {/* User Profile Card */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </CardTitle>
          <CardDescription>Your account information and permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={currentUser?.name || 'User'} />
              <AvatarFallback className="text-lg">
                {getInitials(currentUser?.name, currentUser?.surName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold">
                {currentUser?.name} {currentUser?.surName}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {currentUser?.email || 'No email provided'}
              </p>
              <p className="text-sm text-muted-foreground">
                Username: {currentUser?.userName || 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <Badge variant={currentUser?.isAuthenticated ? 'default' : 'destructive'}>
                {currentUser?.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email Verification</span>
              </div>
              <div className="flex items-center gap-2">
                {currentUser?.emailVerified ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">
                  {currentUser?.emailVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Phone Verification</span>
              </div>
              <div className="flex items-center gap-2">
                {currentUser?.phoneNumberVerified ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">
                  {currentUser?.phoneNumberVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
            </div>
          </div>

          {currentUser?.roles && currentUser.roles.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Roles</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentUser.roles.map((role, index) => (
                    <Badge key={index} variant="secondary">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* System Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Multi-tenancy Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Multi-tenancy</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appConfig?.multiTenancy?.isEnabled ? 'Enabled' : 'Disabled'}
            </div>
            <p className="text-xs text-muted-foreground">
              {appConfig?.multiTenancy?.isEnabled
                ? 'Multi-tenant mode active'
                : 'Single tenant mode'}
            </p>
          </CardContent>
        </Card>

        {/* Current Tenant */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Tenant</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appConfig?.currentTenant?.name || 'Host'}</div>
            <p className="text-xs text-muted-foreground">
              {appConfig?.currentTenant?.isAvailable ? 'Available' : 'Not Available'}
            </p>
          </CardContent>
        </Card>

        {/* Session Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentUser?.sessionId ? 'Active' : 'No Session'}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentUser?.sessionId
                ? 'Session ID: ' + currentUser.sessionId.substring(0, 8) + '...'
                : 'No active session'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/users">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center gap-2"
              >
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Button>
            </Link>

            <Link href="/admin/roles">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center gap-2"
              >
                <Shield className="h-6 w-6" />
                <span>Manage Roles</span>
              </Button>
            </Link>

            <Link href="/admin/tenants">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center gap-2"
              >
                <Building className="h-6 w-6" />
                <span>Manage Tenants</span>
              </Button>
            </Link>

            <Link href="/admin/settings">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center gap-2"
              >
                <Settings className="h-6 w-6" />
                <span>System Settings</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* System Configuration Details */}
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Detailed system configuration information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Localization</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    Current Culture: {appConfig?.localization?.currentCulture?.displayName || 'N/A'}
                  </p>
                  <p>Default Resource: {appConfig?.localization?.defaultResourceName || 'N/A'}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Timing</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Time Zone: {appConfig?.timing?.timeZone?.iana?.timeZoneName || 'N/A'}</p>
                  <p>Clock Kind: {appConfig?.clock?.kind || 'N/A'}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <div className="text-sm text-muted-foreground">
                <p>Enabled Features: {appConfig?.globalFeatures?.enabledFeatures?.length || 0}</p>
                {appConfig?.globalFeatures?.enabledFeatures && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {appConfig.globalFeatures.enabledFeatures.slice(0, 5).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {appConfig.globalFeatures.enabledFeatures.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{appConfig.globalFeatures.enabledFeatures.length - 5} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
