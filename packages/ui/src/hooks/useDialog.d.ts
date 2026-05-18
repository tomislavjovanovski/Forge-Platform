/**
 * Custom React hooks for design system
 */
import { type RefObject } from 'react';
/**
 * Hook for managing dialog state
 */
export declare function useDialog(initialOpen?: boolean): {
    readonly isOpen: boolean;
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
    readonly setIsOpen: (value: React.SetStateAction<boolean>) => void;
};
type ThemeMode = 'light' | 'dark' | 'system';
/**
 * Hook for managing theme preference
 */
export declare function useTheme(): {
    readonly theme: ThemeMode;
    readonly toggleTheme: () => void;
    readonly setTheme: (value: React.SetStateAction<ThemeMode>) => void;
};
/**
 * Hook for keyboard navigation
 */
export declare function useKeyboardNav(onEscape?: () => void, onEnter?: () => void): void;
/**
 * Hook for managing focus trap within an element
 */
export declare function useFocusTrap(containerRef: RefObject<HTMLElement>, isActive?: boolean): void;
/**
 * Hook for detecting click outside
 */
export declare function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void): void;
/**
 * Hook for responsive design queries
 */
export declare function useMediaQuery(query: string): boolean;
/**
 * Hook for managing controlled/uncontrolled components
 */
export declare function useControlledState<T>(controlledValue: T | undefined, defaultValue: T, onChange?: (value: T) => void): [
    T,
    (value: T) => void
];
export {};
//# sourceMappingURL=useDialog.d.ts.map