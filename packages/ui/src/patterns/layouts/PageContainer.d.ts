/**
 * PageContainer Pattern
 * Responsive container for page content with consistent padding and max-width
 */
import React, { ReactNode } from 'react';
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
export declare const PageContainer: React.ForwardRefExoticComponent<PageContainerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PageContainer.d.ts.map