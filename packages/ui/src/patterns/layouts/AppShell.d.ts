/**
 * AppShell Pattern
 * Primary application layout with header, sidebar, and main content area
 * Responsive layout that collapses sidebar on mobile
 */
import React, { ReactNode } from 'react';
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
 * Provides a complete application layout structure
 *
 * Features:
 * - Responsive sidebar (collapsible on mobile)
 * - Fixed header with navigation
 * - Flexible main content area
 * - Optional footer
 * - Dark mode support
 */
export declare const AppShell: React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AppShell.d.ts.map