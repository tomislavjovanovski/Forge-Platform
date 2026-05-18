/**
 * FilterableTable Pattern
 * Reusable table component with sorting,
 * filtering, and responsive behavior
 */

import {
  useState,
  useMemo,
  forwardRef,
  type ReactNode,
  type ReactElement,
  type ForwardedRef,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';

import { cn } from '../../utils/cn';

export interface Column<T> {
  id: string;

  header: ReactNode;

  accessor: (
    row: T,
  ) => ReactNode;

  sortable?: boolean;

  className?: string;
}

export interface FilterableTableProps<
  T,
> {
  /** Data rows */
  data: T[];

  /** Column definitions */
  columns: Column<T>[];

  /** Optional search/filter function */
  onFilter?: (
    data: T[],
    query: string,
  ) => T[];

  /** Optional sort function */
  onSort?: (
    data: T[],
    columnId: string,
    direction:
      | 'asc'
      | 'desc',
  ) => T[];

  /** Show row numbers */
  showRowNumbers?: boolean;

  /** CSS class name */
  className?: string;
}

/**
 * FilterableTable Component
 * Provides a table with built-in filtering,
 * sorting, and responsive design
 *
 * Features:
 * - Sortable columns
 * - Search/filter support
 * - Responsive horizontal scroll
 * - Keyboard accessible
 * - Dark mode support
 */
function FilterableTableInner<T>(
  {
    data,
    columns,
    onFilter,
    onSort,
    showRowNumbers = false,
    className,
  }: FilterableTableProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const [
    sortColumn,
    setSortColumn,
  ] = useState<string | null>(
    null,
  );

  const [
    sortDirection,
    setSortDirection,
  ] = useState<
    'asc' | 'desc'
  >('asc');

  const [
    searchQuery,
    setSearchQuery,
  ] = useState('');

  const processedData =
    useMemo((): T[] => {
      let result: T[] = data;

      if (
        searchQuery &&
        onFilter
      ) {
        result = onFilter(
          result,
          searchQuery,
        );
      }

      if (
        sortColumn &&
        onSort
      ) {
        result = onSort(
          result,
          sortColumn,
          sortDirection,
        );
      }

      return result;
    }, [
      data,
      searchQuery,
      sortColumn,
      sortDirection,
      onFilter,
      onSort,
    ]);

  const handleSort = (
    columnId: string,
  ): void => {
    if (
      sortColumn ===
      columnId
    ) {
      setSortDirection(
        sortDirection ===
          'asc'
          ? 'desc'
          : 'asc',
      );
    } else {
      setSortColumn(
        columnId,
      );

      setSortDirection(
        'asc',
      );
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'space-y-4',
        className,
      )}
    >
      {/* Search bar */}
      {onFilter && (
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search..."
            value={
              searchQuery
            }
            onChange={(
              event: ChangeEvent<HTMLInputElement>,
            ): void => {
              setSearchQuery(
                event.target
                  .value,
              );
            }}
            className={cn(
              'flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2',
              'text-slate-900 placeholder:text-slate-500',
              'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
              'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400',
            )}
          />
        </div>
      )}

      {/* Table container */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          {/* Header */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              {showRowNumbers && (
                <th className="w-12 px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">
                  #
                </th>
              )}

              {columns.map(
                (
                  column,
                ): ReactElement => (
                  <th
                    key={
                      column.id
                    }
                    className={cn(
                      'px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400',
                      column.sortable &&
                        'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800',
                      column.className,
                    )}
                    onClick={(): void => {
                      if (
                        column.sortable
                      ) {
                        handleSort(
                          column.id,
                        );
                      }
                    }}
                    onKeyDown={(
                      event: KeyboardEvent<HTMLTableCellElement>,
                    ): void => {
                      if (
                        !column.sortable
                      ) {
                        return;
                      }

                      if (
                        event.key ===
                          'Enter' ||
                        event.key ===
                          ' '
                      ) {
                        event.preventDefault();

                        handleSort(
                          column.id,
                        );
                      }
                    }}
                    role={
                      column.sortable
                        ? 'button'
                        : undefined
                    }
                    tabIndex={
                      column.sortable
                        ? 0
                        : undefined
                    }
                    aria-sort={
                      sortColumn ===
                      column.id
                        ? sortDirection ===
                          'asc'
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-2">
                      {
                        column.header
                      }

                      {column.sortable && (
                        <span className="text-xs text-slate-400">
                          {sortColumn ===
                            column.id &&
                            (sortDirection ===
                            'asc'
                              ? '↑'
                              : '↓')}
                        </span>
                      )}
                    </div>
                  </th>
                ),
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {processedData.length ===
            0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (showRowNumbers
                      ? 1
                      : 0)
                  }
                  className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                >
                  No results found
                </td>
              </tr>
            ) : (
              processedData.map(
                (
                  row,
                  idx,
                ): ReactElement => (
                  <tr
                    key={
                      idx
                    }
                    className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                  >
                    {showRowNumbers && (
                      <td className="w-12 px-4 py-3 text-slate-500 dark:text-slate-400">
                        {idx + 1}
                      </td>
                    )}

                    {columns.map(
                      (
                        column,
                      ): ReactElement => (
                        <td
                          key={
                            column.id
                          }
                          className={cn(
                            'px-4 py-3 text-slate-900 dark:text-slate-50',
                            column.className,
                          )}
                        >
                          {column.accessor(
                            row,
                          )}
                        </td>
                      ),
                    )}
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Info text */}
      {processedData.length >
        0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing{' '}
          {
            processedData.length
          }{' '}
          of {data.length}{' '}
          results
        </p>
      )}
    </div>
  );
}

interface FilterableTableComponent {
  <T>(
    props: FilterableTableProps<T> & {
      ref?: ForwardedRef<HTMLDivElement>;
    },
  ): ReactElement;
  displayName?: string;
}

const ForwardedFilterableTable =
  forwardRef(
    FilterableTableInner,
  ) as FilterableTableComponent;

ForwardedFilterableTable.displayName =
  'FilterableTable';

export {
  ForwardedFilterableTable as FilterableTable,
};