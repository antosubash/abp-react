'use client'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useComments } from '@/lib/hooks/useComments'
import { useMemo, useState } from 'react'
import { CommentWithAuthorDto } from '@/client'
import { CustomTable } from '@/components/ui/CustomTable'
import Error from '@/components/ui/Error'
import Loader from '@/components/ui/Loader'
import { ColumnDef, PaginationState, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useToast } from '@/components/ui/use-toast'
import { PermissionActions } from '../permission/PermissionActions'
import { DeleteComment } from './DeleteComment'
import { CommentEdit } from './CommentEdit'
import { AddComment } from './AddComment'
import { Search } from '@/components/ui/Search'
import { useQueryClient } from '@tanstack/react-query'

type CommentActionDialogState = {
  commentId: string
  commentDto: CommentWithAuthorDto
  dialogType: 'edit' | 'delete'
} | null

export const CommentList = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [searchStr, setSearchStr] = useState<string>('')
  const [commentActionDialog, setCommentActionDialog] = useState<CommentActionDialogState>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { isLoading, data, isError, error } = useComments(
    pagination.pageIndex,
    pagination.pageSize,
    searchStr || undefined
  )

  const handleActionComplete = () => {
    queryClient.invalidateQueries({ queryKey: [QueryNames.GetComments] })
    setCommentActionDialog(null)
  }

  const columns = useMemo(() => getCommentColumns({
    onEdit: (comment) => setCommentActionDialog({
      commentId: comment.id!,
      commentDto: comment,
      dialogType: 'edit'
    }),
    onDelete: (comment) => setCommentActionDialog({
      commentId: comment.id!,
      commentDto: comment,
      dialogType: 'delete'
    })
  }), [])

  const table = useReactTable({
    data: (data as any)?.items ?? [],
    pageCount: (data as any)?.totalCount ?? -1,
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
      {commentActionDialog && (
        <>
          {commentActionDialog.dialogType === 'edit' && (
            <CommentEdit
              commentId={commentActionDialog.commentId}
              commentDto={commentActionDialog.commentDto}
              onDismiss={handleActionComplete}
            />
          )}
          {commentActionDialog.dialogType === 'delete' && (
            <DeleteComment
              comment={{
                commentId: commentActionDialog.commentId,
                text: commentActionDialog.commentDto.text!,
              }}
              onDismiss={handleActionComplete}
            />
          )}
        </>
      )}
      <AddComment entityType="BlogPost" entityId="all" />
      <Search 
        onUpdate={setSearchStr} 
        value={searchStr}
      />
      <CustomTable<CommentWithAuthorDto>
        table={table}
        totalCount={(data as any)?.totalCount ?? 0}
        pageSize={pagination.pageSize}
      />
    </>
  )
}

// Add this to a separate file: columns.ts
const getCommentColumns = (actions: {
  onEdit: (comment: CommentWithAuthorDto) => void
  onDelete: (comment: CommentWithAuthorDto) => void
}): ColumnDef<CommentWithAuthorDto>[] => [
  {
    header: 'Comment Management',
    columns: [
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (info) => (
          <PermissionActions
            actions={[
              {
                icon: 'pencil',
                policy: 'CmsKit.Comments.Update',
                callback: () => actions.onEdit(info.row.original),
              },
              {
                icon: 'trash',
                policy: 'CmsKit.Comments.Delete',
                callback: () => actions.onDelete(info.row.original),
              },
            ]}
          />
        ),
      },
      {
        accessorKey: 'text',
        header: 'Comment Text',
        cell: (info) => {
          const text = info.getValue() as string
          return text.length > 100 ? `${text.substring(0, 100)}...` : text
        },
      },
      {
        accessorKey: 'author.name',
        header: 'Author',
        cell: (info) => info.row.original.author?.name || 'Unknown',
      },
      {
        accessorKey: 'creationTime',
        header: 'Created',
        cell: (info) => {
          const date = new Date(info.getValue() as string)
          return date.toLocaleDateString()
        },
      },
      {
        accessorKey: 'isApproved',
        header: 'Approved',
        cell: (info) => (info.getValue() ? 'Yes' : 'No'),
      },
      {
        accessorKey: 'entityType',
        header: 'Entity Type',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'entityId',
        header: 'Entity ID',
        cell: (info) => info.getValue(),
      },
    ],
  },
] 