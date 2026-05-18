import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const spanTone = {
    ok: 'from-emerald-400 to-cyan-300',
    warning: 'from-amber-400 to-orange-300',
    error: 'from-rose-500 to-fuchsia-400',
};
export function TraceWaterfall({ spans }) {
    const totalDuration = Math.max(...spans.map((span) => span.start + span.duration));
    return (_jsxs("div", { className: "rounded-[24px] border border-white/8 bg-slate-900/70 p-4", children: [_jsxs("div", { className: "grid grid-cols-[minmax(0,220px)_1fr] gap-4 border-b border-white/8 pb-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400", children: [_jsx("div", { children: "Span" }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "0 ms" }), _jsxs("span", { children: [totalDuration, " ms"] })] })] }), _jsx("div", { className: "mt-4 space-y-3", children: spans.map((span) => {
                    const left = (span.start / totalDuration) * 100;
                    const width = (span.duration / totalDuration) * 100;
                    return (_jsxs("div", { className: "grid grid-cols-[minmax(0,220px)_1fr] gap-4", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "truncate text-sm font-medium text-white", style: { paddingLeft: `${span.depth * 14}px` }, children: span.name }), _jsx("p", { className: "truncate text-xs uppercase tracking-[0.2em] text-slate-500", style: { paddingLeft: `${span.depth * 14}px` }, children: span.service })] }), _jsxs("div", { className: "relative flex h-11 items-center rounded-full bg-white/[0.03]", children: [_jsx("div", { className: `absolute h-7 rounded-full bg-gradient-to-r ${spanTone[span.status]} shadow-[0_10px_22px_rgba(6,182,212,0.18)]`, style: {
                                            left: `${left}%`,
                                            width: `${Math.max(width, 6)}%`,
                                        } }), _jsxs("div", { className: "absolute inset-x-3 flex justify-between text-[0.68rem] font-medium text-slate-200", children: [_jsxs("span", { children: [span.start, " ms"] }), _jsxs("span", { children: [span.duration, " ms"] })] })] })] }, span.id));
                }) })] }));
}
//# sourceMappingURL=TraceWaterfall.js.map