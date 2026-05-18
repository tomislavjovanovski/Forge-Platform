import type { ReactElement, ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: unknown, row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function DataTable<T>({ columns, data }: DataTableProps<T>): ReactElement {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-950">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-6 py-4 text-left uppercase tracking-[0.24em] text-slate-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition hover:bg-slate-950/70">
              {columns.map((column) => {
                const value = row[column.accessor];
                return (
                  <td key={column.header} className="px-6 py-4 text-slate-200">
                    {column.render ? column.render(value, row) : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
