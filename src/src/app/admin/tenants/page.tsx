import { AddTenant } from '@/components/tenant/AddTenant'
import { TenantList } from '@/components/tenant/TenantList'
import { Tabs, TabsContent } from '@/components/ui/tabs'

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
