/**
 * AppShell Pattern
 * Primary application layout
 * with header, sidebar,
 * and main content area
 *
 * Responsive layout that
 * collapses sidebar on mobile
 */
import React, { type ReactNode } from 'react';
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
declare const AppShell: React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>>;
export { AppShell };
//# sourceMappingURL=AppShell.d.ts.map