import { Toaster } from "@/components/ui/toaster"

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {children}
    </div>
  )
} 