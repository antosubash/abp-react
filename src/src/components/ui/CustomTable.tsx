import { flexRender, type Table } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'
import { Pagination } from './table-pagination'

export type TableViewProps<T> = {
  table: Table<T>
  totalCount: number
  pageSize: number
  isLoading?: boolean
  error?: string | null
  emptyStateMessage?: string
  className?: string
  'aria-label'?: string
}

const TableView = <T extends Record<string, any>>({
  table,
  totalCount,
  pageSize,
  isLoading = false,
  error = null,
  emptyStateMessage = 'No Records Found',
  className = '',
  'aria-label': ariaLabel = 'Data table',
}: TableViewProps<T>) => {
  const renderHeader = useCallback(() => {
    const headerGroups = table.getHeaderGroups()
    return headerGroups.map((headerGroup) => {
      const headers = headerGroup.headers
      return (
        <tr key={headerGroup.id} className="first:hidden">
          {headers.map((header) => {
            if (header.isPlaceholder) return null
            return (
              <th
                key={header.id}
                className="last:1/2 truncate px-3 lg:last:w-1/4"
                scope="col"
                aria-sort={
                  header.column.getCanSort()
                    ? header.column.getIsSorted() === 'asc'
                      ? 'ascending'
                      : header.column.getIsSorted() === 'desc'
                        ? 'descending'
                        : 'none'
                    : undefined
                }
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            )
          })}
        </tr>
      )
    })
  }, [table])

  const renderBody = useCallback(() => {
    const rows = table.getRowModel().rows

    if (rows.length === 0) {
      return (
        <tr>
          <td
            colSpan={table.getAllColumns().length}
            className="text-center py-8 text-base-content/60"
          >
            {emptyStateMessage}
          </td>
        </tr>
      )
    }

    return rows.map((row) => {
      const cells = row.getVisibleCells()
      return (
        <tr
          key={row.id}
          className="hover:text-base-content border-b border-b-primary transition-colors duration-200 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-selected={row.getIsSelected()}
        >
          {cells.map((cell) => {
            return (
              <td
                key={cell.id}
                className="truncate py-3 pl-3 text-left text-xs"
                data-cell={cell.column.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            )
          })}
        </tr>
      )
    })
  }, [table, emptyStateMessage])

  const pageCount = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize])

  // Show loading state
  if (isLoading) {
    return (
      <section className={`animate-pulse ${className}`}>
        <div className="overflow-auto">
          <table className="divide-base-200 text-base-content w-full table-auto divide-y text-left sm:overflow-x-auto lg:table-fixed">
            <thead>
              <tr>
                {Array.from({ length: 4 }).map((_, i) => (
                  <th key={i} className="last:1/2 truncate px-3 lg:last:w-1/4">
                    <div className="h-4 bg-base-300 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-b-primary">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <td key={j} className="truncate py-3 pl-3 text-left text-xs">
                      <div className="h-3 bg-base-300 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  // Show error state
  if (error) {
    return (
      <section className={`flex justify-center p-8 ${className}`}>
        <div className="text-center">
          <div className="text-error text-lg font-medium mb-2">Error Loading Data</div>
          <div className="text-base-content/60 text-sm">{error}</div>
        </div>
      </section>
    )
  }

  // Show empty state
  if (totalCount === 0) {
    return (
      <section className={`flex justify-center p-8 ${className}`}>
        <div className="text-center">
          <div className="text-base-content/60 text-lg">{emptyStateMessage}</div>
        </div>
      </section>
    )
  }

  return (
    <section className={className}>
      <div className="overflow-auto">
        <table
          className="divide-base-200 text-base-content w-full table-auto divide-y text-left sm:overflow-x-auto lg:table-fixed"
          aria-label={ariaLabel}
          role="table"
        >
          <thead role="rowgroup">{renderHeader()}</thead>
          <tbody role="rowgroup">{renderBody()}</tbody>
        </table>
      </div>

      <div className="flex flex-col border-t p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-base-content/70 text-sm mb-4 lg:mb-0">
          Showing {table.getState().pagination.pageIndex * pageSize + 1} to{' '}
          {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, totalCount)} of{' '}
          {totalCount} total records
        </div>

        {pageCount > 1 && <Pagination<T> pageCount={pageCount} table={table} />}
      </div>
    </section>
  )
}

export const CustomTable = TableView
