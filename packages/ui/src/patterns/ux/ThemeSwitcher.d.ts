/**
 * ThemeSwitcher Pattern
 * Toggle between light and dark theme
 */
import React from 'react';
export interface ThemeSwitcherProps {
    /** Current theme */
    theme?: 'light' | 'dark';
    /** Theme change handler */
    onChange?: (theme: 'light' | 'dark') => void;
    /** CSS class name */
    className?: string;
}
/**
 * ThemeSwitcher Component
 * Provides a button to toggle between light and dark themes
 *
 * Features:
 * - System preference detection
 * - Persistent storage
 * - Smooth transition
 * - Accessible
 */
export declare const ThemeSwitcher: React.ForwardRefExoticComponent<ThemeSwitcherProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ThemeSwitcher.d.ts.map