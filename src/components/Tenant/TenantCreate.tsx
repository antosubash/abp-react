import React, { useState } from "react";
import DialogWrapper from "../Shared/DialogWrapper";
import Swal from "sweetalert2";
import { useQueryClient } from "react-query";
import { QueryNames } from "@abp/utils/Constants";
import Form from "../Shared/Form";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import { TenantCreateDto, TenantService } from "@abp/generated/api";
type Props = {};

const TenantCreate = (props: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const onSubmit = async (data: any) => {
    var tenant = data as TenantCreateDto;
    var created = await TenantService.tenantCreate(tenant);
    if (created) {
      queryClient.invalidateQueries(QueryNames.GetTenants);
      setIsOpen(false);
      Swal.fire("Success", "Tenant Created Successfully", "success");
    }
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="float-right">
        <Button displayText="New Tenant" onClick={openModal} />
      </div>
      <DialogWrapper isOpen={isOpen} title="Create tenant" onClose={closeModal}>
        <Form onSubmit={onSubmit} onCancel={closeModal}>
          <Input
            required
            placeholder="Enter your tenant name"
            name="name"
            displayName="Name"
          />
          <Input
            required
            placeholder="yourmail@provider.com"
            name="adminEmailAddress"
            displayName="Email"
            type="email"
          />
          <Input
            required
            placeholder="Password"
            name="adminPassword"
            displayName="Password"
            type="password"
          />
        </Form>
      </DialogWrapper>
    </>
  );
};

export default TenantCreate;
