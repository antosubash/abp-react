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
import { USER_ROLE } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'

export const UserList = () => {
  const { toast } = useToast()

  const [searchStr, setSearchStr] = useState<string | undefined>()
  const [userActionDialog, setUserActionDialog] = useState<{
    userId: string
    userDto: IdentityUserUpdateDto
    dialogType?: 'edit' | 'permission' | 'delete'
  } | null>()

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex, pageSize, toast, searchStr]
  )

  const { isLoading, data, isError } = useUsers(
    pagination.pageIndex,
    pagination.pageSize,
    searchStr
  )

  const queryClient = useQueryClient()

  const defaultColumns: ColumnDef<IdentityUserDto>[] = useMemo(
    () => [
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
                    policy: 'AbpIdentity.Users.ManagePermissions',
                    callback: () => {
                      setUserActionDialog({
                        userId: info.row.original.id as string,
                        userDto: info.row.original as IdentityUserUpdateDto,
                        dialogType: 'permission',
                      })
                    },
                  },
                  {
                    icon: 'pencil',
                    policy: 'AbpIdentity.Users.Update',
                    callback: () => {
                      setUserActionDialog({
                        userId: info.row.original.id as string,
                        userDto: info.row.original as IdentityUserUpdateDto,
                        dialogType: 'edit',
                      })
                    },
                  },
                  {
                    icon: 'trash',
                    policy: 'AbpIdentity.Users.Delete',
                    visible: info.row.original.userName?.includes(USER_ROLE.ADMIN),
                    callback: () => {
                      setUserActionDialog({
                        userId: info.row.original.id as string,
                        userDto: info.row.original as IdentityUserUpdateDto,
                        dialogType: 'delete',
                      })
                    },
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
    ],
    []
  )

  const onSearchUpdateEvent = (value: string) => {
    setSearchStr(value)
  }

  const table = useReactTable({
    data: data?.items ?? [],
    pageCount: data?.totalCount ?? -1,
    state: {
      pagination,
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
  })

  if (isLoading) return <Loader />
  if (isError) return <Error />

  return (
    <>
      {userActionDialog && userActionDialog.dialogType === 'edit' && (
        <UserEdit
          userId={userActionDialog.userId}
          userDto={userActionDialog.userDto}
          onDismiss={() => {
            queryClient.invalidateQueries({ queryKey: [QueryNames.GetUsers] })
            setUserActionDialog(null)
          }}
        />
      )}
      {userActionDialog && userActionDialog.dialogType === 'permission' && (
        <UserPermission
          userId={userActionDialog.userId}
          userDto={userActionDialog.userDto}
          onDismiss={() => setUserActionDialog(null)}
        />
      )}
      {userActionDialog && userActionDialog.dialogType === 'delete' && (
        <DeleteUser
          user={{
            username: userActionDialog.userDto.userName!,
            userId: userActionDialog.userId,
          }}
          onDismiss={() => {
            queryClient.invalidateQueries({ queryKey: [QueryNames.GetUsers] })
            setUserActionDialog(null)
          }}
        />
      )}
      <Search onUpdate={onSearchUpdateEvent} value={searchStr ?? ''} />
      <CustomTable<IdentityUserDto>
        table={table}
        totalCount={data?.totalCount ?? 0}
        pageSize={pageSize}
      />
    </>
  )
}
