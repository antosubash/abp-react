import React from "react";
import { ColumnType, useTable } from "react-final-table";
import TableAction from "./TableAction";
import TableData from "./TableData";
import TableHeader from "./TableHeader";

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
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="inline-block w-full shadow rounded-lg">
            <table className="w-full leading-normal">
              <thead>
                <tr>
                {headers.map((header, idx) => (
                  <TableHeader key={idx} label={header.label!} />
                ))}
                <TableHeader label="Action" />
              </tr>
              </thead>
              <tbody>
                {rows?.map((row, idx) => (
                <tr key={idx}>
                  {row.cells?.map((cell, idx) => (
                    <TableData key={idx}>{cell.render()}</TableData>
                  ))}
                  <TableAction />
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
