import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const navItems = [
    { label: 'Overview', hint: 'Metrics' },
    { label: 'Audit', hint: 'Logs' },
    { label: 'Monitoring', hint: 'Health' },
    { label: 'Permissions', hint: 'RBAC' },
    { label: 'Notifications', hint: 'Inbox' },
];
export function Sidebar({ user }) {
    return (_jsxs("aside", { className: "hidden w-72 shrink-0 flex-col gap-8 border-r border-slate-800 bg-slate-950 p-6 lg:flex", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Forge Admin" }), _jsx("h1", { className: "mt-4 text-xl font-semibold text-slate-50", children: "Workspace shell" })] }), _jsx("div", { className: "space-y-3", children: navItems.map((item) => (_jsxs("button", { type: "button", className: "flex w-full items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-slate-600 hover:bg-slate-800", children: [_jsx("span", { children: item.label }), _jsx("span", { className: "text-xs text-slate-500", children: item.hint })] }, item.label))) }), _jsxs("div", { className: "mt-auto rounded-3xl border border-slate-800 bg-slate-900 p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Account" }), _jsx("p", { className: "mt-3 font-semibold text-slate-50", children: user.name }), _jsx("p", { className: "text-sm text-slate-400", children: user.email }), _jsx("span", { className: "mt-3 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400", children: user.role })] })] }));
}
//# sourceMappingURL=Sidebar.js.map