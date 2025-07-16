'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '@/lib/utils'
import { useEffect, useCallback } from 'react'
import { processHTMLOutput, processHTMLInput } from '@/lib/html-utils'

export interface TiptapEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const TiptapEditor = ({ 
  value, 
  onChange, 
  placeholder = 'Start writing your content...', 
  className 
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: processHTMLInput(value),
    onUpdate: ({ editor }) => {
      const rawHTML = editor.getHTML()
      const processedHTML = processHTMLOutput(rawHTML)
      onChange(processedHTML)
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
          'min-h-[200px] p-4 border border-input rounded-md',
          className
        ),
      },
    },
  })

  // Handle content updates when value prop changes
  useEffect(() => {
    if (editor && value !== undefined) {
      const currentContent = editor.getHTML()
      const processedValue = processHTMLInput(value)
      
      // Only update if content actually differs to prevent unnecessary re-renders
      if (currentContent !== processedValue) {
        editor.commands.setContent(processedValue, { emitUpdate: false })
      }
    }
  }, [editor, value])

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
    </div>
  )
}