import { TenantService, TenantUpdateDto } from "@abpreact/proxy";
import { QueryNames } from "@abpreact/hooks";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Shared/DialogWrapper";
import { Button } from "../Shared/Button";

export type TenantEditProps = {
  name: string;
  id: string;
  isOpen: boolean;
  closeModal: () => void;
};

export const TenantEdit = ({
  name,
  id,
  isOpen,
  closeModal,
}: TenantEditProps) => {
  const [tenantName, setTenantName] = useState<string>();
  const queryClient = useQueryClient();
  const tenantUpdate = async () => {
    const tenant = {} as TenantUpdateDto;
    tenant.name = tenantName!;
    const updated = await TenantService.tenantUpdate(id, tenant);
    if (updated) {
      queryClient.invalidateQueries([QueryNames.GetTenants]);
      closeModal();
    }
  };

  useEffect(() => {
    setTenantName(name);
  }, [name]);

  return (
    <Dialog>
      <DialogTrigger className="flex items-center pb-5" asChild>
        <h3 className="title font-bold text-xl grow p-0 m-1">
          Tenant Management
        </h3>
        <Button variant="default">Create New Tenant</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Tenant</DialogTitle>
        </DialogHeader>
        {name}
      </DialogContent>
    </Dialog>
  );
};
