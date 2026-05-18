import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Playground Application
 *
 * A resilience-focused demo showing reusable patterns:
 * - Websocket/realtime abstraction
 * - Retry handling with backoff
 * - Async boundaries and error recovery
 * - Skeleton loaders
 * - Optimistic updates
 * - Connection status tracking
 */
import { useState, useEffect, useCallback, } from 'react';
import { AppShell, PageContainer, AsyncSection, ThemeSwitcher, } from '@forge/ui';
export default function Playground() {
    const [connection, setConnection] = useState({
        status: 'disconnected',
        retryCount: 0,
    });
    const [metrics, setMetrics] = useState([]);
    const [activeTab, setActiveTab] = useState('realtime');
    // Simulate websocket connection with retry logic
    const connectWebSocket = useCallback(async () => {
        setConnection({ status: 'connecting', retryCount: connection.retryCount });
        try {
            // Simulate connection delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            // Randomly fail to demonstrate retry
            if (Math.random() > 0.7 && connection.retryCount < 2) {
                throw new Error('Connection failed');
            }
            setConnection({ status: 'connected', retryCount: connection.retryCount });
            // Simulate incoming metrics
            const newMetrics = Array.from({ length: 5 }, (_, i) => ({
                timestamp: new Date(Date.now() - (4 - i) * 5000).toLocaleTimeString(),
                value: Math.floor(Math.random() * 100) + 50,
                label: `${i + 1}`,
            }));
            setMetrics(newMetrics);
        }
        catch (error) {
            if (connection.retryCount < 3) {
                const backoffDelay = Math.min(1000 * Math.pow(2, connection.retryCount), 10000);
                setConnection({
                    status: 'retrying',
                    retryCount: connection.retryCount + 1,
                    lastError: error.message,
                });
                setTimeout(() => {
                    void connectWebSocket();
                }, backoffDelay);
            }
            else {
                setConnection({
                    status: 'disconnected',
                    retryCount: connection.retryCount,
                    lastError: 'Max retries exceeded',
                });
            }
        }
    }, [connection.retryCount]);
    // Auto-connect on mount
    useEffect(() => {
        void connectWebSocket();
    }, [connectWebSocket]);
    const handleReconnect = () => {
        setConnection({ status: 'disconnected', retryCount: 0 });
        setTimeout(() => {
            void connectWebSocket();
        }, 500);
    };
    const handleSimulateFailure = () => {
        setConnection({
            status: 'retrying',
            retryCount: 0,
            lastError: 'Simulated connection loss',
        });
        setTimeout(() => {
            void connectWebSocket();
        }, 1000);
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'connected':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'connecting':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'retrying':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
            case 'disconnected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        }
    };
    return (_jsx(AppShell, { sidebar: _jsxs("nav", { className: "space-y-2", children: [_jsxs("div", { className: "mb-4 flex items-center gap-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-bold", children: "\uD83D\uDE80" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-900 dark:text-slate-50", children: "Playground" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Resilience Demo" })] })] }), [
                    { id: 'realtime', label: 'Realtime' },
                    { id: 'resilience', label: 'Resilience' },
                    { id: 'patterns', label: 'Patterns' },
                ].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.id), className: `w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`, children: tab.label }, tab.id)))] }), header: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50", children: "Resilience Patterns" }), _jsx(ThemeSwitcher, {})] }), children: _jsxs(PageContainer, { children: [activeTab === 'realtime' && (_jsx("div", { className: "space-y-6", children: _jsx(AsyncSection, { title: "Realtime Connection", children: _jsxs("div", { className: "space-y-4 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-50", children: "WebSocket Connection" }), _jsx("p", { className: "mt-1 text-sm text-slate-600 dark:text-slate-400", children: "Real-time data streaming with automatic reconnection" })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs("span", { className: `inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(connection.status)}`, children: [_jsx("span", { className: `h-2 w-2 rounded-full ${connection.status === 'connected' ? 'animate-pulse' : ''}` }), connection.status] }) })] }), connection.retryCount > 0 && (_jsx("div", { className: "rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20", children: _jsxs("p", { className: "text-sm text-amber-800 dark:text-amber-200", children: ["Retry attempt: ", connection.retryCount, "/3", connection.lastError && ` - ${connection.lastError}`] }) })), metrics.length > 0 && (_jsxs("div", { className: "mt-4", children: [_jsx("h4", { className: "mb-3 font-medium text-slate-900 dark:text-slate-50", children: "Streaming Metrics" }), _jsx("div", { className: "space-y-2", children: metrics.map((m, idx) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "w-12 text-xs text-slate-500 dark:text-slate-400", children: m.timestamp }), _jsx("div", { className: "flex-1", children: _jsx("div", { className: "h-2 rounded-full bg-slate-200 dark:bg-slate-700", style: { width: '100%' }, children: _jsx("div", { className: "h-full rounded-full bg-purple-600", style: { width: `${(m.value / 150) * 100}%` } }) }) }), _jsx("span", { className: "w-12 text-right text-xs font-medium text-slate-900 dark:text-slate-50", children: m.value })] }, idx))) })] })), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { onClick: handleSimulateFailure, className: "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700", children: "Simulate Failure" }), _jsx("button", { onClick: handleReconnect, className: "rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700", children: "Reconnect" })] })] }) }) })), activeTab === 'resilience' && (_jsx("div", { className: "space-y-6", children: _jsx(AsyncSection, { title: "Resilience Patterns", children: _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { className: "rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-50", children: "Exponential Backoff" }), _jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: "Automatically retry failed requests with exponential backoff delays:" }), _jsxs("ul", { className: "mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400", children: [_jsx("li", { children: "\u2022 Attempt 1: immediate" }), _jsx("li", { children: "\u2022 Attempt 2: 1 second" }), _jsx("li", { children: "\u2022 Attempt 3: 2 seconds" }), _jsx("li", { children: "\u2022 Attempt 4: 4 seconds" }), _jsx("li", { children: "\u2022 Max: 10 seconds (capped)" })] })] }), _jsxs("div", { className: "rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-50", children: "Optimistic Updates" }), _jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: "Update UI immediately, then sync with server:" }), _jsxs("ul", { className: "mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400", children: [_jsx("li", { children: "\u2022 Instant feedback to users" }), _jsx("li", { children: "\u2022 Rollback on server error" }), _jsx("li", { children: "\u2022 Conflict resolution" }), _jsx("li", { children: "\u2022 Reduced latency perception" })] })] }), _jsxs("div", { className: "rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-50", children: "Circuit Breaker" }), _jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: "Prevent cascading failures in distributed systems:" }), _jsxs("ul", { className: "mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400", children: [_jsx("li", { children: "\u2022 Fail fast on repeated errors" }), _jsx("li", { children: "\u2022 Open/Closed/Half-open states" }), _jsx("li", { children: "\u2022 Reduce backend load" }), _jsx("li", { children: "\u2022 Self-healing capability" })] })] }), _jsxs("div", { className: "rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-50", children: "Error Boundaries" }), _jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: "Isolate component failures and graceful degradation:" }), _jsxs("ul", { className: "mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400", children: [_jsx("li", { children: "\u2022 Catch render errors" }), _jsx("li", { children: "\u2022 Show fallback UI" }), _jsx("li", { children: "\u2022 Log error details" }), _jsx("li", { children: "\u2022 Prevent white screen" })] })] })] }) }) })), activeTab === 'patterns' && (_jsx("div", { className: "space-y-6", children: _jsx(AsyncSection, { title: "Frontend Architecture Patterns", children: _jsx("div", { className: "space-y-4", children: [
                                {
                                    name: 'Async Boundaries',
                                    description: 'Suspend rendering at async boundaries with proper error and loading states',
                                },
                                {
                                    name: 'Skeleton Loaders',
                                    description: 'Show placeholder content while data is loading to reduce perceived latency',
                                },
                                {
                                    name: 'State Synchronization',
                                    description: 'Keep client and server state in sync with conflict detection',
                                },
                                {
                                    name: 'Request Deduplication',
                                    description: 'Batch multiple requests for the same resource',
                                },
                                {
                                    name: 'Cache Strategies',
                                    description: 'Implement stale-while-revalidate and cache-first patterns',
                                },
                                {
                                    name: 'Mutation Queuing',
                                    description: 'Queue mutations during offline and process when connection resumes',
                                },
                            ].map((pattern, idx) => (_jsxs("div", { className: "rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900", children: [_jsx("h4", { className: "font-semibold text-slate-900 dark:text-slate-50", children: pattern.name }), _jsx("p", { className: "mt-1 text-sm text-slate-600 dark:text-slate-400", children: pattern.description })] }, idx))) }) }) }))] }) }));
}
//# sourceMappingURL=App.js.map