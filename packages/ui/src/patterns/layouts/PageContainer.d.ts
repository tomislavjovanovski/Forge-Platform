/**
 * PageContainer Pattern
 * Responsive container for page content
 * with consistent padding and max-width
 */
import { type ReactNode } from 'react';
export interface PageContainerProps {
    /** Page content */
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
 * Wraps page content with consistent spacing,
 * max-width, and responsive behavior
 */
declare const PageContainer: import("react").ForwardRefExoticComponent<PageContainerProps & import("react").RefAttributes<HTMLDivElement>>;
export { PageContainer };
//# sourceMappingURL=PageContainer.d.ts.map