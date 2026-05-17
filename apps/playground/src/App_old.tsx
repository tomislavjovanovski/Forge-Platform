import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import { TraceWaterfall } from './components/TraceWaterfall';
import { VirtualizedTable, type VirtualizedColumn } from './components/VirtualizedTable';
import { WidgetCard } from './components/WidgetCard';
import {
  type DeploymentRecord,
  type ErrorEvent,
  type PerformanceBudget,
  type PipelineRun,
} from './data/observability';
import { useObservabilityDashboard } from './hooks/useObservabilityDashboard';

const deploymentTone: Record<DeploymentRecord['status'], string> = {
  healthy: 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30',
  monitoring: 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/30',
  rollback: 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30',
};

const severityTone: Record<ErrorEvent['severity'], string> = {
  critical: 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30',
  high: 'bg-orange-400/15 text-orange-200 ring-1 ring-orange-400/30',
  medium: 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/30',
  low: 'bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/30',
};

const pipelineTone: Record<PipelineRun['status'], string> = {
  passed: 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/30',
  running: 'bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/30',
  failed: 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30',
  queued: 'bg-slate-400/15 text-slate-200 ring-1 ring-slate-300/20',
};

const socketTone = {
  connecting: 'bg-cyan-400/15 text-cyan-200 ring-cyan-400/30',
  live: 'bg-emerald-400/15 text-emerald-200 ring-emerald-400/30',
  retrying: 'bg-amber-400/15 text-amber-200 ring-amber-400/30',
} as const;

function StatusPill({
  label,
  className,
}: {
  label: string;
  className: string;
}): React.ReactElement {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}

function formatBudget(budget: PerformanceBudget): string {
  if (budget.unit === 'cls') {
    return budget.current.toFixed(3);
  }

  return `${Math.round(budget.current)}`;
}

function BudgetRow({ budget }: { budget: PerformanceBudget }): React.ReactElement {
  const ratio = (budget.current / budget.budget) * 100;
  const overBudget = budget.current > budget.budget;

  return (
    <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">{budget.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{budget.owner}</p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-semibold ${overBudget ? 'text-rose-200' : 'text-emerald-200'}`}>
            {formatBudget(budget)}
            {budget.unit}
          </p>
          <p className="text-xs text-slate-500">
            budget {budget.budget}
            {budget.unit}
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${overBudget ? 'bg-rose-400' : 'bg-cyan-300'}`}
          style={{ width: `${Math.min(ratio, 100)}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{Math.round(ratio)}% of budget</span>
        <span>{budget.trend}</span>
      </div>
    </div>
  );
}

const pipelineColumns: VirtualizedColumn<PipelineRun>[] = [
  {
    key: 'service',
    label: 'Service',
    width: '1.3fr',
    render: (row) => (
      <div>
        <p className="font-medium text-white">{row.service}</p>
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{row.branch}</p>
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    width: '0.8fr',
    render: (row) => <StatusPill label={row.status} className={pipelineTone[row.status]} />,
  },
  {
    key: 'duration',
    label: 'Duration',
    width: '0.7fr',
    align: 'end',
    render: (row) => `${row.durationMin}m`,
  },
  {
    key: 'coverage',
    label: 'Coverage',
    width: '0.8fr',
    align: 'end',
    render: (row) => `${row.coverage}%`,
  },
  {
    key: 'commit',
    label: 'Commit',
    width: '0.9fr',
    align: 'end',
    render: (row) => (
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-300">
        {row.commit}
      </span>
    ),
  },
];

const errorColumns: VirtualizedColumn<ErrorEvent>[] = [
  {
    key: 'issue',
    label: 'Issue',
    width: '1.5fr',
    render: (row) => (
      <div className="min-w-0">
        <p className="truncate font-medium text-white">{row.issue}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{row.service}</p>
      </div>
    ),
  },
  {
    key: 'severity',
    label: 'Severity',
    width: '0.85fr',
    render: (row) => <StatusPill label={row.severity} className={severityTone[row.severity]} />,
  },
  {
    key: 'count',
    label: 'Count',
    width: '0.55fr',
    align: 'end',
    render: (row) => row.count,
  },
  {
    key: 'users',
    label: 'Users',
    width: '0.65fr',
    align: 'end',
    render: (row) => row.affectedUsers,
  },
  {
    key: 'seen',
    label: 'First seen',
    width: '0.8fr',
    align: 'end',
    render: (row) => row.firstSeen,
  },
];

export default function App(): React.ReactElement {
  const {
    snapshot,
    viewState,
    isRefreshing,
    socketState,
    retryState,
    lastUpdated,
    refresh,
    reconnectNow,
  } = useObservabilityDashboard();

  if (viewState === 'loading') {
    return (
      <div className="analytics-shell min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-shell min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <header className="rounded-[32px] border border-white/10 bg-slate-950/65 p-6 shadow-[0_25px_90px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200 ring-1 ring-cyan-400/20">
                Forge telemetry fabric
              </div>
              <h1
                data-testid="dashboard-heading"
                className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              >
                Observability Command Center
              </h1>
              <p
                data-testid="dashboard-subtitle"
                className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg"
              >
                Realtime metrics, release health, Lighthouse trends, CI throughput, user behavior,
                and end-to-end traces in one operational view.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Feed</p>
                <div className="mt-2 flex items-center gap-3">
                  <StatusPill
                    label={socketState === 'live' ? 'Live' : socketState === 'retrying' ? 'Retrying' : 'Connecting'}
                    className={socketTone[socketState]}
                  />
                  <span className="text-sm text-slate-300">Last sync {lastUpdated}</span>
                </div>
                {socketState === 'retrying' ? (
                  <p className="mt-2 text-xs text-amber-200">
                    Retry attempt {retryState.attempt} in {retryState.secondsRemaining}s.
                  </p>
                ) : null}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={refresh}
                  className="rounded-[20px] border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15"
                >
                  {isRefreshing ? 'Refreshing...' : 'Refresh snapshot'}
                </button>
                <button
                  type="button"
                  onClick={reconnectNow}
                  className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  Retry feed
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {snapshot.summary.map((metric) => (
            <div
              key={metric.id}
              className="rounded-[28px] border border-white/10 bg-slate-950/65 p-5 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{metric.label}</p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                    metric.tone === 'positive'
                      ? 'bg-emerald-400/15 text-emerald-200'
                      : metric.tone === 'warning'
                        ? 'bg-amber-400/15 text-amber-200'
                        : 'bg-white/10 text-slate-200'
                  }`}
                >
                  {metric.delta}
                </span>
              </div>
            </div>
          ))}
        </section>

        <main className="mt-6 grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="space-y-4">
            <WidgetCard
              eyebrow="Realtime metrics"
              title="Throughput, latency, and error pressure"
              description="A websocket-simulated stream tracks request pressure, p95 latency, and saturation every few seconds."
              action={
                <div className="rounded-full bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  auto stream
                </div>
              }
            >
              <div data-testid="realtime-metrics-widget" className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={snapshot.realtimeMetrics}>
                    <defs>
                      <linearGradient id="latencyGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="throughputGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
                    <XAxis dataKey="label" stroke="#64748b" tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" tickLine={false} axisLine={false} width={44} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 18,
                        border: '1px solid rgba(148, 163, 184, 0.18)',
                        background: 'rgba(2, 6, 23, 0.95)',
                        color: '#e2e8f0',
                      }}
                    />
                    <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                    <Area
                      type="monotone"
                      dataKey="throughput"
                      stroke="#818cf8"
                      fill="url(#throughputGradient)"
                      strokeWidth={2}
                      name="req/min"
                    />
                    <Area
                      type="monotone"
                      dataKey="latency"
                      stroke="#22d3ee"
                      fill="url(#latencyGradient)"
                      strokeWidth={2}
                      name="latency p95"
                    />
                    <Line type="monotone" dataKey="errorRate" stroke="#fb7185" strokeWidth={2} name="error %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </WidgetCard>

            <div className="grid gap-4 lg:grid-cols-2">
              <WidgetCard
                eyebrow="Lighthouse history"
                title="Release-over-release quality trend"
                description="Performance, accessibility, best practices, and SEO remain visible before every rollout."
              >
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={snapshot.lighthouseHistory}>
                      <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
                      <XAxis dataKey="label" stroke="#64748b" tickLine={false} axisLine={false} />
                      <YAxis domain={[80, 100]} stroke="#64748b" tickLine={false} axisLine={false} width={36} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 18,
                          border: '1px solid rgba(148, 163, 184, 0.18)',
                          background: 'rgba(2, 6, 23, 0.95)',
                        }}
                      />
                      <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                      <Line type="monotone" dataKey="performance" stroke="#38bdf8" strokeWidth={2.4} dot={false} />
                      <Line type="monotone" dataKey="accessibility" stroke="#34d399" strokeWidth={2.4} dot={false} />
                      <Line type="monotone" dataKey="bestPractices" stroke="#f59e0b" strokeWidth={2.4} dot={false} />
                      <Line type="monotone" dataKey="seo" stroke="#a78bfa" strokeWidth={2.4} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </WidgetCard>

              <WidgetCard
                eyebrow="User analytics"
                title="Retention and conversion cadence"
                description="Weekly active and retained users are compared against conversion volume for growth health."
              >
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={snapshot.userAnalytics}>
                      <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
                      <XAxis dataKey="label" stroke="#64748b" tickLine={false} axisLine={false} />
                      <YAxis yAxisId="users" stroke="#64748b" tickLine={false} axisLine={false} width={42} />
                      <YAxis yAxisId="conversions" orientation="right" stroke="#64748b" tickLine={false} axisLine={false} width={42} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 18,
                          border: '1px solid rgba(148, 163, 184, 0.18)',
                          background: 'rgba(2, 6, 23, 0.95)',
                        }}
                      />
                      <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                      <Bar yAxisId="users" dataKey="activeUsers" radius={[10, 10, 0, 0]} fill="#22d3ee" />
                      <Bar yAxisId="users" dataKey="retainedUsers" radius={[10, 10, 0, 0]} fill="#14b8a6" />
                      <Line yAxisId="conversions" type="monotone" dataKey="conversions" stroke="#f97316" strokeWidth={2.4} dot={false} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </WidgetCard>
            </div>

            <WidgetCard
              eyebrow="Tracing visualization"
              title="Critical path waterfall"
              description="Trace timing reveals the services stretching the request path and where error states are surfacing."
            >
              <TraceWaterfall spans={snapshot.traceSpans} />
            </WidgetCard>
          </div>

          <div className="space-y-4">
            <WidgetCard
              eyebrow="Deployment monitoring"
              title="Release train status"
              description="Track active canaries, rollback pressure, and region-by-region health without leaving the dashboard."
            >
              <div className="space-y-3">
                {snapshot.deployments.map((deployment) => (
                  <div
                    key={deployment.id}
                    className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-medium text-white">
                          {deployment.service} <span className="text-slate-500">{deployment.version}</span>
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                          {deployment.region} region · {deployment.startedAt}
                        </p>
                      </div>
                      <StatusPill
                        label={deployment.status}
                        className={deploymentTone[deployment.status]}
                      />
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full ${
                          deployment.status === 'rollback'
                            ? 'bg-rose-400'
                            : deployment.status === 'monitoring'
                              ? 'bg-amber-300'
                              : 'bg-emerald-400'
                        }`}
                        style={{ width: `${deployment.canaryPercent}%` }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span>Canary {deployment.canaryPercent}%</span>
                      <span>{deployment.incidents} incident(s)</span>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetCard>

            <WidgetCard
              eyebrow="CI pipeline history"
              title="Build reliability and queue pressure"
              description="Recent runs are virtualized for scale while the chart highlights pass, fail, and queue distribution."
            >
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Passed', count: snapshot.pipelines.filter((run) => run.status === 'passed').length },
                      { name: 'Running', count: snapshot.pipelines.filter((run) => run.status === 'running').length },
                      { name: 'Queued', count: snapshot.pipelines.filter((run) => run.status === 'queued').length },
                      { name: 'Failed', count: snapshot.pipelines.filter((run) => run.status === 'failed').length },
                    ]}
                  >
                    <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" tickLine={false} axisLine={false} width={32} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 18,
                        border: '1px solid rgba(148, 163, 184, 0.18)',
                        background: 'rgba(2, 6, 23, 0.95)',
                      }}
                    />
                    <Bar dataKey="count" radius={[12, 12, 0, 0]} fill="#38bdf8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-5">
                <VirtualizedTable
                  columns={pipelineColumns}
                  rows={snapshot.pipelines}
                  emptyLabel="No pipeline runs in range."
                />
              </div>
            </WidgetCard>

            <WidgetCard
              eyebrow="Error tracking"
              title="Regressions and user impact"
              description="Open issues are prioritized by severity and user blast radius with room for much larger datasets."
            >
              <div data-testid="error-tracking-widget">
                <VirtualizedTable
                  columns={errorColumns}
                  rows={snapshot.errors}
                  emptyLabel="No active errors."
                />
              </div>
            </WidgetCard>

            <WidgetCard
              eyebrow="Performance budgets"
              title="Budget adherence"
              description="Watch budgets drift before they become release blockers."
            >
              <div className="space-y-3">
                {snapshot.budgets.map((budget) => (
                  <BudgetRow key={budget.id} budget={budget} />
                ))}
              </div>
            </WidgetCard>
          </div>
        </main>
      </div>
    </div>
  );
}
