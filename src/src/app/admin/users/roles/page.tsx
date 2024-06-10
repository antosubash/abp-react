import { AddRole } from "@/components/role/AddRole";
import { RoleList } from "@/components/role/RoleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserList } from "@/components/user/UserList";
import Link from "next/link";

export default function RolesPage() {
  const users = "Users";
  const roles = "Roles";
  return (
    <div className="max-w-md w-full space-y-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        Roles
      </h1>
      <div className="w-full">
        <Tabs value={roles}>
          <TabsList className="w-full">
            <TabsTrigger value={users} className="w-full" asChild>
              <Link href={"/admin/users"}>{users}</Link>
            </TabsTrigger>
            <TabsTrigger value={roles} className="w-full" asChild>
              <Link href={"/admin/users/roles"}>{roles}</Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={users}>
            <UserList />
          </TabsContent>
          <TabsContent value={roles}>
            <AddRole />
            <RoleList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}