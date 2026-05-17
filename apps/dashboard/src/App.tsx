import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Shell } from './layout/Shell';
import { MonitoringWidgets } from './widgets/MonitoringWidgets';
import { AuditLogPanel } from './widgets/AuditLogPanel';
import { RBACPanel } from './widgets/RBACPanel';
import { NotificationCenter } from './features/notifications/NotificationCenter';
import { CommandPalette } from './features/commandPalette/CommandPalette';
import { useGetUserProfileQuery, useGetFeatureFlagsQuery } from './services/dashboardApi';
import { toggleMode } from './features/theme/themeSlice';

export default function App() {
  const { data: user, isLoading: userLoading } = useGetUserProfileQuery();
  const { data: flags } = useGetFeatureFlagsQuery();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(toggleMode());
  };

  if (userLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 px-7 py-6 text-center shadow-xl">
          <p className="text-lg font-semibold">Loading dashboard…</p>
          <p className="mt-2 text-sm text-slate-400">Initializing RBAC, features, and audit streams.</p>
        </div>
      </div>
    );
  }

  const unreadCount = 2;

  return (
    <ErrorBoundary>
      <Shell user={user} unreadCount={unreadCount} onOpenNotifications={() => setNotificationsOpen(true)}>
        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Workspace summary</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-50">Launch readiness</h2>
                </div>
                <div className="rounded-3xl bg-slate-950 px-4 py-3 text-sm text-slate-300">
                  Built for fast decisions with observability and control.
                </div>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-400">
                This enterprise shell is built for RBAC-driven operations, audit visibility, and feature flag governance.
              </p>
            </div>

            {flags?.enableMonitoring && <MonitoringWidgets />}

            <div className="grid gap-6 xl:grid-cols-2">
              <RBACPanel user={user} />
              {flags?.enableAuditTrail && <AuditLogPanel />}
            </div>
          </section>

          <aside className="space-y-6">
            <NotificationCenter />
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Optimization</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-50">Optimistic updates</h3>
              <p className="mt-3 text-sm text-slate-400">
                UI state updates in anticipation of server responses help the dashboard feel faster and more resilient.
              </p>
            </div>
          </aside>
        </div>
        {flags?.enableCommandPalette && <CommandPalette onToggleTheme={handleToggleTheme} />}
        {notificationsOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-50">Notification center</h3>
                  <p className="text-sm text-slate-400">Recent alerts and workflow updates.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-500"
                >
                  Close
                </button>
              </div>
              <div className="mt-6">
                <NotificationCenter />
              </div>
            </div>
          </div>
        )}
      </Shell>
    </ErrorBoundary>
  );
}
