
import { QueryNames } from "@abp/utils/Constants";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";
import Input from "@abp/components/Shared/Input";
import Button from "@abp/components/Shared/Button";
import DialogWrapper from "@abp/components/Shared/DialogWrapper";
import Form from "@abp/components/Shared/Form";
import { IdentityUserCreateDto, UserService } from "@abp/generated/api";

type Props = {};

const AddUser = (props: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const onSubmit = async (data: any) => {
    const user = data as IdentityUserCreateDto;
    const created = await UserService.userCreate(user);
    if (created) {
      await queryClient.invalidateQueries(QueryNames.GetUsers);
      setIsOpen(false);
      await Swal.fire("Success", "User Created Successfully", "success");
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
        <Button displayText="Create User" onClick={openModal} />
      </div>
      <DialogWrapper isOpen={isOpen} title="Create User" onClose={closeModal}>
        <Form onSubmit={onSubmit} onCancel={closeModal}>
          <Input
            required
            placeholder="Enter username"
            name="username"
            displayName="Username"
          />
          <Input
            required
            placeholder="Password"
            name="password"
            displayName="Password"
          />
          <Input required placeholder="Name" name="name" displayName="Name" />
          <Input
            required
            placeholder="Surname"
            name="surname"
            displayName="Surname"
          />
          <Input
            required
            placeholder="Email"
            name="email"
            displayName="Email"
          />
          <Input
            required
            placeholder="Phone Number"
            name="phoneNumber"
            displayName="Phone Number"
          />
          <Input
            type="checkbox"
            placeholder="Active"
            name="active"
            displayName="Active"
          />
          <Input
            type="checkbox"
            placeholder="Lock account after failed login attempts"
            name="lockoutEnabled"
            displayName="Lock account after failed login attempts"
          />
        </Form>
      </DialogWrapper>
    </>
  );
};

export default AddUser;
