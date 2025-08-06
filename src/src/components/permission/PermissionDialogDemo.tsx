import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { EnhancedPermissionDialog } from './EnhancedPermissionDialog'
import { IdentityRoleUpdateDto, IdentityUserUpdateDto } from '@/client'
import { Shield, Users, User } from 'lucide-react'

// Mock data for demonstration
const mockRole: IdentityRoleUpdateDto = {
  id: '1',
  name: 'Admin',
  isDefault: false,
  isPublic: false,
  concurrencyStamp: 'mock-stamp',
}

const mockUser: IdentityUserUpdateDto = {
  id: '1',
  userName: 'john.doe',
  name: 'John Doe',
  surname: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+1234567890',
  isActive: true,
  lockoutEnabled: false,
  concurrencyStamp: 'mock-stamp',
}

export const PermissionDialogDemo = () => {
  const [showRoleDialog, setShowRoleDialog] = useState(false)
  const [showUserDialog, setShowUserDialog] = useState(false)

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Enhanced Permission Dialog Demo</h1>
        <p className="text-muted-foreground">
          Showcasing the improved permission management interface
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Permissions Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Role Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Admin Role</h3>
              <p className="text-sm text-muted-foreground">
                Manage permissions for the Admin role. This demonstrates the enhanced
                permission dialog with search, tabs, and change tracking.
              </p>
            </div>
            <Button 
              onClick={() => setShowRoleDialog(true)}
              className="w-full"
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Role Permissions
            </Button>
          </CardContent>
        </Card>

        {/* User Permissions Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">
                Manage individual user permissions. See how the dialog adapts
                for user-specific permission management.
              </p>
            </div>
            <Button 
              onClick={() => setShowUserDialog(true)}
              className="w-full"
            >
              <User className="h-4 w-4 mr-2" />
              Manage User Permissions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feature Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">Search & Filter</h4>
              <p className="text-sm text-muted-foreground">
                Quickly find permissions with real-time search functionality
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-600">Visual Feedback</h4>
              <p className="text-sm text-muted-foreground">
                Clear visual indicators for permission status and changes
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-600">Change Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Track all changes with undo functionality and history
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {showRoleDialog && (
        <EnhancedPermissionDialog
          entity={mockRole}
          entityType="role"
          onDismiss={() => setShowRoleDialog(false)}
        />
      )}

      {showUserDialog && (
        <EnhancedPermissionDialog
          entity={mockUser}
          entityType="user"
          onDismiss={() => setShowUserDialog(false)}
        />
      )}
    </div>
  )
} 