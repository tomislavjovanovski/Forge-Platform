/**
 * ThemeSwitcher Pattern
 * Toggle between light and dark theme
 */

import React, {
  useEffect,
  useState,
  forwardRef,
  type ReactElement,
} from 'react';

import { cn } from '../../utils/cn';

type ThemeMode =
  | 'light'
  | 'dark';

export interface ThemeSwitcherProps {
  /** Current theme */
  theme?: ThemeMode;

  /** Theme change handler */
  onChange?: (
    theme: ThemeMode,
  ) => void;

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
const ThemeSwitcher = forwardRef<
  HTMLDivElement,
  ThemeSwitcherProps
>(
  (
    {
      theme: controlledTheme,
      onChange,
      className,
    },
    ref,
  ): ReactElement => {
    const [theme, setTheme] =
      useState<ThemeMode>(
        'light',
      );

    const [
      mounted,
      setMounted,
    ] = useState(false);

    const isControlled =
      controlledTheme !==
      undefined;

    const activeTheme =
      controlledTheme ??
      theme;

    /**
     * Initialize theme
     * from system preference
     * or localStorage
     */
    useEffect((): void => {
      const stored =
        localStorage.getItem(
          'theme',
        );

      const storedTheme: ThemeMode | null =
        stored === 'light' ||
        stored === 'dark'
          ? stored
          : null;

      const preferred: ThemeMode =
        storedTheme ??
        (window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches
          ? 'dark'
          : 'light');

      if (
        !isControlled
      ) {
        setTheme(
          preferred,
        );
      }

      const initialTheme: ThemeMode =
        controlledTheme ??
        preferred;

      document.documentElement.classList.toggle(
        'dark',
        initialTheme ===
          'dark',
      );

      setMounted(true);
    }, [
      controlledTheme,
      isControlled,
    ]);

    const handleToggle =
      (): void => {
        const newTheme: ThemeMode =
          activeTheme ===
          'light'
            ? 'dark'
            : 'light';

        if (
          !isControlled
        ) {
          setTheme(
            newTheme,
          );
        }

        localStorage.setItem(
          'theme',
          newTheme,
        );

        document.documentElement.classList.toggle(
          'dark',
          newTheme ===
            'dark',
        );

        onChange?.(
          newTheme,
        );
      };

    if (!mounted) {
      return (
        <div
          ref={ref}
          className={cn(
            'inline-flex gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900',
            className,
          )}
        >
          <div className="h-9 w-9 rounded" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900',
          className,
        )}
      >
        <button
          type="button"
          onClick={
            handleToggle
          }
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            activeTheme ===
              'light'
              ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
          )}
          aria-label={`Switch to ${
            activeTheme ===
            'light'
              ? 'dark'
              : 'light'
          } mode`}
        >
          {activeTheme ===
          'light' ? (
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.293 1.293a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.293-1.293a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-2.828-2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-2.828-2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 6a4 4 0 110 8 4 4 0 010-8z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    );
  },
);

ThemeSwitcher.displayName =
  'ThemeSwitcher';

export { ThemeSwitcher };