'use client'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useMenuItems } from '@/lib/hooks/useMenuItems'
import { useState } from 'react'
import { MenuItemDtoReadable } from '@/client'
import Error from '@/components/ui/Error'
import Loader from '@/components/ui/Loader'
import { useToast } from '@/components/ui/use-toast'
import { DeleteMenuItem } from './DeleteMenuItem'
import { Search } from '@/components/ui/Search'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Edit3, Trash2 } from 'lucide-react'
import { MenuTree } from './MenuTree'

export const MenuList = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [searchStr, setSearchStr] = useState<string>('')
  const [deleteDialog, setDeleteDialog] = useState<{ menuItemId: string; displayName: string } | null>(null)

  const { isLoading, data, isError } = useMenuItems(0, 1000, searchStr || undefined)

  const handleDeleteComplete = () => {
    queryClient.invalidateQueries({ queryKey: [QueryNames.GetMenuItems] })
    setDeleteDialog(null)
  }

  const handleEdit = (menuItem: MenuItemDtoReadable) => {
    window.location.href = `/admin/cms/menus/${menuItem.id}/edit`
  }

  const handleDelete = (menuItem: MenuItemDtoReadable) => {
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
      
      <Search 
        onUpdate={setSearchStr} 
        value={searchStr}
      />
      
      <div className="border rounded-lg p-4">
        <MenuTree
          items={data?.items || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
} 