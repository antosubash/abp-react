'use client'

import { commentPublicCreate, CommentWithDetailsDto } from '@/client'
import { usePublicComments } from '@/features/comments/hooks/usePublicComments'
import { useCurrentUser } from '@/features/user-management/hooks/useCurrentUser'
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'
import { Textarea } from '@/shared/components/ui/textarea'
import { useToast } from '@/shared/components/ui/use-toast'
import { QueryNames } from '@/shared/hooks/QueryConstants'
import { useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { MessageCircle, Reply, Send } from 'lucide-react'
import { useState } from 'react'
import { AddComment } from './AddComment'

export type PageCommentsProps = {
  pageId: string
  pageTitle: string
}

export const PageComments = ({ pageId, pageTitle }: PageCommentsProps) => {
  const { data: commentsData, isLoading, isError } = usePublicComments('Page', pageId)
  const currentUser = useCurrentUser()
  const isAuthenticated = currentUser?.isAuthenticated || false

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Loading comments...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <MessageCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Comments Unavailable</h3>
            <p className="text-muted-foreground mb-4">
              We&apos;re having trouble loading comments right now. This might be a temporary issue.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()} size="sm">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Handle both possible response formats - cast to any to work around type issues
  const comments = (commentsData as any)?.items || (Array.isArray(commentsData) ? commentsData : [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment Section - Only show if authenticated */}
        {isAuthenticated ? (
          <div className="pb-4">
            <AddComment entityType="Page" entityId={pageId} />
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground bg-muted/30 rounded-lg">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>
              Please{' '}
              <a href="/auth/login" className="text-primary hover:underline font-medium">
                login
              </a>{' '}
              to add a comment.
            </p>
          </div>
        )}

        {comments.length > 0 && <Separator />}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment: CommentWithDetailsDto) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                isAuthenticated={isAuthenticated}
                pageId={pageId}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

type CommentItemProps = {
  comment: CommentWithDetailsDto
  isAuthenticated: boolean
  pageId: string
}

const CommentItem = ({ comment, isAuthenticated, pageId }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const authorName = comment.author?.name || 'Anonymous'
  const authorInitials = authorName
    .split(' ')
    .map((name: string) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const creationDate = comment.creationTime
    ? formatDistanceToNow(new Date(comment.creationTime), { addSuffix: true })
    : 'Unknown date'

  const handleReply = async () => {
    if (!replyText.trim()) return

    try {
      await commentPublicCreate({
        path: { entityType: 'Page', entityId: pageId },
        body: {
          text: replyText,
          repliedCommentId: comment.id,
          idempotencyToken: crypto.randomUUID(),
        },
      })

      toast({
        title: 'Success',
        description: 'Reply posted successfully',
        variant: 'default',
      })

      queryClient.invalidateQueries({ queryKey: [QueryNames.GetPublicComments, 'Page', pageId] })
      setIsReplying(false)
      setReplyText('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to post reply',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {authorInitials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{authorName}</span>
              <span className="text-xs text-muted-foreground">{creationDate}</span>
            </div>

            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
                className="text-xs"
              >
                <Reply className="w-3 h-3 mr-1" />
                Reply
              </Button>
            )}
          </div>

          <div className="text-sm">{comment.text}</div>
        </div>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="ml-14 space-y-3">
          <div className="relative">
            <Textarea
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              className="text-sm resize-none"
              autoFocus
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">{replyText.length}/500 characters</div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsReplying(false)
                  setReplyText('')
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="min-w-[80px]"
              >
                <Send className="w-3 h-3 mr-1" />
                Reply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 space-y-3">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-3 p-3 bg-muted/20 rounded-lg">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  {(reply.author?.name || 'A').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-xs">{reply.author?.name || 'Anonymous'}</span>
                  <span className="text-xs text-muted-foreground">
                    {reply.creationTime
                      ? formatDistanceToNow(new Date(reply.creationTime), { addSuffix: true })
                      : 'Unknown date'}
                  </span>
                </div>

                <div className="text-xs">{reply.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
