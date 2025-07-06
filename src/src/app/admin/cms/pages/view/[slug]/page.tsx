'use client'
import { PageView } from '@/components/page/PageView'
import { usePageBySlug } from '@/lib/hooks/usePages'
import { useParams } from 'next/navigation'
import Loader from '@/components/ui/Loader'
import Error from '@/components/ui/Error'
import { VoloCmsKitContentsPageDto } from '@/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PageViewPage() {
  const params = useParams()
  const slug = params.slug as string

  const { data: page, isLoading, isError } = usePageBySlug(slug)

  if (isLoading) return <Loader />
  if (isError) return <Error />

  if (!page) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The page with slug &quot;{slug}&quot; could not be found.
          </p>
          <div className="flex gap-2 justify-center">
            <Link href="/admin/cms/pages">
              <Button variant="outline">Back to Pages</Button>
            </Link>
            <Link href="/admin/cms/pages/create">
              <Button>Create New Page</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <PageView page={page as VoloCmsKitContentsPageDto} />
} 