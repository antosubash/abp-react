import { IdentityUserUpdateDto } from '@/client'
import { EnhancedPermissionDialog } from '../permission/EnhancedPermissionDialog'

type UserPermissionProps = {
  userDto: IdentityUserUpdateDto
  userId: string
  onDismiss: () => void
}

export const UserPermission = ({ userDto, userId, onDismiss }: UserPermissionProps) => {
  return (
    <EnhancedPermissionDialog
      entity={userDto}
      entityType="user"
      onDismiss={onDismiss}
    />
  )
}
