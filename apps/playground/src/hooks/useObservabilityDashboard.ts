import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  advanceDashboardSnapshot,
  createDashboardSnapshot,
  type DashboardSnapshot,
  type SocketState,
} from '../data/observability';

type ViewState =
  | 'loading'
  | 'ready';

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

function formatTimestamp(
  date: Date,
): string {
  return date.toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    },
  );
}

function delay(
  milliseconds: number,
): Promise<void> {
  return new Promise<void>(
    (resolve): void => {
      window.setTimeout(
        resolve,
        milliseconds,
      );
    },
  );
}

export function useObservabilityDashboard():
  ObservabilityState {
  const [snapshot, setSnapshot] =
    useState<DashboardSnapshot>(
      createDashboardSnapshot,
    );

  const [viewState, setViewState] =
    useState<ViewState>('loading');

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [socketState, setSocketState] =
    useState<SocketState>(
      'connecting',
    );

  const [retryState, setRetryState] =
    useState<RetryState>({
      attempt: 0,
      secondsRemaining: 0,
    });

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState<string>(() =>
    formatTimestamp(new Date()),
  );

  const liveTickRef =
    useRef<number>(0);

  const reconnectSucceededRef =
    useRef<boolean>(false);

  const markLive =
    useCallback((): void => {
      reconnectSucceededRef.current =
        false;

      setSocketState('live');

      setRetryState({
        attempt: 0,
        secondsRemaining: 0,
      });

      setLastUpdated(
        formatTimestamp(
          new Date(),
        ),
      );
    }, []);

  const bootstrap =
    useCallback(
      async (): Promise<void> => {
        setViewState(
          'loading',
        );

        setSocketState(
          'connecting',
        );

        await delay(950);

        setSnapshot(
          createDashboardSnapshot(),
        );

        setViewState('ready');

        markLive();
      },
      [markLive],
    );

  useEffect((): void => {
    void bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if (
      viewState !== 'ready' ||
      socketState !== 'live'
    ) {
      return;
    }

    const intervalId =
      window.setInterval(
        (): void => {
          liveTickRef.current += 1;

          if (
            liveTickRef.current %
              6 ===
            0
          ) {
            setSocketState(
              'retrying',
            );

            setRetryState({
              attempt: 1,
              secondsRemaining: 3,
            });

            return;
          }

          setSnapshot(
            (
              current,
            ): DashboardSnapshot =>
              advanceDashboardSnapshot(
                current,
                liveTickRef.current,
              ),
          );

          setLastUpdated(
            formatTimestamp(
              new Date(),
            ),
          );
        },
        1800,
      );

    return (): void => {
      window.clearInterval(
        intervalId,
      );
    };
  }, [socketState, viewState]);

  useEffect(() => {
    if (
      socketState !==
      'retrying'
    ) {
      return;
    }

    if (
      retryState.secondsRemaining >
      0
    ) {
      const countdownId =
        window.setTimeout(
          (): void => {
            setRetryState(
              (
                current,
              ): RetryState => ({
                ...current,
                secondsRemaining:
                  current.secondsRemaining -
                  1,
              }),
            );
          },
          1000,
        );

      return (): void => {
        window.clearTimeout(
          countdownId,
        );
      };
    }

    if (
      retryState.attempt ===
      1
    ) {
      setRetryState({
        attempt: 2,
        secondsRemaining: 2,
      });

      return;
    }

    if (
      !reconnectSucceededRef.current
    ) {
      reconnectSucceededRef.current =
        true;

      liveTickRef.current = 0;

      setSnapshot(
        (
          current,
        ): DashboardSnapshot =>
          advanceDashboardSnapshot(
            current,
            current.streamTick +
              1,
          ),
      );

      markLive();
    }
  }, [
    markLive,
    retryState,
    socketState,
  ]);

  const refresh =
    useCallback((): void => {
      if (isRefreshing) {
        return;
      }

      setIsRefreshing(true);

      setSocketState(
        'connecting',
      );

      void (async (): Promise<void> => {
        await delay(900);

        liveTickRef.current = 0;

        setSnapshot(
          createDashboardSnapshot(),
        );

        setLastUpdated(
          formatTimestamp(
            new Date(),
          ),
        );

        setIsRefreshing(false);

        markLive();
      })();
    }, [
      isRefreshing,
      markLive,
    ]);

  const reconnectNow =
    useCallback((): void => {
      reconnectSucceededRef.current =
        true;

      liveTickRef.current = 0;

      setSnapshot(
        (
          current,
        ): DashboardSnapshot =>
          advanceDashboardSnapshot(
            current,
            current.streamTick +
              1,
          ),
      );

      markLive();
    }, [markLive]);

  return useMemo(
    (): ObservabilityState => ({
      snapshot,
      viewState,
      isRefreshing,
      socketState,
      retryState,
      lastUpdated,
      refresh,
      reconnectNow,
    }),
    [
      isRefreshing,
      lastUpdated,
      reconnectNow,
      refresh,
      retryState,
      snapshot,
      socketState,
      viewState,
    ],
  );
}
