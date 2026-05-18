import { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { advanceDashboardSnapshot, createDashboardSnapshot, } from '../data/observability';
function formatTimestamp(date) {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
    });
}
function delay(milliseconds) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, milliseconds);
    });
}
export function useObservabilityDashboard() {
    const [snapshot, setSnapshot] = useState(createDashboardSnapshot);
    const [viewState, setViewState] = useState('loading');
    const [isRefreshing, setIsRefreshing,] = useState(false);
    const [socketState, setSocketState] = useState('connecting');
    const [retryState, setRetryState] = useState({
        attempt: 0,
        secondsRemaining: 0,
    });
    const [lastUpdated, setLastUpdated,] = useState(() => formatTimestamp(new Date()));
    const liveTickRef = useRef(0);
    const reconnectSucceededRef = useRef(false);
    const markLive = useCallback(() => {
        reconnectSucceededRef.current =
            false;
        setSocketState('live');
        setRetryState({
            attempt: 0,
            secondsRemaining: 0,
        });
        setLastUpdated(formatTimestamp(new Date()));
    }, []);
    const bootstrap = useCallback(async () => {
        setViewState('loading');
        setSocketState('connecting');
        await delay(950);
        setSnapshot(createDashboardSnapshot());
        setViewState('ready');
        markLive();
    }, [markLive]);
    useEffect(() => {
        void bootstrap();
    }, [bootstrap]);
    useEffect(() => {
        if (viewState !==
            'ready' ||
            socketState !==
                'live') {
            return undefined;
        }
        const intervalId = window.setInterval(() => {
            liveTickRef.current += 1;
            if (liveTickRef.current %
                6 ===
                0) {
                setSocketState('retrying');
                setRetryState({
                    attempt: 1,
                    secondsRemaining: 3,
                });
                return;
            }
            setSnapshot((current) => advanceDashboardSnapshot(current, liveTickRef.current));
            setLastUpdated(formatTimestamp(new Date()));
        }, 1800);
        return () => {
            window.clearInterval(intervalId);
        };
    }, [
        socketState,
        viewState,
    ]);
    useEffect(() => {
        if (socketState !==
            'retrying') {
            return undefined;
        }
        if (retryState.secondsRemaining >
            0) {
            const countdownId = window.setTimeout(() => {
                setRetryState((current) => ({
                    ...current,
                    secondsRemaining: current.secondsRemaining -
                        1,
                }));
            }, 1000);
            return () => {
                window.clearTimeout(countdownId);
            };
        }
        if (retryState.attempt ===
            1) {
            setRetryState({
                attempt: 2,
                secondsRemaining: 2,
            });
            return undefined;
        }
        if (!reconnectSucceededRef.current) {
            reconnectSucceededRef.current =
                true;
            liveTickRef.current = 0;
            setSnapshot((current) => advanceDashboardSnapshot(current, current.streamTick +
                1));
            markLive();
        }
        return undefined;
    }, [
        markLive,
        retryState,
        socketState,
    ]);
    const refresh = useCallback(() => {
        if (isRefreshing) {
            return;
        }
        setIsRefreshing(true);
        setSocketState('connecting');
        void (async () => {
            await delay(900);
            liveTickRef.current = 0;
            setSnapshot(createDashboardSnapshot());
            setLastUpdated(formatTimestamp(new Date()));
            setIsRefreshing(false);
            markLive();
        })();
    }, [
        isRefreshing,
        markLive,
    ]);
    const reconnectNow = useCallback(() => {
        reconnectSucceededRef.current =
            true;
        liveTickRef.current = 0;
        setSnapshot((current) => advanceDashboardSnapshot(current, current.streamTick +
            1));
        markLive();
    }, [markLive]);
    return useMemo(() => ({
        snapshot,
        viewState,
        isRefreshing,
        socketState,
        retryState,
        lastUpdated,
        refresh,
        reconnectNow,
    }), [
        snapshot,
        viewState,
        isRefreshing,
        socketState,
        retryState,
        lastUpdated,
        refresh,
        reconnectNow,
    ]);
}
//# sourceMappingURL=useObservabilityDashboard.js.map