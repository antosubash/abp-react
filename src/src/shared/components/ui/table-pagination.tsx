import { getPages } from '@/shared/lib/utils'
import { Table } from '@tanstack/react-table'
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useMemo } from 'react'
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

    return (
      <Button
        key={idx}
        size="sm"
        variant={currentPage === idx ? 'default' : 'outline'}
        onClick={() => table.setPageIndex(idx as number)}
        aria-label={`Go to page ${idx + 1}`}
        aria-current={currentPage === idx ? 'page' : undefined}
      >
        {count}
      </Button>
    )
  }

  return (
    <nav aria-label={ariaLabel}>
      {/* Mobile pagination buttons */}
      <div className="flex sm:hidden gap-1 items-center justify-center sm:ml-auto">
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
      </div>

      {/* Desktop pagination buttons */}
      <div className="hidden sm:ml-1 sm:mr-1 sm:space-x-2 lg:inline-block">
        {counts.map(renderButtons)}
      </div>

      <Button
        size="sm"
        variant="outline"
        disabled={!canNextPage}
        onClick={() => table.setPageIndex(pageCount - 1)}
        aria-label="Go to last page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </nav>
  )
}

// Type alias for backwards compatibility
export { Pagination as TablePagination }
