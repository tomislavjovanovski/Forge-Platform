/**
 * Motion & Animation Tokens
 * Timing functions and durations for consistent animations
 */
export const motionTokens = {
    // Durations - in milliseconds
    duration: {
        instant: '0ms',
        fastest: '50ms',
        faster: '100ms',
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
        slowest: '1000ms',
    },
    // Easing functions for different interaction types
    easing: {
        // Standard easing - default motion
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Material Design easing
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'standard-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
        'standard-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
        // Emphasis easing - attention-grabbing
        'emphasis': 'cubic-bezier(0.2, 0, 0, 1)',
        'emphasis-in': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        'emphasis-out': 'cubic-bezier(0.3, 0.7, 0.4, 1)',
        // Spring-like effects
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    // CSS transition presets
    transition: {
        'color': 'color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'background-color': 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'border-color': 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'opacity': 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'transform': 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'all': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fast-all': 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // KeyFrames for common animations
    keyframes: {
        fadeIn: {
            from: { opacity: '0' },
            to: { opacity: '1' },
        },
        fadeOut: {
            from: { opacity: '1' },
            to: { opacity: '0' },
        },
        slideInFromTop: {
            from: { opacity: '0', transform: 'translateY(-1rem)' },
            to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromBottom: {
            from: { opacity: '0', transform: 'translateY(1rem)' },
            to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromLeft: {
            from: { opacity: '0', transform: 'translateX(-1rem)' },
            to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
            from: { opacity: '0', transform: 'translateX(1rem)' },
            to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
            from: { opacity: '0', transform: 'scale(0.95)' },
            to: { opacity: '1', transform: 'scale(1)' },
        },
        spin: {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
        },
        pulse: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' },
        },
        bounce: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-0.5rem)' },
        },
    },
};
/**
 * Animation recommendations for different use cases
 */
export const animationGuidelines = {
    // Micro-interactions (< 200ms)
    microInteraction: {
        duration: motionTokens.duration.fast,
        easing: motionTokens.easing['standard'],
    },
    // State changes (200-300ms)
    stateChange: {
        duration: motionTokens.duration.base,
        easing: motionTokens.easing['standard'],
    },
    // Entrance/exit animations (300-500ms)
    entrance: {
        duration: motionTokens.duration.slow,
        easing: motionTokens.easing['standard-decelerate'],
    },
    exit: {
        duration: motionTokens.duration.slow,
        easing: motionTokens.easing['standard-accelerate'],
    },
    // Focus/hover states
    focus: {
        duration: motionTokens.duration.fastest,
        easing: motionTokens.easing.linear,
    },
    // Loading animations (infinite)
    loading: {
        duration: motionTokens.duration.slowest,
        easing: motionTokens.easing.linear,
    },
};
//# sourceMappingURL=motion.js.map