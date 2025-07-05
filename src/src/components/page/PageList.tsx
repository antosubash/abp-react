'use client'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { usePages } from '@/lib/hooks/usePages'
import { useMemo, useState } from 'react'
import { VoloCmsKitAdminPagesPageDtoReadable } from '@/client'
import { CustomTable } from '@/components/ui/CustomTable'
import Error from '@/components/ui/Error'
import Loader from '@/components/ui/Loader'
import { ColumnDef, PaginationState, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useToast } from '@/components/ui/use-toast'
import { PermissionActions } from '../permission/PermissionActions'
import { DeletePage } from './DeletePage'
import { Search } from '@/components/ui/Search'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

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

  const columns = useMemo(() => getPageColumns({
    onEdit: (page) => {
      // Navigate to edit page
      window.location.href = `/admin/cms/pages/${page.id}/edit`
    },
    onDelete: (page) => setDeleteDialog({
      pageId: page.id!,
      title: page.title!,
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
      {deleteDialog && (
        <DeletePage
          page={{
            title: deleteDialog.title,
            pageId: deleteDialog.pageId,
          }}
          onDismiss={handleDeleteComplete}
        />
      )}
      <Search 
        onUpdate={setSearchStr} 
        value={searchStr}
      />
      <CustomTable<VoloCmsKitAdminPagesPageDtoReadable>
        table={table}
        totalCount={data?.totalCount ?? 0}
        pageSize={pagination.pageSize}
      />
    </>
  )
}

const getPageColumns = (actions: {
  onEdit: (page: VoloCmsKitAdminPagesPageDtoReadable) => void
  onDelete: (page: VoloCmsKitAdminPagesPageDtoReadable) => void
}): ColumnDef<VoloCmsKitAdminPagesPageDtoReadable>[] => [
  {
    header: 'Page Management',
    columns: [
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (info) => (
          <PermissionActions
            actions={[
              {
                icon: 'pencil',
                policy: 'CmsKit.Pages.Update',
                callback: () => actions.onEdit(info.row.original),
              },
              {
                icon: 'trash',
                policy: 'CmsKit.Pages.Delete',
                callback: () => actions.onDelete(info.row.original),
              },
            ]}
          />
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