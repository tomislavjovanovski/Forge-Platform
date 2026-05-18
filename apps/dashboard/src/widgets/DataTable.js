import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function DataTable({ columns, data }) {
    return (_jsx("div", { className: "overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl", children: _jsxs("table", { className: "min-w-full divide-y divide-slate-800 text-sm", children: [_jsx("thead", { className: "bg-slate-950", children: _jsx("tr", { children: columns.map((column) => (_jsx("th", { className: "px-6 py-4 text-left uppercase tracking-[0.24em] text-slate-500", children: column.header }, column.header))) }) }), _jsx("tbody", { className: "divide-y divide-slate-800", children: data.map((row, rowIndex) => (_jsx("tr", { className: "transition hover:bg-slate-950/70", children: columns.map((column) => {
                            const value = row[column.accessor];
                            return (_jsx("td", { className: "px-6 py-4 text-slate-200", children: column.render ? column.render(value, row) : String(value) }, column.header));
                        }) }, rowIndex))) })] }) }));
}
//# sourceMappingURL=DataTable.js.map