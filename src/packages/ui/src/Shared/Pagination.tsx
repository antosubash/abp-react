import { Table } from '@tanstack/react-table';
import { v4 } from 'uuid';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/24/solid';
import { getPages } from '../utils';
type PaginationProps<T> = {
    pageCount: number;
    table: Table<T>;
};
export const Pagination = <T extends unknown>({
    pageCount,
    table
}: PaginationProps<T>) => {
    const [numbers, setNumbers] = useState([]);
    const counts = getPages(pageCount, table.getState().pagination.pageIndex);

    // table.getCanNextPage() doesn't seem to be working. So, it is just a work around.
    const canNextPage =
        table.getState().pagination.pageIndex >= 0 &&
        table.getState().pagination.pageIndex < pageCount - 1;

    const renderButtons = (count: number | string, idx: number) => {
        if (count === 'SPACER') {
            return (
                <span key={v4()} className="text-primary">
                    ...
                </span>
            );
        }

        return (
            <Button
                size="sm"
                variant="subtle"
                key={v4()}
                disabled={
                    table.getState().pagination.pageIndex === Number(count) - 1
                }
                onClick={() => {
                    table.setPageIndex(Number(count) - 1);
                }}
            >
                {count}
            </Button>
        );
    };
    return (
        <section className="pagination flex items-center space-x-1">
            <Button
                size="sm"
                variant="subtle"
                disabled={!table.getCanPreviousPage()}
                onClick={() => {
                    if (!table.getCanPreviousPage()) return;
                    table.setPageIndex(0);
                }}
            >
                <ChevronDoubleLeftIcon width={24} height={24} />
            </Button>
            <Button
                size="sm"
                variant="subtle"
                disabled={!table.getCanPreviousPage()}
                onClick={() => {
                    if (!table.getCanPreviousPage()) return;
                    table.previousPage();
                }}
            >
                <ChevronLeftIcon width={24} height={24} />
            </Button>
            <div className="block pr-2 pl-2 lg:hidden">
                {table.getState().pagination.pageIndex} / {pageCount}
            </div>
            <div className="hidden lg:inline-block sm:space-x-2 sm:mr-1 sm:ml-1">
                {counts.map(renderButtons)}
            </div>
            <Button
                size="sm"
                variant="subtle"
                disabled={!canNextPage}
                onClick={() => {
                    if (!canNextPage) {
                        return;
                    }
                    table.nextPage();
                }}
            >
                <ChevronRightIcon width={24} height={24} />
            </Button>
            <Button
                size="sm"
                variant="subtle"
                disabled={!canNextPage}
                onClick={() => {
                    if (!canNextPage) {
                        return;
                    }
                    table.setPageIndex(pageCount - 1);
                }}
            >
                <ChevronDoubleRightIcon width={24} height={24} />
            </Button>
        </section>
    );
};
