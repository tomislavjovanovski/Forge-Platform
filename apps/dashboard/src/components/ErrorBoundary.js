import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
export class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { hasError: false }
        });
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.error('Dashboard error boundary caught:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { className: "rounded-3xl border border-red-700 bg-red-950/80 p-8 text-slate-100 shadow-xl", children: [_jsx("h1", { className: "text-2xl font-semibold text-red-200", children: "Something went wrong" }), _jsx("p", { className: "mt-3 text-sm text-slate-300", children: "The dashboard encountered an unexpected error. Refresh the page or contact the platform team." })] }));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary.js.map