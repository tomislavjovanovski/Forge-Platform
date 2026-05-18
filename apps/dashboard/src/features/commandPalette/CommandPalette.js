import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export function CommandPalette({ onToggleTheme }) {
    const commands = [
        { id: 'c-01', label: 'Open audit log', action: () => window.alert('Navigate to audit log') },
        { id: 'c-02', label: 'View monitoring panel', action: () => window.alert('Navigate to monitoring') },
        { id: 'c-03', label: 'Create new incident report', action: () => window.alert('Create incident') },
        { id: 'c-04', label: 'Toggle theme mode', action: onToggleTheme },
    ];
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()));
    useEffect(() => {
        const onKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setOpen((current) => !current);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-40 flex items-start justify-center bg-slate-950/70 p-4 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-950 p-5 shadow-2xl", children: [_jsxs("div", { className: "flex items-center justify-between gap-4 pb-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm uppercase tracking-[0.24em] text-slate-400", children: "Command palette" }), _jsx("h2", { className: "mt-2 text-xl font-semibold text-slate-50", children: "Quick actions" })] }), _jsx("button", { type: "button", onClick: () => setOpen(false), className: "rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800", children: "Close" })] }), _jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search commands...", className: "w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-base text-slate-100 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-500/40" }), _jsx("div", { className: "mt-4 max-h-72 space-y-2 overflow-y-auto", children: filtered.length ? (filtered.map((item) => (_jsx("button", { type: "button", onClick: () => item.action(), className: "w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-left text-sm text-slate-100 transition hover:border-slate-600 hover:bg-slate-800", children: item.label }, item.id)))) : (_jsx("div", { className: "rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-sm text-slate-500", children: "No command matches the query." })) })] }) }));
}
//# sourceMappingURL=CommandPalette.js.map