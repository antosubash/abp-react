import { useQueryClient } from "@tanstack/react-query";
import { IdentityUserCreateDto, UserService } from "@abpreact/proxy";
import { QueryNames } from "@abpreact/hooks";

import { Button } from "../Shared/Button";
import { useToast  } from "../Shared/hooks/useToast";
import {   
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger, } from "../Shared/DialogWrapper";
import { Input } from "../Shared/Input";
import { useForm } from "react-hook-form";

export type AddUserProps = {};

export const AddUser = ({}: AddUserProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient();
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data: any) => {
    const user = data as IdentityUserCreateDto;
    try {
      await UserService.userCreate(user);
      await queryClient.invalidateQueries([QueryNames.GetUsers]);
      toast({
        title: "Success",
        description:  "User Created Successfully",
        variant: "default"
      });
    }catch(err: unknown) {
      if(err instanceof Error) {
        toast({
          title: "Failed",
          description:  "User Creation wasn't successfull.",
          variant: "destructive"
        });
      }
    }
  };


  return ( 
    <section className="p-3">
      <Dialog>
        <DialogTrigger asChild>
          <section className="flex items-center pb-5">
            <h3 className="title font-bold text-xl grow p-0 m-1">User Management</h3>
            <Button variant="default" >Create New User</Button>
          </section>
        </DialogTrigger>
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle>Create a New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="grid grid-cols-2 gap-2 pb-5">
              <Input
                required
                placeholder="Enter username"
                {...register('username')}
            
              />
              <Input
                required
                placeholder="Password"
                {...register('password')}
            
              />
              <Input required placeholder="Name" {...register('name')}  />
              <Input
                required
                placeholder="Surname"
                {...register('surname')}
              />
              <Input
                required
                placeholder="Email"
                {...register('email')}
              />
              <Input
                required
                placeholder="Phone Number"
               {...register('phoneNumber')}
              />
            </section>
            <DialogFooter>
              <Button type="submit" variant="outline">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};