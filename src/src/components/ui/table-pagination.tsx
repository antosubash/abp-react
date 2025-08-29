import type { Table } from '@tanstack/react-table'
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useMemo } from 'react'
import { getPages } from '@/lib/utils'
import { Button } from './button'

type PaginationProps<T> = {
  pageCount: number
  table: Table<T>
  'aria-label'?: string
}

export const Pagination = <T extends Record<string, any>>({
  pageCount,
  table,
  'aria-label': ariaLabel = 'Pagination',
}: PaginationProps<T>) => {
  const currentPage = table.getState().pagination.pageIndex
  const counts = useMemo(() => getPages(pageCount, currentPage), [pageCount, currentPage])

  const canNextPage = currentPage < pageCount - 1
  const canPreviousPage = currentPage > 0

  const renderButtons = (count: number | string, idx: number) => {
    if (count === 'SPACER') {
      return (
        <span key={`spacer-${idx}`} className="text-primary px-2" aria-hidden="true">
          ...
        </span>
      )
    }

    const pageNumber = Number(count)
    const isCurrentPage = currentPage === pageNumber - 1

    return (
      <Button
        size="sm"
        key={`page-${pageNumber}`}
        variant={isCurrentPage ? 'default' : 'outline'}
        disabled={isCurrentPage}
        onClick={() => table.setPageIndex(pageNumber - 1)}
        aria-current={isCurrentPage ? 'page' : undefined}
        aria-label={`Go to page ${pageNumber}`}
      >
        {count}
      </Button>
    )
  }

  return (
    <nav className="pagination flex items-center space-x-1" aria-label={ariaLabel}>
      <Button
        size="sm"
        variant="outline"
        disabled={!canPreviousPage}
        onClick={() => table.setPageIndex(0)}
        aria-label="Go to first page"
      >
        <ChevronFirstIcon className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        disabled={!canPreviousPage}
        onClick={() => table.previousPage()}
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      {/* Mobile pagination info */}
      <div className="block pl-2 pr-2 lg:hidden text-sm text-base-content/70">
        {currentPage + 1} / {pageCount}
      </div>

      {/* Desktop pagination buttons */}
      <div className="hidden sm:ml-1 sm:mr-1 sm:space-x-2 lg:inline-block">
        {counts.map(renderButtons)}
      </div>

      <Button
        size="sm"
        variant="outline"
        disabled={!canNextPage}
        onClick={() => table.nextPage()}
        aria-label="Go to next page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        disabled={!canNextPage}
        onClick={() => table.setPageIndex(pageCount - 1)}
        aria-label="Go to last page"
      >
        <ChevronLastIcon className="h-4 w-4" />
      </Button>
    </nav>
  )
}
