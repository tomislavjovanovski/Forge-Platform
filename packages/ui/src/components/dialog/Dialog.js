import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Dialog Component
 * Modal dialog with backdrop, proper focus management, and accessibility
 * Built on portal pattern for proper z-index handling
 */
import { forwardRef, useEffect, useRef, useCallback, } from 'react';
import { cn } from '../../utils/cn';
const sizeVariants = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
};
const Dialog = forwardRef(({ isOpen, onOpenChange, title, children, footer, contentClassName, showClose = true, size = 'md', closeOnBackdropClick = true, className, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, }, _ref) => {
    const dialogRef = useRef(null);
    const contentRef = useRef(null);
    const previouslyFocusedElement = useRef(null);
    // Handle escape key
    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onOpenChange(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onOpenChange]);
    // Focus management
    useEffect(() => {
        if (!isOpen) {
            if (previouslyFocusedElement.current) {
                previouslyFocusedElement.current.focus();
                previouslyFocusedElement.current =
                    null;
            }
            return;
        }
        previouslyFocusedElement.current =
            document.activeElement;
        const originalOverflow = document.body.style
            .overflow;
        document.body.style.overflow =
            'hidden';
        setTimeout(() => {
            if (contentRef.current) {
                const closeButton = contentRef.current.querySelector('[data-dialog-close]');
                const firstButton = contentRef.current.querySelector('button');
                const firstInput = contentRef.current.querySelector('input, textarea, select');
                (closeButton ||
                    firstButton ||
                    firstInput)?.focus();
            }
        }, 0);
        return () => {
            document.body.style.overflow =
                originalOverflow;
        };
    }, [isOpen]);
    // Handle backdrop click
    const handleBackdropClick = useCallback((event) => {
        if (closeOnBackdropClick &&
            event.target ===
                event.currentTarget) {
            onOpenChange(false);
        }
    }, [
        closeOnBackdropClick,
        onOpenChange,
    ]);
    if (!isOpen) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", className: "fixed inset-0 z-40 bg-black/50 transition-opacity duration-200", "aria-label": "Close dialog", onClick: handleBackdropClick }), _jsx("div", { ref: dialogRef, role: "dialog", "aria-modal": "true", "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, "aria-describedby": ariaDescribedby, tabIndex: -1, className: cn('fixed inset-0 z-50 flex items-center justify-center p-4', className), children: _jsxs("div", { ref: contentRef, className: cn('w-full rounded-lg bg-white shadow-xl dark:bg-slate-900', 'flex max-h-[90vh] flex-col overflow-hidden', 'animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200', sizeVariants[size], contentClassName), children: [title && (_jsxs("div", { className: cn('flex items-center justify-between gap-4', 'border-b border-slate-200 dark:border-slate-700', 'px-6 py-4'), children: [_jsx("h2", { id: ariaLabelledby, className: "text-lg font-semibold text-slate-900 dark:text-slate-50", children: title }), showClose && (_jsx("button", { "data-dialog-close": true, onClick: () => onOpenChange(false), className: cn('flex h-8 w-8 items-center justify-center rounded-lg', 'text-slate-600 hover:bg-slate-100 hover:text-slate-900', 'dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500', 'transition-colors duration-200'), "aria-label": "Close dialog", type: "button", children: _jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }))] })), _jsx("div", { className: "flex-1 overflow-y-auto px-6 py-4 text-slate-700 dark:text-slate-300", children: children }), footer && (_jsx("div", { className: cn('flex items-center justify-end gap-3', 'border-t border-slate-200 dark:border-slate-700', 'bg-slate-50 px-6 py-4 dark:bg-slate-800'), children: footer }))] }) })] }));
});
Dialog.displayName =
    'Dialog';
export { Dialog };
//# sourceMappingURL=Dialog.js.map