import { Component } from 'react';
import type {
  ErrorInfo,
  ReactNode,
} from 'react';

import { Sentry } from './sentry';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState =
    {
      hasError: false,
    };

  static getDerivedStateFromError(
    error: Error,
  ): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo,
  ): void {
    if (
      typeof window !==
      'undefined'
    ) {
      Sentry.captureException(
        error,
        {
          extra: {
            componentStack:
              errorInfo.componentStack,
          },
        },
      );
    }
  }

  override render(): ReactNode {
    if (
      this.state.hasError
    ) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            className="bg-red-50 p-6 text-red-900"
          >
            <h2 className="text-lg font-semibold">
              Something went
              wrong.
            </h2>

            <p>
              Please refresh
              the page or
              contact support
              if the problem
              persists.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
