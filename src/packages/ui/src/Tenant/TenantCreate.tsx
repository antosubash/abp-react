import { useState } from "react";
import {   
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, } from "../Shared/DialogWrapper";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { QueryNames } from "@abpreact/hooks";
import { Input } from "../Shared/Input";
import { Button } from "../Shared/Button";
import { TenantCreateDto, TenantService } from "@abpreact/proxy";
export type TenantCreateProps = {};

export const TenantCreate = (props: TenantCreateProps) => {
  let [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const onSubmit = async (data: any) => {
    var tenant = data as TenantCreateDto;
    var created = await TenantService.tenantCreate(tenant);
    if (created) {
      queryClient.invalidateQueries([QueryNames.GetTenants]);
      setIsOpen(false);
      Swal.fire("Success", "Tenant Created Successfully", "success");
    }
  };


  return (
    <section className="p-3">
      <Dialog>
        <DialogTrigger className="flex items-center pb-5" asChild>
           <h3 className="title font-bold text-xl grow p-0 m-1">Tenant Management</h3>
          <Button variant="default">Create New Tenant</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Tenant</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <Input
              required
              placeholder="Enter your tenant name"
              name="name"
            />
            <Input
              required
              placeholder="yourmail@provider.com"
              name="adminEmailAddress"
            
              type="email"
            />
            <Input
              required
              placeholder="Password"
              name="adminPassword"
              type="password"
            />
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};