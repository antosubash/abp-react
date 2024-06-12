import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { IdentityRoleDto, IdentityUserUpdateDto, userUpdate } from "@/client";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserRoles } from "@/lib/hooks/useUserRoles";
import { useAssignableRoles } from "@/lib/hooks/useAssignableRoles";
import Loader from "@/components/ui/Loader";
import classNames from "clsx";
import { Checkbox } from "@/components/ui/checkbox";

const TABS_NAME = {
  USERS_EDIT: "user_edit",
  USERS_ROLE_ASSIGN: "user_role_assign",
};

type RoleType = {
  name: string;
  id: string;
};

type UserEditProps = {
  userDto: IdentityUserUpdateDto;
  userId: string;
  onDismiss: () => void;
};
export const UserEdit = ({ userDto, userId, onDismiss }: UserEditProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { handleSubmit, register } = useForm();
  const [roles, setRoles] = useState<RoleType[]>([]);
  const userRole = useUserRoles({ userId });
  const assignableRoles = useAssignableRoles();

  const onSubmit = async (data: unknown) => {
    const user = data as IdentityUserUpdateDto;
    try {
      await userUpdate({
        id: userId,
        requestBody: { ...userDto, ...user },
      });
      toast({
        title: "Success",
        description: "User Updated Successfully",
        variant: "default",
      });
      onCloseEvent();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Failed",
          description: "User update wasn't successfull.",
          variant: "destructive",
        });
      }
    }
  };

  const onCloseEvent = () => {
    setOpen(false);
    onDismiss();
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (userRole.data?.items) {
      const temp: RoleType[] = [];
      userRole.data.items.forEach((r) => {
        temp.push({ name: r.name!, id: r.id! });
      });
      setRoles(temp);
    }
  }, [userRole.data?.items]);

  const onRoleAssignEvent = useCallback(
    (role: IdentityRoleDto) => {
      const hasAssignedRoleExistAlready = roles.findIndex(
        (r) => role.id === r.id
      );

      console.log(hasAssignedRoleExistAlready, "hasAssignedRoleExistAlready");
      if (hasAssignedRoleExistAlready !== -1) {
        roles.splice(hasAssignedRoleExistAlready, 1);
        setRoles([...roles]);
      } else {
        roles.push({ name: role.name!, id: role.id! });
        setRoles([...roles]);
      }
    },
    [roles]
  );

  const onRoleAssignedSaveEvent = async (e: MouseEvent) => {
    e.preventDefault();
    const updateUserDto: IdentityUserUpdateDto = {
      ...userDto,
      roleNames: roles?.map((r) => r.name) ?? [],
    };
    await onSubmit(updateUserDto);
  };
  return (
    <Dialog open={open} onOpenChange={onCloseEvent}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upate a User: {userDto.userName}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={TABS_NAME.USERS_EDIT}>
          <TabsList className="w-full">
            <TabsTrigger value={TABS_NAME.USERS_EDIT} className="w-full">
              User Information
            </TabsTrigger>
            <TabsTrigger value={TABS_NAME.USERS_ROLE_ASSIGN} className="w-full">
              Roles
            </TabsTrigger>
          </TabsList>
          <TabsContent value={TABS_NAME.USERS_EDIT}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <section className="flex flex-col space-y-5">
                <Input
                  required
                  placeholder="Name"
                  defaultValue={userDto.name ?? ""}
                  {...register("name")}
                />

                <Input
                  required
                  placeholder="Surname"
                  defaultValue={userDto.surname ?? ""}
                  {...register("surname")}
                />
                <Input
                  required
                  placeholder="Email"
                  defaultValue={userDto.email ?? ""}
                  {...register("email")}
                />
                <Input
                  required
                  placeholder="Phone Number"
                  defaultValue={userDto.phoneNumber ?? ""}
                  {...register("phoneNumber")}
                />
              </section>

              <DialogFooter className="mt-5">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onCloseEvent();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value={TABS_NAME.USERS_ROLE_ASSIGN}>
            {assignableRoles?.isLoading && <Loader />}
            {assignableRoles?.isError && (
              <div className="p-10 bg-error  text-3xl">
                There was an error while featching roles information for the{" "}
                {userDto.userName}
              </div>
            )}
            {!assignableRoles.isLoading && !assignableRoles.isError && (
              <>
                {assignableRoles?.data?.items?.map((r) => (
                  <div
                    key={v4()}
                    className={classNames("flex items-center space-x-2 pb-5")}
                  >
                    <Checkbox
                      id={r.id}
                      name={r.name!}
                      checked={!!roles?.find((l) => l.id === r.id)}
                      onCheckedChange={() => {
                        onRoleAssignEvent(r);
                      }}
                    />
                    <label
                      htmlFor={r.id}
                      className="text-sm  font-medium leading-none"
                    >
                      {r.name}
                    </label>
                  </div>
                ))}
              </>
            )}
            <DialogFooter className="mt-5">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onCloseEvent();
                }}
              >
                Cancel
              </Button>
              <Button onClick={onRoleAssignedSaveEvent}>
                Save
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
