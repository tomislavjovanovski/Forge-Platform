import { jsx as _jsx } from "react/jsx-runtime";
export function LoadingSkeleton({ rows = 4 }) {
    return (_jsx("div", { className: "space-y-3", children: Array.from({ length: rows }).map((_, index) => (_jsx("div", { className: "h-10 w-full animate-pulse rounded-2xl bg-slate-800/80" }, index))) }));
}
//# sourceMappingURL=LoadingSkeleton.js.map