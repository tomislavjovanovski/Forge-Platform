import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetMetricsQuery } from '../services/dashboardApi';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
const statusStyles = {
    good: 'bg-emerald-500/10 text-emerald-300',
    warning: 'bg-amber-500/10 text-amber-300',
    critical: 'bg-rose-500/10 text-rose-300',
};
export function MonitoringWidgets() {
    const { data, isLoading } = useGetMetricsQuery();
    if (isLoading) {
        return _jsx(LoadingSkeleton, { rows: 4 });
    }
    return (_jsx("div", { className: "grid gap-4 xl:grid-cols-2", children: data?.map((metric) => (_jsxs("div", { className: "rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.28em] text-slate-500", children: metric.label }), _jsx("span", { className: `rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[metric.status]}`, children: metric.status })] }), _jsxs("div", { className: "mt-4 flex items-end gap-4", children: [_jsx("p", { className: "text-3xl font-semibold text-slate-50", children: metric.value }), _jsx("p", { className: "text-sm text-slate-400", children: metric.diff })] })] }, metric.id))) }));
}
//# sourceMappingURL=MonitoringWidgets.js.map