import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * AppShell Pattern
 * Primary application layout with header, sidebar, and main content area
 * Responsive layout that collapses sidebar on mobile
 */
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
/**
 * AppShell Component
 * Provides a complete application layout structure
 *
 * Features:
 * - Responsive sidebar (collapsible on mobile)
 * - Fixed header with navigation
 * - Flexible main content area
 * - Optional footer
 * - Dark mode support
 */
export const AppShell = React.forwardRef(({ sidebar, header, children, footer, className }, ref) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (_jsxs("div", { ref: ref, className: cn('flex h-screen flex-col bg-slate-50 dark:bg-slate-950', className), children: [header && (_jsx("header", { className: "border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900", children: _jsx("div", { className: "flex items-center justify-between px-4 py-3 sm:px-6", children: _jsxs("div", { className: "flex flex-1 items-center gap-4", children: [sidebar && (_jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "rounded-lg border border-slate-200 p-2 hover:bg-slate-100 sm:hidden dark:border-slate-700 dark:hover:bg-slate-800", "aria-label": "Toggle sidebar", children: _jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) })), _jsx("div", { className: "flex-1", children: header })] }) }) })), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [sidebar && (_jsxs(_Fragment, { children: [sidebarOpen && (_jsx("div", { className: "fixed inset-0 z-30 bg-slate-950/50 sm:hidden", onClick: () => setSidebarOpen(false) })), _jsx("aside", { className: cn('absolute inset-y-0 left-0 w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:static sm:w-64', 'transition-transform duration-200', sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0', 'z-40 overflow-y-auto'), children: _jsx("div", { className: "p-4", children: sidebar }) })] })), _jsxs("main", { className: "flex flex-1 flex-col overflow-hidden", children: [_jsx("div", { className: "flex-1 overflow-auto bg-slate-50 dark:bg-slate-950", children: _jsx("div", { className: "px-4 py-6 sm:px-6 lg:px-8", children: children }) }), footer && (_jsx("footer", { className: "border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900", children: _jsx("div", { className: "px-4 py-4 sm:px-6", children: footer }) }))] })] })] }));
});
AppShell.displayName = 'AppShell';
//# sourceMappingURL=AppShell.js.map