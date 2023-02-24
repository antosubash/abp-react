import React, { useState } from "react";
import Loader from "@abp/components/Loader";
import Error from "@abp/components/Error";
import { useTenants } from "hooks/useTenants";
import DataTable from "react-data-table-component";
import {
  AdjustmentsHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";
import { QueryNames } from "@abp/utils/Constants";
import TenantEdit from "./TenantEdit";
import FeatureList from "./FeatureList";
import { TenantDto, TenantService } from "@abpreact/proxy";
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
        <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
      ),
    },
    {
      name: "Edit",
      button: true,
      cell: (row: any) => (
        <PencilIcon
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
    setTenantToEdit(row);
    openModal();
  };

  const tenantDelete = (row: any) => {
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
        var response = await TenantService.tenantDelete(row.id as string);
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
      <FeatureList />
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
