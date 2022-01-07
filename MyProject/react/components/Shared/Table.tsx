import React from "react";
import { ColumnType, useTable } from "react-final-table";

interface Props {
  columns: ColumnType<any>[];
  data: any;
  onEdit?: any;
  onDelete?: any;
  onView?: any;
}

const Table = (props: Props) => {
  const { headers, rows } = useTable(props.columns ?? [], props.data ?? []);

  return (
    <div className="flex flex-col">
      <div className="p-5">
        <div className="inline-block min-w-full overflow-hidden align-middle border-gray-200 dark:border-gray-500 shadow">
          <table className="min-w-full">
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th
                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left  uppercase border-b border-t border-gray-200 dark:border-gray-500"
                    key={idx}
                  >
                    {header.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left  uppercase border-b border-t border-gray-200 dark:border-gray-500">
                  View
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left  uppercase border-b border-t border-gray-200 dark:border-gray-500">
                  Edit
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left  uppercase border-b border-t border-gray-200 dark:border-gray-500">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="">
              {rows?.map((row, idx) => (
                <tr key={idx}>
                  {row.cells?.map((cell, idx) => (
                    <td
                      className="px-6 py-4 text-sm leading-5  whitespace-no-wrap border-b border-gray-200 dark:border-gray-500"
                      key={idx}
                    >
                      {cell.render()}
                    </td>
                  ))}
                  <td
                    onClick={() => props.onView(row)}
                    className="px-6 py-4 text-sm leading-5  whitespace-no-wrap border-b border-gray-200 dark:border-gray-500 cursor-pointer"
                  >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                  </td>
                  <td
                    className="px-6 py-4 text-sm leading-5  whitespace-no-wrap border-b border-gray-200 dark:border-gray-500 cursor-pointer"
                    onClick={() => props.onEdit(row)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </td>
                  <td
                    className="px-6 py-4 text-sm leading-5  whitespace-no-wrap border-b border-gray-200 dark:border-gray-500 cursor-pointer"
                    onClick={() => props.onDelete(row)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;