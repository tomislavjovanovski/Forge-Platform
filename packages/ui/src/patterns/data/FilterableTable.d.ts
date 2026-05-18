/**
 * FilterableTable Pattern
 * Reusable table component with sorting,
 * filtering, and responsive behavior
 */
import { type ReactNode, type ReactElement, type ForwardedRef } from 'react';
export interface Column<T> {
    id: string;
    header: ReactNode;
    accessor: (row: T) => ReactNode;
    sortable?: boolean;
    className?: string;
}
export interface FilterableTableProps<T> {
    /** Data rows */
    data: T[];
    /** Column definitions */
    columns: Column<T>[];
    /** Optional search/filter function */
    onFilter?: (data: T[], query: string) => T[];
    /** Optional sort function */
    onSort?: (data: T[], columnId: string, direction: 'asc' | 'desc') => T[];
    /** Show row numbers */
    showRowNumbers?: boolean;
    /** CSS class name */
    className?: string;
}
interface FilterableTableComponent {
    <T>(props: FilterableTableProps<T> & {
        ref?: ForwardedRef<HTMLDivElement>;
    }): ReactElement;
    displayName?: string;
}
declare const ForwardedFilterableTable: FilterableTableComponent;
export { ForwardedFilterableTable as FilterableTable, };
//# sourceMappingURL=FilterableTable.d.ts.map