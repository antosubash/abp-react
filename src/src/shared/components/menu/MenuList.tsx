'use client'
import { MenuItemDto } from '@/client'
import Error from '@/shared/components/ui/Error'
import Loader from '@/shared/components/ui/Loader'
import { Search } from '@/shared/components/ui/Search'
import { useToast } from '@/shared/components/ui/use-toast'
import { QueryNames } from '@/shared/hooks/QueryConstants'
import { useMenuItems } from '@/shared/hooks/useMenuItems'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { DeleteMenuItem } from './DeleteMenuItem'
import { MenuTree } from './MenuTree'

export const MenuList = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [searchStr, setSearchStr] = useState<string>('')
  const [deleteDialog, setDeleteDialog] = useState<{
    menuItemId: string
    displayName: string
  } | null>(null)

  const { isLoading, data, isError } = useMenuItems(0, 1000, searchStr || undefined)

  const handleDeleteComplete = () => {
    queryClient.invalidateQueries({ queryKey: [QueryNames.GetMenuItems] })
    setDeleteDialog(null)
  }

  const handleEdit = (menuItem: MenuItemDto) => {
    window.location.href = `/admin/cms/menus/${menuItem.id}/edit`
  }

  const handleDelete = (menuItem: MenuItemDto) => {
    setDeleteDialog({
      menuItemId: menuItem.id!,
      displayName: menuItem.displayName!,
    })
  }

  if (isLoading) return <Loader />
  if (isError) return <Error />

  return (
    <div className="space-y-4">
      {deleteDialog && (
        <DeleteMenuItem
          menuItem={{
            displayName: deleteDialog.displayName,
            menuItemId: deleteDialog.menuItemId,
          }}
          onDismiss={handleDeleteComplete}
        />
      )}

      <Search onUpdate={setSearchStr} value={searchStr} />

      <div className="border rounded-lg p-4">
        <MenuTree items={data?.items || []} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  )
}
