'use client'
import { Toaster } from '@/shared/components/ui'

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {children}
    </div>
  )
}
