/**
 * Dialog Component
 * Modal dialog with backdrop, proper focus management, and accessibility
 * Built on portal pattern for proper z-index handling
 */
import React from 'react';
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
    title?: React.ReactNode;
    /**
     * Dialog content
     */
    children: React.ReactNode;
    /**
     * Dialog footer
     */
    footer?: React.ReactNode;
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
/**
 * Dialog component
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * return (
 *   <>
 *     <Button onClick={() => setOpen(true)}>Open Dialog</Button>
 *
 *     <Dialog isOpen={open} onOpenChange={setOpen} title="Confirm Action">
 *       <p>Are you sure you want to proceed?</p>
 *       <DialogFooter>
 *         <Button onClick={() => setOpen(false)}>Cancel</Button>
 *         <Button variant="primary">Confirm</Button>
 *       </DialogFooter>
 *     </Dialog>
 *   </>
 * );
 * ```
 */
declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;
export { Dialog };
//# sourceMappingURL=Dialog.d.ts.map