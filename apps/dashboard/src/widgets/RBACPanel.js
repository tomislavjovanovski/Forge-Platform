import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { permissionMap, permissionNames } from '../features/permissions/permissionUtils';
export function RBACPanel({ user }) {
    const permissions = permissionMap[user.role] ?? [];
    return (_jsxs("div", { className: "rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl", children: [_jsxs("div", { className: "mb-5", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-slate-500", children: "RBAC" }), _jsx("h3", { className: "mt-2 text-xl font-semibold text-slate-50", children: "Permissions summary" })] }), _jsx("div", { className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3", children: permissions.map((permission) => (_jsx("div", { className: "rounded-3xl border border-slate-800 bg-slate-950 p-4", children: _jsx("p", { className: "text-sm font-semibold text-slate-100", children: permissionNames[permission] ?? permission }) }, permission))) })] }));
}
//# sourceMappingURL=RBACPanel.js.map