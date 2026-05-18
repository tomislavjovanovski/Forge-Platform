import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import { TraceWaterfall } from './components/TraceWaterfall';
import { VirtualizedTable } from './components/VirtualizedTable';
import { WidgetCard } from './components/WidgetCard';
import { useObservabilityDashboard } from './hooks/useObservabilityDashboard';
const deploymentTone = {
    healthy: 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30',
    monitoring: 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/30',
    rollback: 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30',
};
const severityTone = {
    critical: 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30',
    high: 'bg-orange-400/15 text-orange-200 ring-1 ring-orange-400/30',
    medium: 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/30',
    low: 'bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/30',
};
const pipelineTone = {
    passed: 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/30',
    running: 'bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/30',
    failed: 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30',
    queued: 'bg-slate-400/15 text-slate-200 ring-1 ring-slate-300/20',
};
const socketTone = {
    connecting: 'bg-cyan-400/15 text-cyan-200 ring-cyan-400/30',
    live: 'bg-emerald-400/15 text-emerald-200 ring-emerald-400/30',
    retrying: 'bg-amber-400/15 text-amber-200 ring-amber-400/30',
};
function StatusPill({ label, className, }) {
    return (_jsxs("span", { className: `inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ${className}`, children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-current opacity-80" }), label] }));
}
function formatBudget(budget) {
    if (budget.unit === 'cls') {
        return budget.current.toFixed(3);
    }
    return `${Math.round(budget.current)}`;
}
function BudgetRow({ budget }) {
    const ratio = (budget.current / budget.budget) * 100;
    const overBudget = budget.current > budget.budget;
    return (_jsxs("div", { className: "rounded-[22px] border border-white/8 bg-white/[0.03] p-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: budget.name }), _jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-slate-500", children: budget.owner })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: `text-sm font-semibold ${overBudget ? 'text-rose-200' : 'text-emerald-200'}`, children: [formatBudget(budget), budget.unit] }), _jsxs("p", { className: "text-xs text-slate-500", children: ["budget ", budget.budget, budget.unit] })] })] }), _jsx("div", { className: "mt-4 h-2 rounded-full bg-white/[0.06]", children: _jsx("div", { className: `h-full rounded-full ${overBudget ? 'bg-rose-400' : 'bg-cyan-300'}`, style: { width: `${Math.min(ratio, 100)}%` } }) }), _jsxs("div", { className: "mt-3 flex items-center justify-between text-xs text-slate-400", children: [_jsxs("span", { children: [Math.round(ratio), "% of budget"] }), _jsx("span", { children: budget.trend })] })] }));
}
const pipelineColumns = [
    {
        key: 'service',
        label: 'Service',
        width: '1.3fr',
        render: (row) => (_jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: row.service }), _jsx("p", { className: "text-xs uppercase tracking-[0.16em] text-slate-500", children: row.branch })] })),
    },
    {
        key: 'status',
        label: 'Status',
        width: '0.8fr',
        render: (row) => _jsx(StatusPill, { label: row.status, className: pipelineTone[row.status] }),
    },
    {
        key: 'duration',
        label: 'Duration',
        width: '0.7fr',
        align: 'end',
        render: (row) => `${row.durationMin}m`,
    },
    {
        key: 'coverage',
        label: 'Coverage',
        width: '0.8fr',
        align: 'end',
        render: (row) => `${row.coverage}%`,
    },
    {
        key: 'commit',
        label: 'Commit',
        width: '0.9fr',
        align: 'end',
        render: (row) => (_jsx("span", { className: "font-mono text-xs uppercase tracking-[0.18em] text-slate-300", children: row.commit })),
    },
];
const errorColumns = [
    {
        key: 'issue',
        label: 'Issue',
        width: '1.5fr',
        render: (row) => (_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "truncate font-medium text-white", children: row.issue }), _jsx("p", { className: "mt-1 text-xs uppercase tracking-[0.16em] text-slate-500", children: row.service })] })),
    },
    {
        key: 'severity',
        label: 'Severity',
        width: '0.85fr',
        render: (row) => _jsx(StatusPill, { label: row.severity, className: severityTone[row.severity] }),
    },
    {
        key: 'count',
        label: 'Count',
        width: '0.55fr',
        align: 'end',
        render: (row) => row.count,
    },
    {
        key: 'users',
        label: 'Users',
        width: '0.65fr',
        align: 'end',
        render: (row) => row.affectedUsers,
    },
    {
        key: 'seen',
        label: 'First seen',
        width: '0.8fr',
        align: 'end',
        render: (row) => row.firstSeen,
    },
];
export default function App() {
    const { snapshot, viewState, isRefreshing, socketState, retryState, lastUpdated, refresh, reconnectNow, } = useObservabilityDashboard();
    if (viewState === 'loading') {
        return (_jsx("div", { className: "analytics-shell min-h-screen px-4 py-6 sm:px-6 lg:px-8", children: _jsx("div", { className: "mx-auto max-w-[1600px]", children: _jsx(DashboardSkeleton, {}) }) }));
    }
    return (_jsx("div", { className: "analytics-shell min-h-screen px-4 py-6 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-[1600px]", children: [_jsx("header", { className: "rounded-[32px] border border-white/10 bg-slate-950/65 p-6 shadow-[0_25px_90px_rgba(15,23,42,0.35)] backdrop-blur", children: _jsxs("div", { className: "flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200 ring-1 ring-cyan-400/20", children: "Forge telemetry fabric" }), _jsx("h1", { "data-testid": "dashboard-heading", className: "mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl", children: "Observability Command Center" }), _jsx("p", { "data-testid": "dashboard-subtitle", className: "mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg", children: "Realtime metrics, release health, Lighthouse trends, CI throughput, user behavior, and end-to-end traces in one operational view." })] }), _jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center", children: [_jsxs("div", { className: "rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-3", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-slate-500", children: "Feed" }), _jsxs("div", { className: "mt-2 flex items-center gap-3", children: [_jsx(StatusPill, { label: socketState === 'live' ? 'Live' : socketState === 'retrying' ? 'Retrying' : 'Connecting', className: socketTone[socketState] }), _jsxs("span", { className: "text-sm text-slate-300", children: ["Last sync ", lastUpdated] })] }), socketState === 'retrying' ? (_jsxs("p", { className: "mt-2 text-xs text-amber-200", children: ["Retry attempt ", retryState.attempt, " in ", retryState.secondsRemaining, "s."] })) : null] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "button", onClick: refresh, className: "rounded-[20px] border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15", children: isRefreshing ? 'Refreshing...' : 'Refresh snapshot' }), _jsx("button", { type: "button", onClick: reconnectNow, className: "rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]", children: "Retry feed" })] })] })] }) }), _jsx("section", { className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: snapshot.summary.map((metric) => (_jsxs("div", { className: "rounded-[28px] border border-white/10 bg-slate-950/65 p-5 backdrop-blur", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-slate-500", children: metric.label }), _jsxs("div", { className: "mt-4 flex items-end justify-between gap-4", children: [_jsx("p", { className: "text-3xl font-semibold text-white", children: metric.value }), _jsx("span", { className: `rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${metric.tone === 'positive'
                                            ? 'bg-emerald-400/15 text-emerald-200'
                                            : metric.tone === 'warning'
                                                ? 'bg-amber-400/15 text-amber-200'
                                                : 'bg-white/10 text-slate-200'}`, children: metric.delta })] })] }, metric.id))) }), _jsxs("main", { className: "mt-6 grid gap-4 xl:grid-cols-[1.45fr_0.95fr]", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(WidgetCard, { eyebrow: "Realtime metrics", title: "Throughput, latency, and error pressure", description: "A websocket-simulated stream tracks request pressure, p95 latency, and saturation every few seconds.", action: _jsx("div", { className: "rounded-full bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-400", children: "auto stream" }), children: _jsx("div", { "data-testid": "realtime-metrics-widget", className: "h-[320px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: snapshot.realtimeMetrics, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "latencyGradient", x1: "0", x2: "0", y1: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#22d3ee", stopOpacity: 0.45 }), _jsx("stop", { offset: "100%", stopColor: "#22d3ee", stopOpacity: 0 })] }), _jsxs("linearGradient", { id: "throughputGradient", x1: "0", x2: "0", y1: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#818cf8", stopOpacity: 0.35 }), _jsx("stop", { offset: "100%", stopColor: "#818cf8", stopOpacity: 0 })] })] }), _jsx(CartesianGrid, { stroke: "rgba(148, 163, 184, 0.12)", vertical: false }), _jsx(XAxis, { dataKey: "label", stroke: "#64748b", tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#64748b", tickLine: false, axisLine: false, width: 44 }), _jsx(Tooltip, { contentStyle: {
                                                            borderRadius: 18,
                                                            border: '1px solid rgba(148, 163, 184, 0.18)',
                                                            background: 'rgba(2, 6, 23, 0.95)',
                                                            color: '#e2e8f0',
                                                        } }), _jsx(Legend, { wrapperStyle: { color: '#cbd5e1' } }), _jsx(Area, { type: "monotone", dataKey: "throughput", stroke: "#818cf8", fill: "url(#throughputGradient)", strokeWidth: 2, name: "req/min" }), _jsx(Area, { type: "monotone", dataKey: "latency", stroke: "#22d3ee", fill: "url(#latencyGradient)", strokeWidth: 2, name: "latency p95" }), _jsx(Line, { type: "monotone", dataKey: "errorRate", stroke: "#fb7185", strokeWidth: 2, name: "error %" })] }) }) }) }), _jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [_jsx(WidgetCard, { eyebrow: "Lighthouse history", title: "Release-over-release quality trend", description: "Performance, accessibility, best practices, and SEO remain visible before every rollout.", children: _jsx("div", { className: "h-[280px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: snapshot.lighthouseHistory, children: [_jsx(CartesianGrid, { stroke: "rgba(148, 163, 184, 0.12)", vertical: false }), _jsx(XAxis, { dataKey: "label", stroke: "#64748b", tickLine: false, axisLine: false }), _jsx(YAxis, { domain: [80, 100], stroke: "#64748b", tickLine: false, axisLine: false, width: 36 }), _jsx(Tooltip, { contentStyle: {
                                                                    borderRadius: 18,
                                                                    border: '1px solid rgba(148, 163, 184, 0.18)',
                                                                    background: 'rgba(2, 6, 23, 0.95)',
                                                                } }), _jsx(Legend, { wrapperStyle: { color: '#cbd5e1' } }), _jsx(Line, { type: "monotone", dataKey: "performance", stroke: "#38bdf8", strokeWidth: 2.4, dot: false }), _jsx(Line, { type: "monotone", dataKey: "accessibility", stroke: "#34d399", strokeWidth: 2.4, dot: false }), _jsx(Line, { type: "monotone", dataKey: "bestPractices", stroke: "#f59e0b", strokeWidth: 2.4, dot: false }), _jsx(Line, { type: "monotone", dataKey: "seo", stroke: "#a78bfa", strokeWidth: 2.4, dot: false })] }) }) }) }), _jsx(WidgetCard, { eyebrow: "User analytics", title: "Retention and conversion cadence", description: "Weekly active and retained users are compared against conversion volume for growth health.", children: _jsx("div", { className: "h-[280px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: snapshot.userAnalytics, children: [_jsx(CartesianGrid, { stroke: "rgba(148, 163, 184, 0.12)", vertical: false }), _jsx(XAxis, { dataKey: "label", stroke: "#64748b", tickLine: false, axisLine: false }), _jsx(YAxis, { yAxisId: "users", stroke: "#64748b", tickLine: false, axisLine: false, width: 42 }), _jsx(YAxis, { yAxisId: "conversions", orientation: "right", stroke: "#64748b", tickLine: false, axisLine: false, width: 42 }), _jsx(Tooltip, { contentStyle: {
                                                                    borderRadius: 18,
                                                                    border: '1px solid rgba(148, 163, 184, 0.18)',
                                                                    background: 'rgba(2, 6, 23, 0.95)',
                                                                } }), _jsx(Legend, { wrapperStyle: { color: '#cbd5e1' } }), _jsx(Bar, { yAxisId: "users", dataKey: "activeUsers", radius: [10, 10, 0, 0], fill: "#22d3ee" }), _jsx(Bar, { yAxisId: "users", dataKey: "retainedUsers", radius: [10, 10, 0, 0], fill: "#14b8a6" }), _jsx(Line, { yAxisId: "conversions", type: "monotone", dataKey: "conversions", stroke: "#f97316", strokeWidth: 2.4, dot: false })] }) }) }) })] }), _jsx(WidgetCard, { eyebrow: "Tracing visualization", title: "Critical path waterfall", description: "Trace timing reveals the services stretching the request path and where error states are surfacing.", children: _jsx(TraceWaterfall, { spans: snapshot.traceSpans }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(WidgetCard, { eyebrow: "Deployment monitoring", title: "Release train status", description: "Track active canaries, rollback pressure, and region-by-region health without leaving the dashboard.", children: _jsx("div", { className: "space-y-3", children: snapshot.deployments.map((deployment) => (_jsxs("div", { className: "rounded-[24px] border border-white/8 bg-white/[0.03] p-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-base font-medium text-white", children: [deployment.service, " ", _jsx("span", { className: "text-slate-500", children: deployment.version })] }), _jsxs("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-slate-500", children: [deployment.region, " region \u00B7 ", deployment.startedAt] })] }), _jsx(StatusPill, { label: deployment.status, className: deploymentTone[deployment.status] })] }), _jsx("div", { className: "mt-4 h-2 rounded-full bg-white/[0.06]", children: _jsx("div", { className: `h-full rounded-full ${deployment.status === 'rollback'
                                                            ? 'bg-rose-400'
                                                            : deployment.status === 'monitoring'
                                                                ? 'bg-amber-300'
                                                                : 'bg-emerald-400'}`, style: { width: `${deployment.canaryPercent}%` } }) }), _jsxs("div", { className: "mt-3 flex items-center justify-between text-xs text-slate-400", children: [_jsxs("span", { children: ["Canary ", deployment.canaryPercent, "%"] }), _jsxs("span", { children: [deployment.incidents, " incident(s)"] })] })] }, deployment.id))) }) }), _jsxs(WidgetCard, { eyebrow: "CI pipeline history", title: "Build reliability and queue pressure", description: "Recent runs are virtualized for scale while the chart highlights pass, fail, and queue distribution.", children: [_jsx("div", { className: "h-[180px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: [
                                                        { name: 'Passed', count: snapshot.pipelines.filter((run) => run.status === 'passed').length },
                                                        { name: 'Running', count: snapshot.pipelines.filter((run) => run.status === 'running').length },
                                                        { name: 'Queued', count: snapshot.pipelines.filter((run) => run.status === 'queued').length },
                                                        { name: 'Failed', count: snapshot.pipelines.filter((run) => run.status === 'failed').length },
                                                    ], children: [_jsx(CartesianGrid, { stroke: "rgba(148, 163, 184, 0.12)", vertical: false }), _jsx(XAxis, { dataKey: "name", stroke: "#64748b", tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#64748b", tickLine: false, axisLine: false, width: 32 }), _jsx(Tooltip, { contentStyle: {
                                                                borderRadius: 18,
                                                                border: '1px solid rgba(148, 163, 184, 0.18)',
                                                                background: 'rgba(2, 6, 23, 0.95)',
                                                            } }), _jsx(Bar, { dataKey: "count", radius: [12, 12, 0, 0], fill: "#38bdf8" })] }) }) }), _jsx("div", { className: "mt-5", children: _jsx(VirtualizedTable, { columns: pipelineColumns, rows: snapshot.pipelines, emptyLabel: "No pipeline runs in range." }) })] }), _jsx(WidgetCard, { eyebrow: "Error tracking", title: "Regressions and user impact", description: "Open issues are prioritized by severity and user blast radius with room for much larger datasets.", children: _jsx("div", { "data-testid": "error-tracking-widget", children: _jsx(VirtualizedTable, { columns: errorColumns, rows: snapshot.errors, emptyLabel: "No active errors." }) }) }), _jsx(WidgetCard, { eyebrow: "Performance budgets", title: "Budget adherence", description: "Watch budgets drift before they become release blockers.", children: _jsx("div", { className: "space-y-3", children: snapshot.budgets.map((budget) => (_jsx(BudgetRow, { budget: budget }, budget.id))) }) })] })] })] }) }));
}
//# sourceMappingURL=App_old.js.map