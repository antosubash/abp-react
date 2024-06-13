import { AddRole } from '@/components/role/AddRole'
import { RoleList } from '@/components/role/RoleList'

export default function RolesPage() {
  return (
    <div className="w-full">
      <AddRole />
      <RoleList />
    </div>
  )
}
