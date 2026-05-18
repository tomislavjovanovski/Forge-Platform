import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { markRead } from './notificationSlice';
export function NotificationCenter() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.notifications.items);
    const unread = useMemo(() => items.filter((item) => item.unread).length, [items]);
    return (_jsxs("div", { className: "rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl", children: [_jsxs("div", { className: "mb-5 flex items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-slate-500", children: "Notifications" }), _jsx("h3", { className: "mt-2 text-xl font-semibold text-slate-50", children: "Inbox" })] }), _jsxs("span", { className: "rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-400", children: [unread, " unread"] })] }), _jsx("div", { className: "space-y-4", children: items.map((notification) => (_jsxs("div", { className: "rounded-3xl border border-slate-800 bg-slate-950 p-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-slate-100", children: notification.title }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: notification.body })] }), _jsx("button", { type: "button", onClick: () => dispatch(markRead(notification.id)), className: "rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400 transition hover:border-slate-500", children: "Mark read" })] }), _jsx("div", { className: "mt-3 text-xs uppercase tracking-[0.28em] text-slate-500", children: notification.sentAt })] }, notification.id))) })] }));
}
//# sourceMappingURL=NotificationCenter.js.map