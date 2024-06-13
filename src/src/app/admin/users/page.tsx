import { AddUser } from '@/components/user/AddUser'
import { UserList } from '@/components/user/UserList'

export default function AdminUsersPage() {
  return (
    <div className="w-full">
      <AddUser />
      <UserList />
    </div>
  )
}
