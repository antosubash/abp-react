import { IdentityRoleUpdateDto } from '@/client'
import { EnhancedPermissionDialog } from '../permission/EnhancedPermissionDialog'

type RolePermissionProps = {
  roleDto: IdentityRoleUpdateDto
  onDismiss: () => void
}

export const RolePermission = ({ roleDto, onDismiss }: RolePermissionProps) => {
  return (
    <EnhancedPermissionDialog
      entity={roleDto}
      entityType="role"
      onDismiss={onDismiss}
    />
  )
}
