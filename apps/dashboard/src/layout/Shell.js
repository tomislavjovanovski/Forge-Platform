import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
export function Shell({ user, unreadCount, onOpenNotifications, children }) {
    return (_jsx("div", { className: "min-h-screen bg-slate-950 text-slate-100", children: _jsxs("div", { className: "relative mx-auto flex min-h-screen max-w-full overflow-hidden lg:max-w-[1600px]", children: [_jsx(Sidebar, { user: user }), _jsxs("div", { className: "flex min-h-screen flex-1 flex-col", children: [_jsx(TopBar, { unreadCount: unreadCount, onOpenNotifications: onOpenNotifications }), _jsx("main", { className: "flex-1 overflow-y-auto px-6 py-6 sm:px-8", children: children })] })] }) }));
}
//# sourceMappingURL=Shell.js.map