import { useEffect, useState } from "react";
import { IdentityUserUpdateDto, UserService, GetPermissionListResultDto } from "@abpreact/proxy";
import { useForm } from "react-hook-form";
import { useToast } from "../Shared/hooks/useToast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../Shared/DialogWrapper";
import { Button } from "../Shared/Button";
import {  usePermissions } from "@abpreact/hooks";

type UserPermissionProps = {
    userId: string;
    userDto: IdentityUserUpdateDto;
    onDismiss: () => void;
}

export const UserPermission = ({userDto, userId, onDismiss}: UserPermissionProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();
    const [permissons, setPermissons] = useState<GetPermissionListResultDto>();
    const { data } = usePermissions('T', undefined);
    const onSubmit = async (data: unknown) => {
        const user = data as IdentityUserUpdateDto;
        try {
          await UserService.userUpdate(userId, {...userDto, ...user});
          toast({
            title: "Success",
            description: "User Updated Successfully",
            variant: "default",
          });
          setOpen(false);
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
    }

    useEffect(() => {
        setOpen(true);
        setPermissons(data);
    }, []);

    console.log(permissons, 'permissions');
    return (
        <Dialog open={open} onOpenChange={onCloseEvent}>
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle>Upate User Permission: {userDto.userName}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex pb-5">
                <section className="bg-black min-h-full w-48">
                    <h1>Option</h1>
                </section>
                <section className="bg-black min-h-full grow">
                    <h1>Option 2</h1>
                </section>
            </section>
            <DialogFooter>
              <Button type="submit" variant="outline">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  
    )
}