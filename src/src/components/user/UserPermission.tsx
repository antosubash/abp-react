import { useRouter } from 'next/navigation'
import type { IdentityUserUpdateDto } from '@/client'

type UserPermissionProps = {
  userDto: IdentityUserUpdateDto
  userId: string
  onDismiss: () => void
}

export const UserPermission = ({ userDto, userId, onDismiss }: UserPermissionProps) => {
  const router = useRouter()

  const handleOpenPermissions = () => {
    router.push(`/admin/permissions/user/${userDto.userName}`)
    onDismiss()
  }

  return (
    <button
      onClick={handleOpenPermissions}
      className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
    >
      Manage Permissions
    </button>
  )
}
