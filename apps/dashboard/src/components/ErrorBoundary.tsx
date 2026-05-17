import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Dashboard error boundary caught:', error, info);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-3xl border border-red-700 bg-red-950/80 p-8 text-slate-100 shadow-xl">
          <h1 className="text-2xl font-semibold text-red-200">Something went wrong</h1>
          <p className="mt-3 text-sm text-slate-300">
            The dashboard encountered an unexpected error. Refresh the page or contact the platform team.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
