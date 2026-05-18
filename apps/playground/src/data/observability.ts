export type SocketState =
  | 'connecting'
  | 'live'
  | 'retrying';

export type DeploymentStatus =
  | 'healthy'
  | 'monitoring'
  | 'rollback';

export type PipelineStatus =
  | 'passed'
  | 'running'
  | 'failed'
  | 'queued';

export type Severity =
  | 'critical'
  | 'high'
  | 'medium'
  | 'low';

export type SpanStatus =
  | 'ok'
  | 'warning'
  | 'error';

export interface SummaryMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone:
    | 'positive'
    | 'neutral'
    | 'warning';
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
  trend:
    | 'improving'
    | 'flat'
    | 'rising';
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

const realtimeLabels: readonly string[] =
  [
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

const userLabels: readonly string[] =
  [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];

const pipelineServices: readonly string[] =
  [
    'gateway',
    'web-frontend',
    'events-api',
    'checkout',
    'edge-cache',
    'feature-flags',
    'search',
    'notifications',
  ];

function cycleIndex<T>(
  items: readonly T[],
  index: number,
): T {
  return items[
    index % items.length
  ]!;
}

function getRealtimePoint(
  index: number,
): RealtimeMetricPoint {
  return {
    label:
      realtimeLabels[index]!,
    throughput:
      930 +
      Math.round(
        Math.sin(index / 2.4) *
          70 +
          index * 4,
      ),
    latency:
      170 +
      Math.round(
        Math.cos(index / 1.7) *
          22 +
          index * 1.8,
      ),
    errorRate: Number(
      (
        0.42 +
        Math.sin(index / 2.1) *
          0.12 +
        index * 0.01
      ).toFixed(2),
    ),
    saturation:
      58 +
      Math.round(
        Math.cos(index / 2.8) *
          9 +
          index,
      ),
  };
}

function getUserAnalyticsPoint(
  index: number,
): UserAnalyticsPoint {
  return {
    label:
      userLabels[index]!,
    activeUsers:
      4100 +
      index * 180 +
      (index % 2 === 0
        ? 120
        : -70),
    retainedUsers:
      2800 +
      index * 130 +
      (index % 3 === 0
        ? 90
        : -40),
    conversions:
      260 +
      index * 18 +
      (index % 2 === 0
        ? 20
        : -12),
  };
}

/**
 * KEEP EVERYTHING ELSE EXACTLY THE SAME
 * UNTIL advanceDashboardSnapshot()
 */

export function createDashboardSnapshot(): DashboardSnapshot {
  return {
    summary: [
      {
        id: 'availability',
        label:
          'Availability',
        value: '99.982%',
        delta: '+0.04%',
        tone: 'positive',
      },
      {
        id: 'deployments',
        label:
          'Deployments today',
        value: '32',
        delta: '3 rolling',
        tone: 'neutral',
      },
      {
        id: 'active-users',
        label:
          'Active users',
        value: '18.4k',
        delta: '+7.6%',
        tone: 'positive',
      },
      {
        id: 'budget-burn',
        label:
          'Budget burn',
        value: '84%',
        delta: '2 alerts',
        tone: 'warning',
      },
    ],

    realtimeMetrics:
      realtimeLabels.map(
        (
          _,
          index,
        ): RealtimeMetricPoint =>
          getRealtimePoint(
            index,
          ),
      ),

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
        startedAt:
          '8 min ago',
      },
      {
        id: 'dep-002',
        service:
          'web-frontend',
        version: 'v5.9.1',
        region: 'fra',
        status:
          'monitoring',
        canaryPercent: 45,
        incidents: 1,
        durationMin: 11,
        startedAt:
          '11 min ago',
      },
      {
        id: 'dep-003',
        service:
          'feature-flags',
        version: 'v1.42.0',
        region: 'sin',
        status: 'healthy',
        canaryPercent: 100,
        incidents: 0,
        durationMin: 8,
        startedAt:
          '16 min ago',
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
        startedAt:
          '21 min ago',
      },
    ],

    lighthouseHistory: [],

    pipelines:
      Array.from(
        { length: 28 },
        (
          _,
          index,
        ): PipelineRun => ({
          id: `pipe-${
            index + 1
          }`,
          service:
            cycleIndex(
              pipelineServices,
              index,
            ),
          branch:
            index % 4 === 0
              ? 'main'
              : `release/${
                  24 - index
                }`,
          commit: `${(
            index *
              9173 +
            1942
          )
            .toString(16)
            .slice(
              0,
              7,
            )}ab`,
          status:
            index === 0
              ? 'running'
              : index % 9 === 0
                ? 'failed'
                : index % 7 ===
                    0
                  ? 'queued'
                  : 'passed',
          durationMin:
            6 +
            (index % 5) * 3 +
            index,
          tests:
            410 +
            index * 11,
          coverage:
            81 +
            (index % 7),
          startedAt: `${
            index + 2
          } min ago`,
        }),
      ),

    errors: [],

    userAnalytics:
      userLabels.map(
        (
          _,
          index,
        ): UserAnalyticsPoint =>
          getUserAnalyticsPoint(
            index,
          ),
      ),

    budgets: [],

    traceSpans: [],

    streamTick: 0,
  };
}

export function advanceDashboardSnapshot(
  snapshot: DashboardSnapshot,
  tick: number,
): DashboardSnapshot {
  const nextStreamTick =
    snapshot.streamTick + 1;

  const lastRealtime =
    snapshot.realtimeMetrics[
      snapshot.realtimeMetrics
        .length - 1
    ]!;

  const nextRealtimeLabel = `${
    9 +
    Math.floor(
      (24 + tick * 2) / 60,
    )
  }:${String(
    (24 + tick * 2) % 60,
  ).padStart(2, '0')}`;

  const nextRealtime: RealtimeMetricPoint =
    {
      label:
        nextRealtimeLabel,
      throughput:
        lastRealtime.throughput +
        (tick % 2 === 0
          ? 32
          : -18),
      latency: Math.max(
        132,
        lastRealtime.latency +
          (tick % 3 === 0
            ? 12
            : -7),
      ),
      errorRate: Number(
        Math.max(
          0.18,
          lastRealtime.errorRate +
            (tick % 4 === 0
              ? 0.09
              : -0.03),
        ).toFixed(2),
      ),
      saturation: Math.min(
        89,
        Math.max(
          44,
          lastRealtime.saturation +
            (tick % 2 === 0
              ? 4
              : -3),
        ),
      ),
    };

  const nextRealtimeMetrics =
    [
      ...snapshot.realtimeMetrics.slice(
        1,
      ),
      nextRealtime,
    ];

  const nextUserLabel = `W${
    tick + 2
  }`;

  const lastUsers =
    snapshot.userAnalytics[
      snapshot.userAnalytics
        .length - 1
    ]!;

  const nextUserAnalytics: UserAnalyticsPoint[] =
    [
      ...snapshot.userAnalytics.slice(
        1,
      ),
      {
        label:
          nextUserLabel,
        activeUsers:
          lastUsers.activeUsers +
          (tick % 2 === 0
            ? 210
            : -90),
        retainedUsers:
          lastUsers.retainedUsers +
          (tick % 2 === 0
            ? 160
            : -70),
        conversions:
          Math.max(
            210,
            lastUsers.conversions +
              (tick % 3 ===
              0
                ? 16
                : -8),
          ),
      },
    ];

  const nextDeployments: DeploymentRecord[] =
    snapshot.deployments.map(
      (
        deployment,
        index,
      ): DeploymentRecord => {
        if (index === 1) {
          return {
            ...deployment,
            canaryPercent:
              Math.min(
                100,
                deployment.canaryPercent +
                  10,
              ),
            status:
              deployment.canaryPercent >=
              90
                ? 'healthy'
                : 'monitoring',
          };
        }

        if (index === 3) {
          return {
            ...deployment,
            incidents:
              Math.max(
                1,
                deployment.incidents -
                  1,
              ),
            canaryPercent:
              Math.min(
                30,
                deployment.canaryPercent +
                  4,
              ),
            status:
              deployment.incidents <=
              2
                ? 'monitoring'
                : deployment.status,
          };
        }

        return deployment;
      },
    );

  const nextPipelines: PipelineRun[] =
    snapshot.pipelines.map(
      (
        run,
        index,
      ): PipelineRun => {
        if (
          index === 0 &&
          run.status ===
            'running'
        ) {
          return {
            ...run,
            durationMin:
              run.durationMin +
              2,
          };
        }

        return run;
      },
    );

  if (tick % 3 === 0) {
    nextPipelines.unshift({
      id: `pipe-live-${tick}`,
      service:
        cycleIndex(
          pipelineServices,
          tick + 3,
        ),
      branch:
        tick % 2 === 0
          ? 'main'
          : `release/${
              tick + 25
            }`,
      commit: `${(
        tick * 341 +
        9321
      )
        .toString(16)
        .slice(0, 7)}ff`,
      status: 'running',
      durationMin: 3,
      tests:
        512 + tick * 2,
      coverage: 84,
      startedAt:
        'just now',
    });
  }

  const trimmedPipelines: PipelineRun[] =
    nextPipelines
      .slice(0, 28)
      .map(
        (
          run,
          index,
        ): PipelineRun => {
          if (
            index === 1 &&
            run.status ===
              'running'
          ) {
            return {
              ...run,
              status:
                tick % 2 === 0
                  ? 'passed'
                  : 'failed',
              startedAt:
                '2 min ago',
            };
          }

          return run;
        },
      );

  const nextTraceSpans: TraceSpan[] =
    snapshot.traceSpans.map(
      (
        span,
        index,
      ): TraceSpan => {
        if (index === 0) {
          return {
            ...span,
            duration:
              88 +
              (tick % 4) * 4,
          };
        }

        if (
          span.service ===
          'notifications'
        ) {
          return {
            ...span,
            duration:
              Math.max(
                10,
                span.duration +
                  (tick % 2 ===
                  0
                    ? -2
                    : 3),
              ),
            status:
              tick % 3 === 0
                ? 'warning'
                : 'error',
          };
        }

        return {
          ...span,
          duration:
            Math.max(
              10,
              span.duration +
                (index % 2 ===
                0
                  ? 1
                  : -1),
            ),
        };
      },
    );

  return {
    ...snapshot,
    realtimeMetrics:
      nextRealtimeMetrics,
    deployments:
      nextDeployments,
    pipelines:
      trimmedPipelines,
    userAnalytics:
      nextUserAnalytics,
    traceSpans:
      nextTraceSpans,
    streamTick:
      nextStreamTick,
  };
}