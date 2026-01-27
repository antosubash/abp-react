import { AddUser } from '@/features/user-management/components/user/AddUser'
import { UserList } from '@/features/user-management/components/user/UserList'

export default function AdminUsersPage() {
  return (
    <div className="w-full">
      <AddUser />
      <UserList />
    </div>
  )
}
