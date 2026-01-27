'use client'
import { MenuItemDto } from '@/client'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { useGrantedPolicies } from '@/features/permissions/hooks/useGrantedPolicies'
import { Permissions } from '@/shared/lib/utils'
import { ChevronDown, ChevronRight, FileText, Folder } from 'lucide-react'
import { useState } from 'react'

type TreeMenuItem = MenuItemDto & {
  children?: TreeMenuItem[]
}

interface MenuTreeProps {
  items: MenuItemDto[]
  onEdit?: (item: MenuItemDto) => void
  onDelete?: (item: MenuItemDto) => void
}

interface TreeNodeProps {
  item: TreeMenuItem
  level: number
  onEdit?: (item: MenuItemDto) => void
  onDelete?: (item: MenuItemDto) => void
}

const TreeNode = ({ item, level, onEdit, onDelete }: TreeNodeProps) => {
  const { can } = useGrantedPolicies()
  const children = item.children || []
  const [isExpanded, setIsExpanded] = useState(level === 0)
  const hasChildren = children.length > 0

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors ${
          level > 0 ? 'ml-4' : ''
        }`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
      >
        <div className="flex items-center gap-2 flex-1">
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <div className="w-6" />
          )}

          <div className="flex items-center gap-2">
            {hasChildren ? (
              <Folder className="h-4 w-4 text-blue-500" />
            ) : (
              <FileText className="h-4 w-4 text-gray-500" />
            )}
            <span className="font-medium">{item.displayName}</span>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {item.url && (
              <Badge variant="outline" className="text-xs">
                {item.url}
              </Badge>
            )}
            {!item.isActive && (
              <Badge variant="secondary" className="text-xs">
                Inactive
              </Badge>
            )}
            {item.order !== undefined && (
              <Badge variant="outline" className="text-xs">
                Order: {item.order}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && can(Permissions.CMSKIT_MENUS_UPDATE) && (
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="h-8 w-8 p-0">
              <FileText className="h-4 w-4" />
            </Button>
          )}
          {onDelete && can(Permissions.CMSKIT_MENUS_DELETE) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item)}
              className="h-8 w-8 p-0 text-destructive"
            >
              <FileText className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="mt-1">
          {children.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const MenuTree = ({ items, onEdit, onDelete }: MenuTreeProps) => {
  // Build tree structure
  const buildTree = (menuItems: MenuItemDto[]): TreeMenuItem[] => {
    const itemMap = new Map<string, TreeMenuItem>()
    const rootItems: TreeMenuItem[] = []

    // First pass: create a map of all items
    menuItems.forEach((item) => {
      if (item.id) {
        itemMap.set(item.id, { ...item, children: [] })
      }
    })

    // Second pass: build the tree structure
    menuItems.forEach((item) => {
      if (item.id) {
        const treeItem = itemMap.get(item.id)
        if (treeItem) {
          if (item.parentId && itemMap.has(item.parentId)) {
            const parent = itemMap.get(item.parentId)
            if (parent) {
              parent.children = parent.children || []
              parent.children.push(treeItem)
            }
          } else {
            rootItems.push(treeItem)
          }
        }
      }
    })

    return rootItems
  }

  const treeItems = buildTree(items)

  return (
    <div className="space-y-1">
      {treeItems.map((item) => (
        <TreeNode key={item.id} item={item} level={0} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
