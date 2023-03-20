import { useEffect, useState, useMemo } from "react";
import { IdentityUserUpdateDto, UserService, GetPermissionListResultDto, PermissionGroupDto } from "@abpreact/proxy";
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
import { PermissionProvider, Permissions } from '../utils';
import { Permission  } from "../Permission/Permission";
import { Label } from "../Shared/Label";


type UserPermissionProps = {
    userId: string;
    userDto: IdentityUserUpdateDto;
    onDismiss: () => void;
}

export const UserPermission = ({userDto, userId, onDismiss}: UserPermissionProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();

    const { data } = usePermissions(PermissionProvider.NAME, PermissionProvider.KEY);
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
    }, []);

    const permissionGroups = useMemo(() => data?.groups, [data]);
    
    return (
        <Dialog open={open} onOpenChange={onCloseEvent}>
            <DialogContent className="text-white">
            <DialogHeader>
                <DialogTitle>Permissions - {userDto.userName}</DialogTitle>
            </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex pt-5 items-start">
                            <section className="flex flex-col space-y-5">
                                <Permission name="Grant All Permissions"
                                    isGranted={false} 
                                    id="all" 
                                    onUpdate={() => console.log('all permisions')} 
                                    className="ml-2"
                                 />
                                 <hr className="border-b-white" />
                                {permissionGroups?.map(((permission: PermissionGroupDto, idx: number) => (
                                    <Button key={idx} variant="outline">
                                        <Label>{permission?.displayName}</Label>
                                    </Button>
                                )))}
                            </section>
                            <section className="grow ml-10">
                                <Permission name="Select All"
                                    isGranted={false} 
                                    id="select_all" 
                                    onUpdate={() => console.log('Select All')} 
                                    className="ml-2"
                                 />
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