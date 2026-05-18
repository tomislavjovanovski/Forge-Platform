/**
 * ThemeSwitcher Pattern
 * Toggle between light and dark theme
 */
type ThemeMode = 'light' | 'dark';
export interface ThemeSwitcherProps {
    /** Current theme */
    theme?: ThemeMode;
    /** Theme change handler */
    onChange?: (theme: ThemeMode) => void;
    /** CSS class name */
    className?: string;
}
/**
 * ThemeSwitcher Component
 * Provides a button to toggle
 * between light and dark themes
 *
 * Features:
 * - System preference detection
 * - Persistent storage
 * - Smooth transition
 * - Accessible
 */
declare const ThemeSwitcher: import("react").ForwardRefExoticComponent<ThemeSwitcherProps & import("react").RefAttributes<HTMLDivElement>>;
export { ThemeSwitcher };
//# sourceMappingURL=ThemeSwitcher.d.ts.map