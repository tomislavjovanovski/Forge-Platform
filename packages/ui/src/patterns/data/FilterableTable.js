import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * FilterableTable Pattern
 * Reusable table component with sorting, filtering, and responsive behavior
 */
import React, { useState, useMemo } from 'react';
import { cn } from '../../utils/cn';
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
export const FilterableTable = React.forwardRef(({ data, columns, onFilter, onSort, showRowNumbers = false, className, }, ref) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    // Process data through filtering and sorting
    const processedData = useMemo(() => {
        let result = data;
        if (searchQuery && onFilter) {
            result = onFilter(result, searchQuery);
        }
        if (sortColumn && onSort) {
            result = onSort(result, sortColumn, sortDirection);
        }
        return result;
    }, [data, searchQuery, sortColumn, sortDirection, onFilter, onSort]);
    const handleSort = (columnId) => {
        if (sortColumn === columnId) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortColumn(columnId);
            setSortDirection('asc');
        }
    };
    return (_jsxs("div", { ref: ref, className: cn('space-y-4', className), children: [onFilter && (_jsx("div", { className: "flex gap-2", children: _jsx("input", { type: "search", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: cn('flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2', 'text-slate-900 placeholder:text-slate-500', 'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500', 'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400') }) })), _jsx("div", { className: "overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900", children: [showRowNumbers && (_jsx("th", { className: "px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400 w-12", children: "#" })), columns.map((column) => (_jsx("th", { className: cn('px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400', column.sortable && 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800', column.className), onClick: () => column.sortable && handleSort(column.id), children: _jsxs("div", { className: "flex items-center gap-2", children: [column.header, column.sortable && (_jsx("span", { className: "text-xs text-slate-400", children: sortColumn === column.id && (sortDirection === 'asc' ? '↑' : '↓') }))] }) }, column.id)))] }) }), _jsx("tbody", { children: processedData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + (showRowNumbers ? 1 : 0), className: "px-4 py-8 text-center text-slate-500 dark:text-slate-400", children: "No results found" }) })) : (processedData.map((row, idx) => (_jsxs("tr", { className: "border-b border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50", children: [showRowNumbers && (_jsx("td", { className: "px-4 py-3 text-slate-500 dark:text-slate-400 w-12", children: idx + 1 })), columns.map((column) => (_jsx("td", { className: cn('px-4 py-3 text-slate-900 dark:text-slate-50', column.className), children: column.accessor(row) }, column.id)))] }, idx)))) })] }) }), processedData.length > 0 && (_jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: ["Showing ", processedData.length, " of ", data.length, " results"] }))] }));
});
FilterableTable.displayName = 'FilterableTable';
//# sourceMappingURL=FilterableTable.js.map