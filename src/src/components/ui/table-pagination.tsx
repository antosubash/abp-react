import { getPages } from '@/lib/utils'
import { Table } from '@tanstack/react-table'
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { v4 } from 'uuid'
import { Button } from './button'

type PaginationProps<T> = {
  pageCount: number
  table: Table<T>
}
export const Pagination = <T extends unknown>({ pageCount, table }: PaginationProps<T>) => {
  const [numbers, setNumbers] = useState([])
  const counts = getPages(pageCount, table.getState().pagination.pageIndex)

  // table.getCanNextPage() doesn't seem to be working. So, it is just a work around.
  const canNextPage =
    table.getState().pagination.pageIndex >= 0 &&
    table.getState().pagination.pageIndex < pageCount - 1

  const renderButtons = (count: number | string, idx: number) => {
    if (count === 'SPACER') {
      return (
        <span key={v4()} className="text-primary">
          ...
        </span>
      )
    }

    return (
      <Button
        size="sm"
        key={v4()}
        disabled={table.getState().pagination.pageIndex === Number(count) - 1}
        onClick={() => {
          table.setPageIndex(Number(count) - 1)
        }}
      >
        {count}
      </Button>
    )
  }
  return (
    <section className="pagination flex items-center space-x-1">
      <Button
        size="sm"
        disabled={!table.getCanPreviousPage()}
        onClick={() => {
          if (!table.getCanPreviousPage()) return
          table.setPageIndex(0)
        }}
      >
        <ChevronFirstIcon width={24} height={24} />
      </Button>
      <Button
        size="sm"
        disabled={!table.getCanPreviousPage()}
        onClick={() => {
          if (!table.getCanPreviousPage()) return
          table.previousPage()
        }}
      >
        <ChevronLeftIcon width={24} height={24} />
      </Button>
      <div className="block pl-2 pr-2 lg:hidden">
        {table.getState().pagination.pageIndex} / {pageCount}
      </div>
      <div className="hidden sm:ml-1 sm:mr-1 sm:space-x-2 lg:inline-block">
        {counts.map(renderButtons)}
      </div>
      <Button
        size="sm"
        disabled={!canNextPage}
        onClick={() => {
          if (!canNextPage) {
            return
          }
          table.nextPage()
        }}
      >
        <ChevronRightIcon width={24} height={24} />
      </Button>
      <Button
        size="sm"
        disabled={!canNextPage}
        onClick={() => {
          if (!canNextPage) {
            return
          }
          table.setPageIndex(pageCount - 1)
        }}
      >
        <ChevronLastIcon width={24} height={24} />
      </Button>
    </section>
  )
}
