/**
 * AsyncSection Pattern
 * Wraps async content with loading, error, and empty states
 */
import React, { ReactNode } from 'react';
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
export declare const AsyncSection: React.ForwardRefExoticComponent<AsyncSectionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AsyncSection.d.ts.map