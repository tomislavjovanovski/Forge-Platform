/**
 * PageContainer Pattern
 * Responsive container for page content with consistent padding and max-width
 */

import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface PageContainerProps {
  children: ReactNode;
  /** Optional page title */
  title?: ReactNode;
  /** Optional page description */
  description?: ReactNode;
  /** Optional action buttons */
  actions?: ReactNode;
  /** CSS class name */
  className?: string;
}

/**
 * PageContainer Component
 * Wraps page content with consistent spacing, max-width, and responsive behavior
 */
export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, title, description, actions, className }, ref) => {
    return (
      <div ref={ref} className={cn('mx-auto max-w-7xl', className)}>
        {/* Header */}
        {(title || description || actions) && (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              {title && (
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                  {title}
                </h1>
              )}
              {description && (
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {description}
                </p>
              )}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    );
  },
);

PageContainer.displayName = 'PageContainer';
