'use client'
import { CommentList } from '@/components/comment/CommentList'

export default function CmsCommentsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Comments</h1>
            <p className="text-muted-foreground">Manage user comments and feedback</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <CommentList />
      </div>
    </div>
  )
} 