import React, { useState } from "react";
import Loader from "@abp/components/Loader";
import Error from "@abp/components/Error";
import { useTenants } from "hooks/useTenants";
import DataTable, { TableColumn, TableRow } from "react-data-table-component";
import {
  AdjustmentsIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { useQueryClient } from "react-query";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";
import { deleteTenant } from "@abp/services/TenantService";
import { QueryNames } from "@abp/utils/Constants";
import TenantEdit from "./TenantEdit";
import { TenantDto } from "@abp/generated/MyProjectModels";
import FeatureList from "./FeatureList";
type Props = {};

const TenantList = (props: Props) => {
  const queryClient = useQueryClient();
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [tenantToEdit, setTenantToEdit] = useState<TenantDto>();
  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Permissions",
      button: true,
      cell: (row: any) => (
        <AdjustmentsIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
      ),
    },
    {
      name: "Edit",
      button: true,
      cell: (row: any) => (
        <PencilAltIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => tenantEdit(row)}
        />
      ),
    },
    {
      name: "Delete",
      button: true,
      cell: (row: any) => (
        <TrashIcon
          className="h-5 w-5 text-red-500 cursor-pointer"
          onClick={() => tenantDelete(row)}
        />
      ),
    },
  ];

  function closeModal() {
    setIsEditOpen(false);
  }

  function openModal() {
    setIsEditOpen(true);
  }

  const tenantEdit = (row: any) => {
    console.log(row);
    setTenantToEdit(row);
    openModal();
  };

  const tenantDelete = (row: any) => {
    console.log(row.name);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var response = await deleteTenant(row.id as string);
        if (response.status === 204) {
          queryClient.invalidateQueries(QueryNames.GetTenants);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  const { theme } = useTheme();

  var [skip, setSkip] = useState<number>(0);
  var [limit, setLimit] = useState<number>(10);
  var [page, setPage] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setPage(page);
    var skip = (page - 1) * limit;
    setSkip(skip);
  };

  const handlePerRowsChange = async (newPerPage: number, _page: number) => {
    setLimit(newPerPage);
  };

  var { isLoading, data, isError } = useTenants(page, skip, limit);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return (
    <>
      {/* <FeatureList /> */}
      <TenantEdit
        isOpen={isEditOpen}
        closeModal={closeModal}
        name={tenantToEdit?.name!}
        id={tenantToEdit?.id!}
      />
      <DataTable
        theme={theme === "dark" ? "dark" : "default"}
        columns={columns}
        data={data?.items ?? []}
        paginationTotalRows={data?.totalCount}
        progressPending={isLoading}
        pagination
        paginationServer
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </>
  );
};

export default TenantList;
