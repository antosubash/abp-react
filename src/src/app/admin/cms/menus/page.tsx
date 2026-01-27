'use client'
import { MenuList } from '@/shared/components/menu/MenuList'
import { Button } from '@/shared/components/ui/button'
import { useGrantedPolicies } from '@/features/permissions/hooks/useGrantedPolicies'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function CmsMenusPage() {
  const { can } = useGrantedPolicies()

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Menu Items</h1>
            <p className="text-muted-foreground">Manage your website menu items</p>
          </div>
          <Link href="/admin/cms/menus/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New Menu Item
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <MenuList />
      </div>
    </div>
  )
}
