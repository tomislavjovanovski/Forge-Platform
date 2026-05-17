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

import React, { useState, useEffect, useCallback } from 'react';
import {
  AppShell,
  PageContainer,
  AsyncSection,
  ThemeSwitcher,
} from '@forge/ui';

interface ConnectionState {
  status: 'connecting' | 'connected' | 'disconnected' | 'retrying';
  retryCount: number;
  lastError?: string;
}

interface MetricData {
  timestamp: string;
  value: number;
  label: string;
}

export default function Playground() {
  const [connection, setConnection] = useState<ConnectionState>({
    status: 'disconnected',
    retryCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [activeTab, setActiveTab] = useState<'realtime' | 'resilience' | 'patterns'>('realtime');

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
    } catch (error) {
      if (connection.retryCount < 3) {
        const backoffDelay = Math.min(1000 * Math.pow(2, connection.retryCount), 10000);
        setConnection({
          status: 'retrying',
          retryCount: connection.retryCount + 1,
          lastError: (error as Error).message,
        });
        setTimeout(() => {
          connectWebSocket();
        }, backoffDelay);
      } else {
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
    connectWebSocket();
  }, []);

  const handleReconnect = () => {
    setConnection({ status: 'disconnected', retryCount: 0 });
    setTimeout(() => connectWebSocket(), 500);
  };

  const handleSimulateFailure = () => {
    setConnection({
      status: 'retrying',
      retryCount: 0,
      lastError: 'Simulated connection loss',
    });
    setTimeout(() => connectWebSocket(), 1000);
  };

  const getStatusColor = (status: ConnectionState['status']) => {
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

  return (
    <AppShell
      sidebar={
        <nav className="space-y-2">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-bold">
              🚀
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-50">Playground</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Resilience Demo</p>
            </div>
          </div>

          {[
            { id: 'realtime', label: 'Realtime' },
            { id: 'resilience', label: 'Resilience' },
            { id: 'patterns', label: 'Patterns' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      }
      header={
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Resilience Patterns
          </h1>
          <ThemeSwitcher />
        </div>
      }
    >
      <PageContainer>
        {activeTab === 'realtime' && (
          <div className="space-y-6">
            <AsyncSection title="Realtime Connection">
              <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                {/* Connection Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                      WebSocket Connection
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Real-time data streaming with automatic reconnection
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(connection.status)}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${
                        connection.status === 'connected' ? 'animate-pulse' : ''
                      }`} />
                      {connection.status}
                    </span>
                  </div>
                </div>

                {/* Retry Info */}
                {connection.retryCount > 0 && (
                  <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Retry attempt: {connection.retryCount}/3
                      {connection.lastError && ` - ${connection.lastError}`}
                    </p>
                  </div>
                )}

                {/* Metrics */}
                {metrics.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-3 font-medium text-slate-900 dark:text-slate-50">
                      Streaming Metrics
                    </h4>
                    <div className="space-y-2">
                      {metrics.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="w-12 text-xs text-slate-500 dark:text-slate-400">
                            {m.timestamp}
                          </span>
                          <div className="flex-1">
                            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700" style={{ width: '100%' }}>
                              <div
                                className="h-full rounded-full bg-purple-600"
                                style={{ width: `${(m.value / 150) * 100}%` }}
                              />
                            </div>
                          </div>
                          <span className="w-12 text-right text-xs font-medium text-slate-900 dark:text-slate-50">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSimulateFailure}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700"
                  >
                    Simulate Failure
                  </button>
                  <button
                    onClick={handleReconnect}
                    className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                  >
                    Reconnect
                  </button>
                </div>
              </div>
            </AsyncSection>
          </div>
        )}

        {activeTab === 'resilience' && (
          <div className="space-y-6">
            <AsyncSection title="Resilience Patterns">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Retry with Backoff */}
                <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                    Exponential Backoff
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Automatically retry failed requests with exponential backoff delays:
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li>• Attempt 1: immediate</li>
                    <li>• Attempt 2: 1 second</li>
                    <li>• Attempt 3: 2 seconds</li>
                    <li>• Attempt 4: 4 seconds</li>
                    <li>• Max: 10 seconds (capped)</li>
                  </ul>
                </div>

                {/* Optimistic Updates */}
                <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                    Optimistic Updates
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Update UI immediately, then sync with server:
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li>• Instant feedback to users</li>
                    <li>• Rollback on server error</li>
                    <li>• Conflict resolution</li>
                    <li>• Reduced latency perception</li>
                  </ul>
                </div>

                {/* Circuit Breaker */}
                <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                    Circuit Breaker
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Prevent cascading failures in distributed systems:
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li>• Fail fast on repeated errors</li>
                    <li>• Open/Closed/Half-open states</li>
                    <li>• Reduce backend load</li>
                    <li>• Self-healing capability</li>
                  </ul>
                </div>

                {/* Error Boundaries */}
                <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                    Error Boundaries
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Isolate component failures and graceful degradation:
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li>• Catch render errors</li>
                    <li>• Show fallback UI</li>
                    <li>• Log error details</li>
                    <li>• Prevent white screen</li>
                  </ul>
                </div>
              </div>
            </AsyncSection>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-6">
            <AsyncSection title="Frontend Architecture Patterns">
              <div className="space-y-4">
                {[
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
                ].map((pattern, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-50">
                      {pattern.name}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {pattern.description}
                    </p>
                  </div>
                ))}
              </div>
            </AsyncSection>
          </div>
        )}
      </PageContainer>
    </AppShell>
  );
}
