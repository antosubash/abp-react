import { FeatureManagement } from '@/components/settings/FeatureManagement'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function FeatureManagementPage() {
  const emailing = 'emailing'
  const featureManagement = 'feature_management'
  return (
    <div className="w-full space-y-4 text-center">
      <Tabs value={featureManagement} orientation="vertical">
        <TabsList className="w-full">
          <TabsTrigger value={emailing} className="w-full" asChild>
            <Link href={'/admin/settings'}>Emailing</Link>
          </TabsTrigger>
          <TabsTrigger value={featureManagement} className="w-full" asChild>
            <Link href={'/admin/settings/feature_management'}>Feature management</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={emailing}></TabsContent>
        <TabsContent value={featureManagement}>
          <FeatureManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
