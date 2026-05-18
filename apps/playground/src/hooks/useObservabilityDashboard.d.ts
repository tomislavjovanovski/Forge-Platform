import { type DashboardSnapshot, type SocketState } from '../data/observability';
type ViewState = 'loading' | 'ready';
interface RetryState {
    attempt: number;
    secondsRemaining: number;
}
interface ObservabilityState {
    snapshot: DashboardSnapshot;
    viewState: ViewState;
    isRefreshing: boolean;
    socketState: SocketState;
    retryState: RetryState;
    lastUpdated: string;
    refresh: () => void;
    reconnectNow: () => void;
}
export declare function useObservabilityDashboard(): ObservabilityState;
export {};
//# sourceMappingURL=useObservabilityDashboard.d.ts.map