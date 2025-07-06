'use client'
import { PageList } from '@/components/page/PageList'
import { Button } from '@/components/ui/button'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { Permissions } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function CmsPagesPage() {
  const { can } = useGrantedPolicies()

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pages</h1>
            <p className="text-muted-foreground">Manage your website pages</p>
          </div>
          {can(Permissions.CMSKIT_PAGES_CREATE) && (
            <Link href="/admin/cms/pages/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Page
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <PageList />
      </div>
    </div>
  )
} 