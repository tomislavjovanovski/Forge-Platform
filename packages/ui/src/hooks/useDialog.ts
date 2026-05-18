/**
 * Custom React hooks for design system
 */

import {
  useCallback,
  useEffect,
  useState,
  type RefObject,
} from 'react';

/**
 * Hook for managing dialog state
 */
export function useDialog(
  initialOpen = false,
): {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
  readonly setIsOpen: (
    value: React.SetStateAction<boolean>,
  ) => void;
} {
  const [isOpen, setIsOpen] =
    useState(initialOpen);

  const open = useCallback(
    (): void => {
      setIsOpen(true);
    },
    [],
  );

  const close = useCallback(
    (): void => {
      setIsOpen(false);
    },
    [],
  );

  const toggle = useCallback(
    (): void => {
      setIsOpen(
        (
          prev: boolean,
        ): boolean => !prev,
      );
    },
    [],
  );

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  } as const;
}

type ThemeMode =
  | 'light'
  | 'dark'
  | 'system';

/**
 * Hook for managing theme preference
 */
export function useTheme(): {
  readonly theme: ThemeMode;
  readonly toggleTheme: () => void;
  readonly setTheme: (
    value: React.SetStateAction<ThemeMode>,
  ) => void;
} {
  const [theme, setTheme] =
    useState<ThemeMode>(
      'system',
    );

  useEffect((): void => {
    // Get saved theme or system preference
    const saved =
      localStorage.getItem(
        'theme',
      );

    if (
      saved === 'light' ||
      saved === 'dark' ||
      saved === 'system'
    ) {
      setTheme(saved);
    } else {
      const prefersDark =
        window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;

      setTheme(
        prefersDark
          ? 'dark'
          : 'light',
      );
    }
  }, []);

  const toggleTheme =
    useCallback((): void => {
      setTheme(
        (
          prev: ThemeMode,
        ): ThemeMode => {
          const next: ThemeMode =
            prev === 'dark'
              ? 'light'
              : 'dark';

          localStorage.setItem(
            'theme',
            next,
          );

          document.documentElement.classList.toggle(
            'dark',
            next === 'dark',
          );

          return next;
        },
      );
    }, []);

  return {
    theme,
    toggleTheme,
    setTheme,
  } as const;
}

/**
 * Hook for keyboard navigation
 */
export function useKeyboardNav(
  onEscape?: () => void,
  onEnter?: () => void,
): void {
  useEffect((): (() => void) => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ): void => {
      if (
        event.key ===
          'Escape' &&
        onEscape
      ) {
        event.preventDefault();
        onEscape();
      }

      if (
        event.key ===
          'Enter' &&
        onEnter
      ) {
        event.preventDefault();
        onEnter();
      }
    };

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return (): void => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [onEscape, onEnter]);
}

/**
 * Hook for managing focus trap within an element
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  isActive = true,
): void {
  useEffect(():
    | (() => void)
    | void => {
    if (
      !isActive ||
      !containerRef.current
    ) {
      return;
    }

    const container =
      containerRef.current;

    const focusableElements =
      container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

    if (
      focusableElements.length ===
      0
    ) {
      return;
    }

    const firstElement =
      focusableElements[0];

    const lastElement =
      focusableElements[
        focusableElements.length -
          1
      ];

    const handleKeyDown = (
      event: KeyboardEvent,
    ): void => {
      if (
        event.key !== 'Tab'
      ) {
        return;
      }

      if (
        event.shiftKey
      ) {
        if (
          document.activeElement ===
          firstElement
        ) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (
          document.activeElement ===
          lastElement
        ) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener(
      'keydown',
      handleKeyDown,
    );

    firstElement?.focus();

    return (): void => {
      container.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [
    containerRef,
    isActive,
  ]);
}

/**
 * Hook for detecting click outside
 */
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
): void {
  useEffect((): (() => void) => {
    const handleClickOutside = (
      event: MouseEvent,
    ): void => {
      if (
        ref.current &&
        !ref.current.contains(
          event.target as Node,
        )
      ) {
        callback();
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return (): void => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, [ref, callback]);
}

/**
 * Hook for responsive design queries
 */
export function useMediaQuery(
  query: string,
): boolean {
  const [matches, setMatches] =
    useState(false);

  useEffect((): (() => void) => {
    const media =
      window.matchMedia(
        query,
      );

    if (
      media.matches !==
      matches
    ) {
      setMatches(
        media.matches,
      );
    }

    const listener = (
      event: MediaQueryListEvent,
    ): void => {
      setMatches(
        event.matches,
      );
    };

    media.addEventListener(
      'change',
      listener,
    );

    return (): void => {
      media.removeEventListener(
        'change',
        listener,
      );
    };
  }, [matches, query]);

  return matches;
}

/**
 * Hook for managing controlled/uncontrolled components
 */
export function useControlledState<
  T,
>(
  controlledValue:
    | T
    | undefined,
  defaultValue: T,
  onChange?: (
    value: T,
  ) => void,
): [
  T,
  (value: T) => void,
] {
  const [
    internalValue,
    setInternalValue,
  ] = useState(defaultValue);

  const isControlled =
    controlledValue !==
    undefined;

  const value =
    isControlled
      ? controlledValue
      : internalValue;

  const setValue =
    useCallback(
      (
        newValue: T,
      ): void => {
        if (
          !isControlled
        ) {
          setInternalValue(
            newValue,
          );
        }

        onChange?.(
          newValue,
        );
      },
      [
        isControlled,
        onChange,
      ],
    );

  return [
    value,
    setValue,
  ];
}
