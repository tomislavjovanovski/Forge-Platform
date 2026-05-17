/**
 * AsyncSection Pattern
 * Wraps async content with loading, error, and empty states
 */

import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface AsyncSectionProps {
  /** Content to render when loaded */
  children: ReactNode;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Empty state */
  isEmpty?: boolean;
  /** Loading skeleton to display */
  loadingContent?: ReactNode;
  /** Empty state content */
  emptyContent?: ReactNode;
  /** Error content */
  errorContent?: (error: Error) => ReactNode;
  /** Section title */
  title?: ReactNode;
  /** CSS class name */
  className?: string;
}

/**
 * AsyncSection Component
 * Handles loading, error, and empty states for async content
 */
export const AsyncSection = React.forwardRef<HTMLDivElement, AsyncSectionProps>(
  ({
    children,
    isLoading = false,
    error = null,
    isEmpty = false,
    loadingContent,
    emptyContent,
    errorContent,
    title,
    className,
  }, ref) => {
    return (
      <section ref={ref} className={cn('', className)}>
        {title && (
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </h2>
        )}

        {isLoading && (
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            {loadingContent || (
              <div className="flex items-center justify-center py-12">
                <div className="space-y-4 w-full">
                  <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 rounded bg-slate-200 dark:bg-slate-800 w-5/6" />
                  <div className="h-4 rounded bg-slate-200 dark:bg-slate-800 w-4/6" />
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            {errorContent ? (
              errorContent(error)
            ) : (
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-50">
                  Error loading content
                </h3>
                <p className="mt-1 text-sm text-red-800 dark:text-red-200">
                  {error.message}
                </p>
              </div>
            )}
          </div>
        )}

        {!isLoading && !error && isEmpty && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            {emptyContent || (
              <p className="text-slate-600 dark:text-slate-400">
                No content available
              </p>
            )}
          </div>
        )}

        {!isLoading && !error && !isEmpty && children}
      </section>
    );
  },
);

AsyncSection.displayName = 'AsyncSection';
