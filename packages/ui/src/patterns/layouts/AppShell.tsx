/**
 * AppShell Pattern
 * Primary application layout
 * with header, sidebar,
 * and main content area
 *
 * Responsive layout that
 * collapses sidebar on mobile
 */

import React, {
  useState,
  forwardRef,
  type ReactNode,
  type ReactElement,
} from 'react';

import { cn } from '../../utils/cn';

export interface AppShellProps {
  /** Sidebar content */
  sidebar?: ReactNode;

  /** Header content */
  header?: ReactNode;

  /** Main content area */
  children: ReactNode;

  /** Optional footer content */
  footer?: ReactNode;

  /** CSS class name */
  className?: string;
}

/**
 * AppShell Component
 * Provides a complete application
 * layout structure
 *
 * Features:
 * - Responsive sidebar
 * - Fixed header
 * - Flexible content area
 * - Optional footer
 * - Dark mode support
 */
const AppShell = forwardRef<
  HTMLDivElement,
  AppShellProps
>(
  (
    {
      sidebar,
      header,
      children,
      footer,
      className,
    },
    ref,
  ): ReactElement => {
    const [
      sidebarOpen,
      setSidebarOpen,
    ] = useState(false);

    const handleSidebarToggle =
      (): void => {
        setSidebarOpen(
          (
            prev,
          ): boolean => !prev,
        );
      };

    const handleCloseSidebar =
      (): void => {
        setSidebarOpen(false);
      };

    const handleOverlayKeyDown =
      (
        event: React.KeyboardEvent<HTMLDivElement>,
      ): void => {
        if (
          event.key ===
            'Enter' ||
          event.key === ' '
        ) {
          event.preventDefault();

          setSidebarOpen(
            false,
          );
        }
      };

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-screen flex-col bg-slate-50 dark:bg-slate-950',
          className,
        )}
      >
        {/* Header */}
        {header && (
          <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex flex-1 items-center gap-4">
                {sidebar && (
                  <button
                    type="button"
                    onClick={
                      handleSidebarToggle
                    }
                    className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100 sm:hidden dark:border-slate-700 dark:hover:bg-slate-800"
                    aria-label="Toggle sidebar"
                    aria-expanded={
                      sidebarOpen
                    }
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={
                          2
                        }
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                )}

                <div className="flex-1">
                  {header}
                </div>
              </div>
            </div>
          </header>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {sidebar && (
            <>
              {/* Mobile overlay */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 z-30 bg-slate-950/50 sm:hidden"
                  onClick={
                    handleCloseSidebar
                  }
                  onKeyDown={
                    handleOverlayKeyDown
                  }
                  role="button"
                  tabIndex={0}
                  aria-label="Close sidebar"
                />
              )}

              {/* Sidebar */}
              <aside
                className={cn(
                  'absolute inset-y-0 left-0 z-40 w-64 overflow-y-auto border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 sm:static sm:w-64',
                  sidebarOpen
                    ? 'translate-x-0'
                    : '-translate-x-full sm:translate-x-0',
                )}
              >
                <div className="p-4">
                  {sidebar}
                </div>
              </aside>
            </>
          )}

          {/* Main content */}
          <main className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950">
              <div className="px-4 py-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>

            {/* Footer */}
            {footer && (
              <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="px-4 py-4 sm:px-6">
                  {footer}
                </div>
              </footer>
            )}
          </main>
        </div>
      </div>
    );
  },
);

AppShell.displayName =
  'AppShell';

export { AppShell };
