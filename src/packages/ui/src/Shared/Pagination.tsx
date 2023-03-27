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
import classNames from 'classnames';

type PaginationProps<T> = {
    pageCount: number;
    table: Table<T>;
};
export const Pagaination = <T extends unknown>({
    pageCount,
    table
}: PaginationProps<T>) => {
    const [numbers, setNumbers] = useState<number[]>([]);
    useEffect(() => {
        const temp = [];
        for (let i = 1; i <= pageCount; i++) {
            temp.push(i);
        }
        setNumbers(temp);
    }, [pageCount]);
    return (
        <section className="pagination flex items-center space-x-1">
            <Button
                size="sm"
                variant="default"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.setPageIndex(0)}
            >
                <ChevronDoubleLeftIcon width={24} height={24} />
            </Button>
            <Button
                size="sm"
                variant="default"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
            >
                <ChevronLeftIcon width={24} height={24} />
            </Button>
            <div className="block pr-2 pl-2 sm:hidden">
                {table.getState().pagination.pageIndex} / {pageCount}
            </div>
            <div className="hidden sm:inline-block sm:space-x-2 sm:mr-1 sm:ml-1">
                {numbers.map((n, idx) => (
                    <Button
                        size="sm"
                        variant="default"
                        key={v4()}
                        disabled={table.getState().pagination.pageIndex === n}
                        onClick={() => {
                            table.setPageIndex(n);
                        }}
                    >
                        {n}
                    </Button>
                ))}
            </div>
            <Button
                size="sm"
                variant="default"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
            >
                <ChevronRightIcon width={24} height={24} />
            </Button>
            <Button
                size="sm"
                variant="default"
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
                <ChevronDoubleRightIcon width={24} height={24} />
            </Button>
        </section>
    );
};
