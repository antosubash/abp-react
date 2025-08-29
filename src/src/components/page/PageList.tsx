'use client'
import { useQueryClient } from '@tanstack/react-query'
import {
  type ColumnDef,
  getCoreRowModel,
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import type { VoloCmsKitAdminPagesPageDto } from '@/client'
import { Button } from '@/components/ui/button'
import { CustomTable } from '@/components/ui/CustomTable'
import Error from '@/components/ui/Error'
import Loader from '@/components/ui/Loader'
import { Search } from '@/components/ui/Search'
import { useToast } from '@/components/ui/use-toast'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { usePages } from '@/lib/hooks/usePages'
import { Permissions } from '@/lib/utils'
import { PermissionActions } from '../permission/PermissionActions'
import { DeletePage } from './DeletePage'

export const PageList = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [searchStr, setSearchStr] = useState<string>('')
  const [deleteDialog, setDeleteDialog] = useState<{ pageId: string; title: string } | null>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { isLoading, data, isError, error } = usePages(
    pagination.pageIndex,
    pagination.pageSize,
    searchStr || undefined
  )

  const handleDeleteComplete = () => {
    queryClient.invalidateQueries({ queryKey: [QueryNames.GetPages] })
    setDeleteDialog(null)
  }

  const columns = useMemo(
    () =>
      getPageColumns({
        onView: (page) => {
          // Navigate to view page using slug
          window.location.href = `/pages/${page.slug}`
        },
        onEdit: (page) => {
          // Navigate to edit page
          window.location.href = `/admin/cms/pages/${page.id}/edit`
        },
        onDelete: (page) =>
          setDeleteDialog({
            pageId: page.id!,
            title: page.title!,
          }),
      }),
    []
  )

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
      {deleteDialog && (
        <DeletePage
          page={{
            title: deleteDialog.title,
            pageId: deleteDialog.pageId,
          }}
          onDismiss={handleDeleteComplete}
        />
      )}
      <Search onUpdate={setSearchStr} value={searchStr} />
      <CustomTable<VoloCmsKitAdminPagesPageDto>
        table={table}
        totalCount={data?.totalCount ?? 0}
        pageSize={pagination.pageSize}
      />
    </>
  )
}

const getPageColumns = (actions: {
  onView: (page: VoloCmsKitAdminPagesPageDto) => void
  onEdit: (page: VoloCmsKitAdminPagesPageDto) => void
  onDelete: (page: VoloCmsKitAdminPagesPageDto) => void
}): ColumnDef<VoloCmsKitAdminPagesPageDto>[] => [
  {
    header: 'Page Management',
    columns: [
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => actions.onView(info.row.original)}>
              View
            </Button>
            <PermissionActions
              actions={[
                {
                  icon: 'pencil',
                  policy: Permissions.CMSKIT_PAGES_UPDATE,
                  callback: () => actions.onEdit(info.row.original),
                },
                {
                  icon: 'trash',
                  policy: Permissions.CMSKIT_PAGES_DELETE,
                  callback: () => actions.onDelete(info.row.original),
                },
              ]}
            />
          </div>
        ),
      },
      {
        accessorKey: 'title',
        header: 'Title',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'slug',
        header: 'Slug',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'isHomePage',
        header: 'Home Page',
        cell: (info) => (info.getValue() ? 'Yes' : 'No'),
      },
      {
        accessorKey: 'creationTime',
        header: 'Created',
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      },
    ],
  },
]
