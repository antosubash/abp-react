import { flexRender, Table } from '@tanstack/react-table';
import { memo, useCallback } from 'react';
import { Pagination } from './Pagination';

export type TableViewProps<T> = {
    table: Table<T>;
    totalCount: number;
    pageSize: number;
};

const TableView = <T extends unknown>({
    table,
    totalCount,
    pageSize
}: TableViewProps<T>) => {
    const renderHeader = useCallback(() => {
        const headerGroups = table.getHeaderGroups();
        return headerGroups.map((headerGroup) => {
            const headers = headerGroup.headers;
            return (
                <tr key={headerGroup.id} className="first:hidden">
                    {headers.map((header) => {
                        if (header.isPlaceholder) return false;
                        return (
                            <th
                                key={header.id}
                                className="px-3 lg:last:w-1/4 last:1/2 truncate"
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        );
                    })}
                </tr>
            );
        });
    }, []);

    const renderBody = useCallback(() => {
        const rows = table.getRowModel().rows;
        return rows.map((row) => {
            const cells = row.getVisibleCells();
            return (
                <tr
                    key={row.id}
                    className="hover:bg-primary/90 hover:text-primary-content transition delay-75 ease-in border-b-primary border-b"
                >
                    {cells.map((cell) => {
                        return (
                            <td
                                key={cell.id}
                                className="pl-3 py-3 text-xs text-left truncate"
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        );
                    })}
                </tr>
            );
        });
    }, []);

    if (totalCount === 0) {
        return (
            <section className="p-3 flex justify-center">
                <h3 className="leading-3 text-base-content">
                    No Records Found
                </h3>
            </section>
        );
    }
    const pageCount = Math.ceil(totalCount / pageSize);
    return (
        <section>
            <section className="overflow-auto">
                <table className="w-full divide-y text-left divide-base-200 table-auto sm:overflow-x-auto lg:table-fixed text-base-content">
                    <thead>{renderHeader()}</thead>
                    <tbody>{renderBody()}</tbody>
                </table>
            </section>
            <div className="border-t  p-5 flex flex-col lg:items-center lg:flex-row">
                <div className="flex-grow text-base-content pb-2">
                    {totalCount} total
                </div>
                {totalCount > 10 && (
                    <Pagination<T> pageCount={pageCount} table={table} />
                )}
            </div>
        </section>
    );
};

export const CustomTable = TableView;
