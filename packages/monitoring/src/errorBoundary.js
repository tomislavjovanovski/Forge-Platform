import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { Sentry } from './sentry';
export class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                hasError: false,
            }
        });
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }
    componentDidCatch(error, errorInfo) {
        if (typeof window !==
            'undefined') {
            Sentry.captureException(error, {
                extra: {
                    componentStack: errorInfo.componentStack,
                },
            });
        }
    }
    render() {
        if (this.state.hasError) {
            return (this.props.fallback ?? (_jsxs("div", { role: "alert", className: "bg-red-50 p-6 text-red-900", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Something went wrong." }), _jsx("p", { children: "Please refresh the page or contact support if the problem persists." })] })));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=errorBoundary.js.map