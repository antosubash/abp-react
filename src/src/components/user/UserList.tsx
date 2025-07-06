'use client'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useUsers } from '@/lib/hooks/useUsers'
import { useMemo, useState } from 'react'
import { IdentityUserDto, IdentityUserUpdateDto } from '@/client'
import { CustomTable } from '@/components/ui/CustomTable'
import Error from '@/components/ui/Error'
import Loader from '@/components/ui/Loader'
import { ColumnDef, PaginationState, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useToast } from '@/components/ui/use-toast'
import { PermissionActions } from '../permission/PermissionActions'
import { DeleteUser } from './DeleteUser'
import { UserEdit } from './UserEdit'
import { UserPermission } from './UserPermission'
import { Search } from '@/components/ui/Search'
import { USER_ROLE, Permissions } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'

type UserActionDialogState = {
  userId: string
  userDto: IdentityUserUpdateDto
  dialogType: 'edit' | 'permission' | 'delete'
} | null

export const UserList = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [searchStr, setSearchStr] = useState<string>('')
  const [userActionDialog, setUserActionDialog] = useState<UserActionDialogState>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { isLoading, data, isError, error } = useUsers(
    pagination.pageIndex,
    pagination.pageSize,
    searchStr || undefined
  )

  const handleActionComplete = () => {
    queryClient.invalidateQueries({ queryKey: [QueryNames.GetUsers] })
    setUserActionDialog(null)
  }

  const columns = useMemo(() => getUserColumns({
    onEdit: (user) => setUserActionDialog({
      userId: user.id!,
      userDto: user as IdentityUserUpdateDto,
      dialogType: 'edit'
    }),
    onPermission: (user) => setUserActionDialog({
      userId: user.id!,
      userDto: user as IdentityUserUpdateDto,
      dialogType: 'permission'
    }),
    onDelete: (user) => setUserActionDialog({
      userId: user.id!,
      userDto: user as IdentityUserUpdateDto,
      dialogType: 'delete'
    })
  }), [])

  const table = useReactTable({
    data: data?.items ?? [],
    pageCount: data?.totalCount ?? -1,
    state: { pagination },
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
  })

  if (isLoading) return <Loader />
  if (isError) return <Error />

  return (
    <>
      {userActionDialog && (
        <>
          {userActionDialog.dialogType === 'edit' && (
            <UserEdit
              userId={userActionDialog.userId}
              userDto={userActionDialog.userDto}
              onDismiss={handleActionComplete}
            />
          )}
          {userActionDialog.dialogType === 'permission' && (
            <UserPermission
              userId={userActionDialog.userId}
              userDto={userActionDialog.userDto}
              onDismiss={handleActionComplete}
            />
          )}
          {userActionDialog.dialogType === 'delete' && (
            <DeleteUser
              user={{
                username: userActionDialog.userDto.userName!,
                userId: userActionDialog.userId,
              }}
              onDismiss={handleActionComplete}
            />
          )}
        </>
      )}
      <Search 
        onUpdate={setSearchStr} 
        value={searchStr}
      />
      <CustomTable<IdentityUserDto>
        table={table}
        totalCount={data?.totalCount ?? 0}
        pageSize={pagination.pageSize}
      />
    </>
  )
}

// Add this to a separate file: columns.ts
const getUserColumns = (actions: {
  onEdit: (user: IdentityUserDto) => void
  onPermission: (user: IdentityUserDto) => void
  onDelete: (user: IdentityUserDto) => void
}): ColumnDef<IdentityUserDto>[] => [
  {
    header: 'User Management',
    columns: [
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (info) => (
          <PermissionActions
            actions={[
              {
                icon: 'permission',
                policy: Permissions.USERS_MANAGE_PERMISSIONS,
                callback: () => actions.onPermission(info.row.original),
              },
              {
                icon: 'pencil',
                policy: Permissions.USERS_UPDATE,
                callback: () => actions.onEdit(info.row.original),
              },
              {
                icon: 'trash',
                policy: Permissions.USERS_DELETE,
                visible: !info.row.original.userName?.includes(USER_ROLE.ADMIN),
                callback: () => actions.onDelete(info.row.original),
              },
            ]}
          />
        ),
      },
      {
        accessorKey: 'userName',
        header: 'Username',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'isActive',
        header: 'Active',
        cell: (info) => (info.getValue() ? 'yes' : 'no'),
      },
    ],
  },
]
