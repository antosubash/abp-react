import { flexRender, Table } from '@tanstack/react-table'
import { useCallback } from 'react'
import { Pagination } from './table-pagination'

export type TableViewProps<T> = {
  table: Table<T>
  totalCount: number
  pageSize: number
}

const TableView = <T extends unknown>({ table, totalCount, pageSize }: TableViewProps<T>) => {
  const renderHeader = useCallback(() => {
    const headerGroups = table.getHeaderGroups()
    return headerGroups.map((headerGroup) => {
      const headers = headerGroup.headers
      return (
        <tr key={headerGroup.id} className="first:hidden">
          {headers.map((header) => {
            if (header.isPlaceholder) return false
            return (
              <th key={header.id} className="last:1/2 truncate px-3 lg:last:w-1/4">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            )
          })}
        </tr>
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderBody = useCallback(() => {
    const rows = table.getRowModel().rows
    return rows.map((row) => {
      const cells = row.getVisibleCells()
      return (
        <tr
          key={row.id}
          className="hover:text-primary-content border-b border-b-primary transition delay-75 ease-in hover:bg-primary/90"
        >
          {cells.map((cell) => {
            return (
              <td key={cell.id} className="truncate py-3 pl-3 text-left text-xs">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            )
          })}
        </tr>
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (totalCount === 0) {
    return (
      <section className="flex justify-center p-3">
        <h3 className="text-base-content leading-3">No Records Found</h3>
      </section>
    )
  }
  const pageCount = Math.ceil(totalCount / pageSize)
  return (
    <section>
      <section className="overflow-auto">
        <table className="divide-base-200 text-base-content w-full table-auto divide-y text-left sm:overflow-x-auto lg:table-fixed">
          <thead>{renderHeader()}</thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </section>
      <div className="flex flex-col border-t p-5 lg:flex-row lg:items-center">
        <div className="text-base-content flex-grow pb-2">{totalCount} total</div>
        {totalCount > 10 && <Pagination<T> pageCount={pageCount} table={table} />}
      </div>
    </section>
  )
}

export const CustomTable = TableView
