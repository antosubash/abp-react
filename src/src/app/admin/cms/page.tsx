'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { Permissions } from '@/lib/utils'
import { FileText, MessageSquare, Plus } from 'lucide-react'
import Link from 'next/link'

export default function CmsPage() {
  const { can } = useGrantedPolicies()

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">CMS Management</h1>
            <p className="text-muted-foreground">
              Manage your website content and user interactions
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pages
            </CardTitle>
            <CardDescription>Create and manage website pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Manage your website content</span>
              <Link href="/admin/cms/pages">
                <Button variant="outline" size="sm">
                  View Pages
                </Button>
              </Link>
            </div>
            {can(Permissions.CMSKIT_PAGES_CREATE) && (
              <div className="mt-4">
                <Link href="/admin/cms/pages/create">
                  <Button size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Page
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments
            </CardTitle>
            <CardDescription>Manage user comments and feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Review and moderate comments</span>
              <Link href="/admin/cms/comments">
                <Button variant="outline" size="sm">
                  View Comments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
