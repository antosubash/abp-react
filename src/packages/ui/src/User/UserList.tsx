import { useUsers } from "@abpreact/hooks";
import { useMemo, useState } from "react";

import {
  AdjustmentsHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  IdentityUserDto,
  UserService,
  IdentityUserUpdateDto,
} from "@abpreact/proxy";
import { CustomTable } from "../Shared/CustomTable";
import Loader from "../Shared/Loader";
import Error from "../Shared/Error";
import { Button } from "../Shared/Button";

import { useToast } from "../Shared/hooks/useToast";
import { ToastAction } from "../Shared/Toast";
import { UserEdit } from "./UserEdit";

export const UserList = () => {
  const { toast } = useToast();
  const [userEdit, setUserEdit] = useState<{
    userId: string;
    userDto: IdentityUserUpdateDto;
  } | null>();
  const onDeletUserEvent = ({
    name,
    uuid,
  }: {
    name: string;
    uuid: string;
  }): void => {
    toast({
      title: "Are you sure?",
      description: `You are about delete a user ${name}`,
      action: (
        <ToastAction
          altText="confirm"
          onClick={async () => {
            try {
              await UserService.userDelete(uuid);
              toast({
                title: "Success",
                description: `User ${name} has been deleted successfully.`,
              });
            } catch (err: unknown) {
              if (err instanceof Error) {
                toast({
                  title: "Failed",
                  description: `There was a problem when deleting the user ${name}. Kindly try again.`,
                  variant: "destructive",
                });
              }
            }
          }}
        >
          Confirm
        </ToastAction>
      ),
    });
  };

  const defaultColumns = useMemo<ColumnDef<IdentityUserDto>[]>(
    () => [
      {
        header: "User Management",
        columns: [
          {
            accessorKey: "userName",
            header: "Username",
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "email",
            header: "Email",
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "isActive",
            header: "Active",
            cell: (info) => (info.getValue() ? "yes" : "no"),
          },
          {
            accessorKey: "permissions",
            header: "Permissions",
            cell: (info) => (
              <AdjustmentsHorizontalIcon className="h-5 w-5 cursor-pointer" />
            ),
          },
          {
            accessorKey: "edit",
            header: "",
            cell: (info) => (
              <Button
                variant="subtle"
                onClick={() =>
                  setUserEdit({
                    userId: info.row.original.id as string,
                    userDto: info.row.original as IdentityUserUpdateDto,
                  })
                }
              >
                <PencilIcon width={15} height={15} className="text-white" />
              </Button>
            ),
          },
          {
            accessorKey: "delete",
            header: "",
            cell: (info) => (
              <Button
                variant="destructive"
                onClick={() =>
                  onDeletUserEvent({
                    name: info.row.original?.userName as string,
                    uuid: info.row.original.id as string,
                  })
                }
              >
                <TrashIcon width={24} height={24} />
              </Button>
            ),
          },
        ],
      },
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize, toast]
  );

  const { isLoading, data, isError } = useUsers(pageIndex, pageSize);
  const pageCount = Math.ceil(data?.totalCount! / pageSize);

  const table = useReactTable({
    data: data?.items || defaultData,
    pageCount: pageCount || 0,
    state: {
      pagination,
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <>
      {userEdit && (
        <UserEdit userId={userEdit.userId} userDto={userEdit.userDto} onDismiss={() => setUserEdit(null)} />
      )}
      <CustomTable table={table} />
    </>
  );
};
