import { useUsers } from 'hooks/useUsers';
import React from 'react';
import Loader from '../Loader';
import Table from '../Shared/Table';
import Error from "../Error";
import { useTenants } from 'hooks/useTenants';
type Props = {};

const TenantList = (props: Props) => {
    const columns = [
      {
        name: "name",
        label: "Name",
        render: ({ value }: any) => <h1>{value}</h1>,
      },
    ];

    var { isLoading, data, isError } = useTenants(0, 10);
    if (isLoading) return <Loader />;
    if (isError) return <Error />;
    return <Table columns={columns} data={data?.items} />;
};

export default TenantList;
