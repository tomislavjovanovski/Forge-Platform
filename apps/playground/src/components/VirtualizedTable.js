import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
function alignmentClass(align) {
    if (align === 'center') {
        return 'justify-self-center text-center';
    }
    if (align === 'end') {
        return 'justify-self-end text-right';
    }
    return 'justify-self-start text-left';
}
export function VirtualizedTable({ columns, rows, rowHeight = 60, height = 320, emptyLabel, }) {
    const [scrollTop, setScrollTop] = useState(0);
    const gridTemplateColumns = useMemo(() => columns.map((column) => column.width).join(' '), [columns]);
    const totalHeight = rows.length * rowHeight;
    const visibleCount = Math.ceil(height / rowHeight) + 4;
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
    const endIndex = Math.min(rows.length, startIndex + visibleCount);
    const offsetY = startIndex * rowHeight;
    const visibleRows = rows.slice(startIndex, endIndex);
    return (_jsxs("div", { className: "overflow-hidden rounded-[24px] border border-white/8 bg-slate-900/70", children: [_jsx("div", { className: "grid border-b border-white/8 bg-white/[0.03] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400", style: { gridTemplateColumns }, children: columns.map((column) => (_jsx("div", { className: alignmentClass(column.align), children: column.label }, column.key))) }), _jsx("div", { className: "overflow-y-auto", style: { height }, onScroll: (event) => setScrollTop(event.currentTarget.scrollTop), children: rows.length === 0 ? (_jsx("div", { className: "flex h-full items-center justify-center px-6 text-sm text-slate-400", children: emptyLabel })) : (_jsx("div", { className: "relative", style: { height: totalHeight }, children: _jsx("div", { className: "absolute inset-x-0 top-0", style: { transform: `translateY(${offsetY}px)` }, children: visibleRows.map((row) => (_jsx("div", { className: "grid items-center gap-3 border-b border-white/6 px-4 text-sm text-slate-200 last:border-b-0", style: {
                                gridTemplateColumns,
                                minHeight: rowHeight,
                            }, children: columns.map((column) => (_jsx("div", { className: alignmentClass(column.align), children: column.render(row) }, column.key))) }, row.id))) }) })) })] }));
}
//# sourceMappingURL=VirtualizedTable.js.map