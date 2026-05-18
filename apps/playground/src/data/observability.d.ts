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
/**
 * KEEP EVERYTHING ELSE EXACTLY THE SAME
 * UNTIL advanceDashboardSnapshot()
 */
export declare function createDashboardSnapshot(): DashboardSnapshot;
export declare function advanceDashboardSnapshot(snapshot: DashboardSnapshot, tick: number): DashboardSnapshot;
//# sourceMappingURL=observability.d.ts.map