/**
 * Dialog Component
 * Modal dialog with backdrop, proper focus management, and accessibility
 * Built on portal pattern for proper z-index handling
 */
import { type ReactNode } from 'react';
export interface DialogProps {
    /**
     * Whether dialog is open
     */
    isOpen: boolean;
    /**
     * Callback when dialog requests to close
     */
    onOpenChange: (open: boolean) => void;
    /**
     * Dialog title
     */
    title?: ReactNode;
    /**
     * Dialog content
     */
    children: ReactNode;
    /**
     * Dialog footer
     */
    footer?: ReactNode;
    /**
     * Custom content class
     */
    contentClassName?: string;
    /**
     * Whether to show close button
     */
    showClose?: boolean;
    /**
     * Size of dialog
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Whether clicking backdrop closes dialog
     */
    closeOnBackdropClick?: boolean;
    /**
     * Custom class name
     */
    className?: string;
    /**
     * Aria label when no title
     */
    'aria-label'?: string;
    /**
     * Aria labelledby
     */
    'aria-labelledby'?: string;
    /**
     * Aria describedby
     */
    'aria-describedby'?: string;
}
declare const Dialog: import("react").ForwardRefExoticComponent<DialogProps & import("react").RefAttributes<HTMLDivElement>>;
export { Dialog };
//# sourceMappingURL=Dialog.d.ts.map