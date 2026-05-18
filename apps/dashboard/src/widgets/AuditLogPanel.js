import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetAuditLogQuery } from '../services/dashboardApi';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
export function AuditLogPanel() {
    const { data, isLoading } = useGetAuditLogQuery();
    if (isLoading) {
        return _jsx(LoadingSkeleton, { rows: 5 });
    }
    return (_jsxs("div", { className: "rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl", children: [_jsxs("div", { className: "mb-5 flex items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-slate-500", children: "Audit logs" }), _jsx("h3", { className: "mt-2 text-xl font-semibold text-slate-50", children: "Recent security events" })] }), _jsx("button", { className: "rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-600 hover:bg-slate-900", children: "Export" })] }), _jsx("div", { className: "space-y-4", children: data?.slice(0, 5).map((entry) => (_jsxs("div", { className: "rounded-3xl border border-slate-800 bg-slate-950 p-4", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsx("p", { className: "text-sm font-semibold text-slate-100", children: entry.action }), _jsx("span", { className: "text-xs uppercase tracking-[0.28em] text-slate-500", children: entry.createdAt })] }), _jsxs("p", { className: "mt-2 text-sm text-slate-400", children: [entry.actor, " \u00B7 ", entry.target] }), _jsx("p", { className: "mt-3 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300", children: entry.status })] }, entry.id))) })] }));
}
//# sourceMappingURL=AuditLogPanel.js.map