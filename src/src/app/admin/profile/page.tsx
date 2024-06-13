import { ProfileSettings } from '@/components/profile/ProfileSettings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <div className="w-full space-y-4 text-center">
      <Tabs value="Personal Settings" orientation="vertical">
        <TabsList className="w-full">
          <TabsTrigger value="Personal Settings" className="w-full" asChild>
            <Link href={'/admin/profile'}> Personal Settings</Link>
          </TabsTrigger>
          <TabsTrigger value="Change Password" className="w-full" asChild>
            <Link href={'/admin/profile/change-password'}>Change Password</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Personal Settings">
          <section>
            <h3 className="title m-1 grow truncate p-0 text-xl font-bold">Personal Settings</h3>
            <hr className="mb-3 mt-3" />
            <ProfileSettings />
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
