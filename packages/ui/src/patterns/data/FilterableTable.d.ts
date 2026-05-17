/**
 * FilterableTable Pattern
 * Reusable table component with sorting, filtering, and responsive behavior
 */
import React, { ReactNode } from 'react';
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
/**
 * FilterableTable Component
 * Provides a table with built-in filtering, sorting, and responsive design
 *
 * Features:
 * - Sortable columns
 * - Search/filter support
 * - Responsive horizontal scroll on mobile
 * - Keyboard accessible
 * - Dark mode support
 */
export declare const FilterableTable: React.ForwardRefExoticComponent<FilterableTableProps<any> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FilterableTable.d.ts.map