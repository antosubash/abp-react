import { Emailing } from '@/components/settings/Emailing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function SettingsPage() {
  const emailing = 'emailing'
  const featureManagement = 'feature_management'
  return (
    <div className="w-full space-y-4 text-center">
      <Tabs value={emailing} orientation="vertical">
        <TabsList className="w-full">
          <TabsTrigger value={emailing} className="w-full" asChild>
            <Link href={'/admin/settings'}>Emailing</Link>
          </TabsTrigger>
          <TabsTrigger value={featureManagement} className="w-full" asChild>
            <Link href={'/admin/settings/feature-management'}>Feature management</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={emailing}>
          <Emailing />
        </TabsContent>
        <TabsContent value={featureManagement}></TabsContent>
      </Tabs>
    </div>
  )
}
