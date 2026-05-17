export type SocketState = 'connecting' | 'live' | 'retrying';
export type DeploymentStatus = 'healthy' | 'monitoring' | 'rollback';
export type PipelineStatus = 'passed' | 'running' | 'failed' | 'queued';
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type SpanStatus = 'ok' | 'warning' | 'error';

export interface SummaryMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface RealtimeMetricPoint {
  label: string;
  throughput: number;
  latency: number;
  errorRate: number;
  saturation: number;
}

export interface DeploymentRecord {
  id: string;
  service: string;
  version: string;
  region: string;
  status: DeploymentStatus;
  canaryPercent: number;
  incidents: number;
  durationMin: number;
  startedAt: string;
}

export interface LighthousePoint {
  label: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface PipelineRun {
  id: string;
  service: string;
  branch: string;
  commit: string;
  status: PipelineStatus;
  durationMin: number;
  tests: number;
  coverage: number;
  startedAt: string;
}

export interface ErrorEvent {
  id: string;
  issue: string;
  service: string;
  severity: Severity;
  count: number;
  affectedUsers: number;
  firstSeen: string;
  regression: boolean;
}

export interface UserAnalyticsPoint {
  label: string;
  activeUsers: number;
  retainedUsers: number;
  conversions: number;
}

export interface PerformanceBudget {
  id: string;
  name: string;
  current: number;
  budget: number;
  unit: string;
  trend: 'improving' | 'flat' | 'rising';
  owner: string;
}

export interface TraceSpan {
  id: string;
  name: string;
  service: string;
  start: number;
  duration: number;
  depth: number;
  status: SpanStatus;
}

export interface DashboardSnapshot {
  summary: SummaryMetric[];
  realtimeMetrics: RealtimeMetricPoint[];
  deployments: DeploymentRecord[];
  lighthouseHistory: LighthousePoint[];
  pipelines: PipelineRun[];
  errors: ErrorEvent[];
  userAnalytics: UserAnalyticsPoint[];
  budgets: PerformanceBudget[];
  traceSpans: TraceSpan[];
  streamTick: number;
}

const realtimeLabels = [
  '09:02',
  '09:04',
  '09:06',
  '09:08',
  '09:10',
  '09:12',
  '09:14',
  '09:16',
  '09:18',
  '09:20',
  '09:22',
  '09:24',
];

const userLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const pipelineServices = [
  'gateway',
  'web-frontend',
  'events-api',
  'checkout',
  'edge-cache',
  'feature-flags',
  'search',
  'notifications',
];

function cycleIndex<T>(items: readonly T[], index: number): T {
  return items[index % items.length]!;
}

function getRealtimePoint(index: number): RealtimeMetricPoint {
  return {
    label: realtimeLabels[index],
    throughput: 930 + Math.round(Math.sin(index / 2.4) * 70 + index * 4),
    latency: 170 + Math.round(Math.cos(index / 1.7) * 22 + index * 1.8),
    errorRate: Number((0.42 + Math.sin(index / 2.1) * 0.12 + index * 0.01).toFixed(2)),
    saturation: 58 + Math.round(Math.cos(index / 2.8) * 9 + index),
  };
}

function getUserAnalyticsPoint(index: number): UserAnalyticsPoint {
  return {
    label: userLabels[index],
    activeUsers: 4100 + index * 180 + (index % 2 === 0 ? 120 : -70),
    retainedUsers: 2800 + index * 130 + (index % 3 === 0 ? 90 : -40),
    conversions: 260 + index * 18 + (index % 2 === 0 ? 20 : -12),
  };
}

export function createDashboardSnapshot(): DashboardSnapshot {
  return {
    summary: [
      {
        id: 'availability',
        label: 'Availability',
        value: '99.982%',
        delta: '+0.04%',
        tone: 'positive',
      },
      {
        id: 'deployments',
        label: 'Deployments today',
        value: '32',
        delta: '3 rolling',
        tone: 'neutral',
      },
      {
        id: 'active-users',
        label: 'Active users',
        value: '18.4k',
        delta: '+7.6%',
        tone: 'positive',
      },
      {
        id: 'budget-burn',
        label: 'Budget burn',
        value: '84%',
        delta: '2 alerts',
        tone: 'warning',
      },
    ],
    realtimeMetrics: realtimeLabels.map((_, index) => getRealtimePoint(index)),
    deployments: [
      {
        id: 'dep-001',
        service: 'gateway',
        version: 'v2.18.4',
        region: 'iad',
        status: 'healthy',
        canaryPercent: 100,
        incidents: 0,
        durationMin: 14,
        startedAt: '8 min ago',
      },
      {
        id: 'dep-002',
        service: 'web-frontend',
        version: 'v5.9.1',
        region: 'fra',
        status: 'monitoring',
        canaryPercent: 45,
        incidents: 1,
        durationMin: 11,
        startedAt: '11 min ago',
      },
      {
        id: 'dep-003',
        service: 'feature-flags',
        version: 'v1.42.0',
        region: 'sin',
        status: 'healthy',
        canaryPercent: 100,
        incidents: 0,
        durationMin: 8,
        startedAt: '16 min ago',
      },
      {
        id: 'dep-004',
        service: 'search',
        version: 'v3.11.0',
        region: 'syd',
        status: 'rollback',
        canaryPercent: 10,
        incidents: 4,
        durationMin: 19,
        startedAt: '21 min ago',
      },
    ],
    lighthouseHistory: [
      { label: 'Sprint 11', performance: 88, accessibility: 96, bestPractices: 91, seo: 94 },
      { label: 'Sprint 12', performance: 87, accessibility: 96, bestPractices: 92, seo: 94 },
      { label: 'Sprint 13', performance: 89, accessibility: 97, bestPractices: 93, seo: 95 },
      { label: 'Sprint 14', performance: 90, accessibility: 97, bestPractices: 94, seo: 95 },
      { label: 'Sprint 15', performance: 92, accessibility: 98, bestPractices: 95, seo: 95 },
      { label: 'Sprint 16', performance: 91, accessibility: 98, bestPractices: 95, seo: 96 },
    ],
    pipelines: Array.from({ length: 28 }, (_, index) => ({
      id: `pipe-${index + 1}`,
      service: cycleIndex(pipelineServices, index),
      branch: index % 4 === 0 ? 'main' : `release/${24 - index}`,
      commit: `${(index * 9173 + 1942).toString(16).slice(0, 7)}ab`,
      status:
        index === 0
          ? 'running'
          : index % 9 === 0
            ? 'failed'
            : index % 7 === 0
              ? 'queued'
              : 'passed',
      durationMin: 6 + (index % 5) * 3 + index,
      tests: 410 + index * 11,
      coverage: 81 + (index % 7),
      startedAt: `${index + 2} min ago`,
    })),
    errors: Array.from({ length: 48 }, (_, index) => ({
      id: `err-${index + 1}`,
      issue: [
        'checkout timeout threshold exceeded',
        'segment export payload rejected',
        'trace ingestion backpressure',
        'LCP asset preload mismatch',
        'feature flag evaluation drift',
        'websocket authentication replay',
      ][index % 6]!,
      service: cycleIndex(pipelineServices, index + 2),
      severity: (['critical', 'high', 'medium', 'low'] as const)[index % 4]!,
      count: 6 + index * 3,
      affectedUsers: 12 + index * 5,
      firstSeen: `${index + 1}h ago`,
      regression: index % 5 === 0,
    })),
    userAnalytics: userLabels.map((_, index) => getUserAnalyticsPoint(index)),
    budgets: [
      { id: 'lcp', name: 'LCP p75', current: 2480, budget: 2500, unit: 'ms', trend: 'rising', owner: 'web-core' },
      { id: 'js', name: 'JS boot payload', current: 284, budget: 300, unit: 'kb', trend: 'flat', owner: 'edge-runtime' },
      { id: 'cls', name: 'CLS p75', current: 0.08, budget: 0.1, unit: 'cls', trend: 'improving', owner: 'growth' },
      { id: 'api', name: 'API TTFB p95', current: 520, budget: 450, unit: 'ms', trend: 'rising', owner: 'platform-api' },
    ],
    traceSpans: [
      { id: 'root', name: 'GET /api/checkout/session', service: 'gateway', start: 0, duration: 92, depth: 0, status: 'ok' },
      { id: 'auth', name: 'session hydrate', service: 'auth', start: 4, duration: 22, depth: 1, status: 'ok' },
      { id: 'inventory', name: 'inventory reserve', service: 'inventory', start: 18, duration: 40, depth: 1, status: 'warning' },
      { id: 'pricing', name: 'pricing compose', service: 'pricing', start: 21, duration: 16, depth: 2, status: 'ok' },
      { id: 'tax', name: 'tax quote', service: 'tax', start: 28, duration: 12, depth: 2, status: 'ok' },
      { id: 'fraud', name: 'fraud score', service: 'risk', start: 36, duration: 20, depth: 2, status: 'warning' },
      { id: 'ledger', name: 'ledger write', service: 'payments', start: 57, duration: 18, depth: 1, status: 'ok' },
      { id: 'notify', name: 'confirmation enqueue', service: 'notifications', start: 70, duration: 14, depth: 1, status: 'error' },
    ],
    streamTick: 0,
  };
}

export function advanceDashboardSnapshot(snapshot: DashboardSnapshot, tick: number): DashboardSnapshot {
  const nextStreamTick = snapshot.streamTick + 1;
  const lastRealtime = snapshot.realtimeMetrics[snapshot.realtimeMetrics.length - 1]!;
  const nextRealtimeLabel = `${9 + Math.floor((24 + tick * 2) / 60)}:${String((24 + tick * 2) % 60).padStart(2, '0')}`;
  const nextRealtime: RealtimeMetricPoint = {
    label: nextRealtimeLabel,
    throughput: lastRealtime.throughput + (tick % 2 === 0 ? 32 : -18),
    latency: Math.max(132, lastRealtime.latency + (tick % 3 === 0 ? 12 : -7)),
    errorRate: Number(Math.max(0.18, lastRealtime.errorRate + (tick % 4 === 0 ? 0.09 : -0.03)).toFixed(2)),
    saturation: Math.min(89, Math.max(44, lastRealtime.saturation + (tick % 2 === 0 ? 4 : -3))),
  };

  const nextRealtimeMetrics = [
    ...snapshot.realtimeMetrics.slice(1),
    nextRealtime,
  ];

  const nextUserLabel = `W${tick + 2}`;
  const lastUsers = snapshot.userAnalytics[snapshot.userAnalytics.length - 1]!;
  const nextUserAnalytics = [
    ...snapshot.userAnalytics.slice(1),
    {
      label: nextUserLabel,
      activeUsers: lastUsers.activeUsers + (tick % 2 === 0 ? 210 : -90),
      retainedUsers: lastUsers.retainedUsers + (tick % 2 === 0 ? 160 : -70),
      conversions: Math.max(210, lastUsers.conversions + (tick % 3 === 0 ? 16 : -8)),
    },
  ];

  const nextDeployments = snapshot.deployments.map((deployment, index) => {
    if (index === 1) {
      return {
        ...deployment,
        canaryPercent: Math.min(100, deployment.canaryPercent + 10),
        status: deployment.canaryPercent >= 90 ? 'healthy' : 'monitoring',
      };
    }

    if (index === 3) {
      return {
        ...deployment,
        incidents: Math.max(1, deployment.incidents - 1),
        canaryPercent: Math.min(30, deployment.canaryPercent + 4),
        status: deployment.incidents <= 2 ? 'monitoring' : deployment.status,
      };
    }

    return deployment;
  });

  const nextPipelines = snapshot.pipelines.map((run, index) => {
    if (index === 0 && run.status === 'running') {
      return {
        ...run,
        durationMin: run.durationMin + 2,
      };
    }
    return run;
  });

  if (tick % 3 === 0) {
    nextPipelines.unshift({
      id: `pipe-live-${tick}`,
      service: cycleIndex(pipelineServices, tick + 3),
      branch: tick % 2 === 0 ? 'main' : `release/${tick + 25}`,
      commit: `${(tick * 341 + 9321).toString(16).slice(0, 7)}ff`,
      status: 'running',
      durationMin: 3,
      tests: 512 + tick * 2,
      coverage: 84,
      startedAt: 'just now',
    });
  }

  const trimmedPipelines = nextPipelines.slice(0, 28).map((run, index) => {
    if (index === 1 && run.status === 'running') {
      return {
        ...run,
        status: tick % 2 === 0 ? 'passed' : 'failed',
        startedAt: '2 min ago',
      };
    }
    return run;
  });

  const nextErrors = snapshot.errors.map((error, index) => {
    if (index < 4) {
      return {
        ...error,
        count: error.count + (index + 1) * 2,
        affectedUsers: error.affectedUsers + (index + 1) * 3,
        regression: index === 0 ? true : error.regression,
      };
    }
    return error;
  });

  const nextBudgets = snapshot.budgets.map((budget, index) => {
    if (index === 0) {
      return { ...budget, current: Math.min(2580, budget.current + 15) };
    }
    if (index === 2) {
      return { ...budget, current: Math.max(0.05, Number((budget.current - 0.004).toFixed(3))) };
    }
    return budget;
  });

  const nextTraceSpans = snapshot.traceSpans.map((span, index) => {
    if (index === 0) {
      return { ...span, duration: 88 + (tick % 4) * 4 };
    }
    if (span.service === 'notifications') {
      return {
        ...span,
        duration: Math.max(10, span.duration + (tick % 2 === 0 ? -2 : 3)),
        status: tick % 3 === 0 ? 'warning' : 'error',
      };
    }
    return {
      ...span,
      duration: Math.max(10, span.duration + (index % 2 === 0 ? 1 : -1)),
    };
  });

  const nextSummary = [
    {
      id: 'availability',
      label: 'Availability',
      value: `${(99.95 + tick * 0.003).toFixed(3)}%`,
      delta: tick % 2 === 0 ? '+0.01%' : '-0.00%',
      tone: 'positive' as const,
    },
    {
      id: 'deployments',
      label: 'Deployments today',
      value: String(32 + Math.floor(tick / 2)),
      delta: `${nextDeployments.filter((deployment) => deployment.status === 'monitoring').length} monitoring`,
      tone: 'neutral' as const,
    },
    {
      id: 'active-users',
      label: 'Active users',
      value: `${(nextUserAnalytics[nextUserAnalytics.length - 1]!.activeUsers / 1000).toFixed(1)}k`,
      delta: tick % 2 === 0 ? '+4.1%' : '+3.4%',
      tone: 'positive' as const,
    },
    {
      id: 'budget-burn',
      label: 'Budget burn',
      value: `${Math.round((nextBudgets[0]!.current / nextBudgets[0]!.budget) * 100)}%`,
      delta: `${nextBudgets.filter((budget) => budget.current > budget.budget).length} over budget`,
      tone: 'warning' as const,
    },
  ];

  return {
    ...snapshot,
    summary: nextSummary,
    realtimeMetrics: nextRealtimeMetrics,
    deployments: nextDeployments,
    pipelines: trimmedPipelines,
    errors: nextErrors,
    userAnalytics: nextUserAnalytics,
    budgets: nextBudgets,
    traceSpans: nextTraceSpans,
    streamTick: nextStreamTick,
  };
}
