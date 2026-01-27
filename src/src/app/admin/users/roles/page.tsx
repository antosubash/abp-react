import { AddRole } from '@/features/role-management/components/role/AddRole'
import { RoleList } from '@/features/role-management/components/role/RoleList'

export default function RolesPage() {
  return (
    <div className="w-full">
      <AddRole />
      <RoleList />
    </div>
  )
}
