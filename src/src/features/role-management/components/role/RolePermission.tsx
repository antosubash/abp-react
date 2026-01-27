import { IdentityRoleUpdateDto } from '@/client'
import { useRouter } from 'next/navigation'

type RolePermissionProps = {
  roleDto: IdentityRoleUpdateDto
  onDismiss: () => void
}

export const RolePermission = ({ roleDto, onDismiss }: RolePermissionProps) => {
  const router = useRouter()

  const handleOpenPermissions = () => {
    router.push(`/admin/permissions/role/${roleDto.name}`)
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
