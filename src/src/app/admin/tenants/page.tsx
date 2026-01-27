import { AddTenant } from '@/features/tenant-management/components/tenant/AddTenant'
import { TenantList } from '@/features/tenant-management/components/tenant/TenantList'
import { Tabs, TabsContent } from '@/shared/components/ui/tabs'

export default function TenantPage() {
  return (
    <div className="w-full">
      <AddTenant />
      <Tabs value="tenants">
        <TabsContent value="tenants">
          <TenantList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
