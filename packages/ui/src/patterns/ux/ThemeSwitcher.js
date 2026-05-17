import { jsx as _jsx } from "react/jsx-runtime";
/**
 * ThemeSwitcher Pattern
 * Toggle between light and dark theme
 */
import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
/**
 * ThemeSwitcher Component
 * Provides a button to toggle between light and dark themes
 *
 * Features:
 * - System preference detection
 * - Persistent storage
 * - Smooth transition
 * - Accessible
 */
export const ThemeSwitcher = React.forwardRef(({ theme: externalTheme, onChange, className }, ref) => {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);
    // Initialize theme from system preference or localStorage
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const preferred = stored ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light');
        setTheme(preferred);
        setMounted(true);
    }, []);
    const handleToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark');
        onChange?.(newTheme);
    };
    if (!mounted) {
        return (_jsx("div", { ref: ref, className: cn('inline-flex gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900', className), children: _jsx("div", { className: "h-9 w-9 rounded" }) }));
    }
    return (_jsx("div", { ref: ref, className: cn('inline-flex gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900', className), children: _jsx("button", { onClick: handleToggle, className: cn('inline-flex items-center justify-center gap-2 rounded-md px-3 py-2', 'transition-colors duration-200', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500', theme === 'light'
                ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'), "aria-label": `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`, children: theme === 'light' ? (_jsx("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" }) })) : (_jsx("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.293 1.293a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.293-1.293a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-2.828-2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-2.828-2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 6a4 4 0 110 8 4 4 0 010-8z", clipRule: "evenodd" }) })) }) }));
});
ThemeSwitcher.displayName = 'ThemeSwitcher';
//# sourceMappingURL=ThemeSwitcher.js.map