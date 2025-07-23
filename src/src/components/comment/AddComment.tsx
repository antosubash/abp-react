'use client'
import { CreateCommentInput, commentPublicCreate } from '@/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { QueryNames } from '@/lib/hooks/QueryConstants'
import { useQueryClient } from '@tanstack/react-query'
import { MessageCircle, Send, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type AddCommentProps = {
  entityType: string
  entityId: string
}

export const AddComment = ({ entityType, entityId }: AddCommentProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { handleSubmit, register, reset, watch, setValue } = useForm()

  const commentText = watch('text', '')
  const hasText = commentText.trim().length > 0

  const onSubmit = async (data: any) => {
    if (!hasText) return

    setIsSubmitting(true)
    console.log('AddComment - form data:', data)

    const comment: CreateCommentInput = {
      text: data.text,
      idempotencyToken: crypto.randomUUID(),
    }

    console.log('AddComment - comment object:', comment)

    try {
      const result = await commentPublicCreate({
        path: { entityType, entityId },
        body: comment,
      })
      console.log('AddComment - result:', result)
      if (result.error) {
        toast({
          title: 'Failed',
          description: "Comment creation wasn't successful.",
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Success',
          description: 'Comment Created Successfully',
          variant: 'default',
        })
        queryClient.invalidateQueries({
          queryKey: [QueryNames.GetPublicComments, entityType, entityId],
        })
        reset()
        setIsExpanded(false)
      }
    } catch (err: unknown) {
      console.error('Comment creation error:', err)
      let errorMessage = "Comment creation wasn't successful."

      if (err instanceof Error) {
        if (err.message.includes('network') || err.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.'
        } else if (err.message.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again.'
        } else if (err.message.includes('unauthorized') || err.message.includes('401')) {
          errorMessage =
            'You need to be logged in to comment. Please refresh the page and try again.'
        } else if (err.message.includes('forbidden') || err.message.includes('403')) {
          errorMessage = 'You do not have permission to comment on this page.'
        } else {
          errorMessage = err.message || errorMessage
        }
      }

      toast({
        title: 'Failed',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    reset()
    setIsExpanded(false)
  }

  const handleFocus = () => {
    setIsExpanded(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Add a Comment</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="relative">
          <Textarea
            {...register('text', { required: true })}
            placeholder="Share your thoughts..."
            rows={isExpanded ? 4 : 2}
            className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            onFocus={handleFocus}
            disabled={isSubmitting}
          />

          {isExpanded && (
            <div className="absolute top-2 right-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {commentText.length}/1000 characters
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={!hasText || isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Posting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-3 h-3" />
                    Post Comment
                  </div>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
