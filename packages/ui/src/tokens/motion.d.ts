/**
 * Motion & Animation Tokens
 * Timing functions and durations for consistent animations
 */
export declare const motionTokens: {
    readonly duration: {
        readonly instant: "0ms";
        readonly fastest: "50ms";
        readonly faster: "100ms";
        readonly fast: "150ms";
        readonly base: "200ms";
        readonly slow: "300ms";
        readonly slower: "500ms";
        readonly slowest: "1000ms";
    };
    readonly easing: {
        readonly linear: "linear";
        readonly in: "cubic-bezier(0.4, 0, 1, 1)";
        readonly out: "cubic-bezier(0, 0, 0.2, 1)";
        readonly 'in-out': "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly standard: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly 'standard-accelerate': "cubic-bezier(0.4, 0, 1, 1)";
        readonly 'standard-decelerate': "cubic-bezier(0, 0, 0.2, 1)";
        readonly emphasis: "cubic-bezier(0.2, 0, 0, 1)";
        readonly 'emphasis-in': "cubic-bezier(0.05, 0.7, 0.1, 1)";
        readonly 'emphasis-out': "cubic-bezier(0.3, 0.7, 0.4, 1)";
        readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        readonly elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    };
    readonly transition: {
        readonly color: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)";
        readonly 'background-color': "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)";
        readonly 'border-color': "border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)";
        readonly opacity: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)";
        readonly transform: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)";
        readonly all: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)";
        readonly 'fast-all': "all 150ms cubic-bezier(0.4, 0, 0.2, 1)";
    };
    readonly keyframes: {
        readonly fadeIn: {
            readonly from: {
                readonly opacity: "0";
            };
            readonly to: {
                readonly opacity: "1";
            };
        };
        readonly fadeOut: {
            readonly from: {
                readonly opacity: "1";
            };
            readonly to: {
                readonly opacity: "0";
            };
        };
        readonly slideInFromTop: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "translateY(-1rem)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "translateY(0)";
            };
        };
        readonly slideInFromBottom: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "translateY(1rem)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "translateY(0)";
            };
        };
        readonly slideInFromLeft: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "translateX(-1rem)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "translateX(0)";
            };
        };
        readonly slideInFromRight: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "translateX(1rem)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "translateX(0)";
            };
        };
        readonly scaleIn: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "scale(0.95)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "scale(1)";
            };
        };
        readonly spin: {
            readonly from: {
                readonly transform: "rotate(0deg)";
            };
            readonly to: {
                readonly transform: "rotate(360deg)";
            };
        };
        readonly pulse: {
            readonly '0%, 100%': {
                readonly opacity: "1";
            };
            readonly '50%': {
                readonly opacity: "0.5";
            };
        };
        readonly bounce: {
            readonly '0%, 100%': {
                readonly transform: "translateY(0)";
            };
            readonly '50%': {
                readonly transform: "translateY(-0.5rem)";
            };
        };
    };
};
export type DurationToken = keyof typeof motionTokens.duration;
export type EasingToken = keyof typeof motionTokens.easing;
export type TransitionToken = keyof typeof motionTokens.transition;
/**
 * Animation recommendations for different use cases
 */
export declare const animationGuidelines: {
    readonly microInteraction: {
        readonly duration: "150ms";
        readonly easing: "cubic-bezier(0.4, 0, 0.2, 1)";
    };
    readonly stateChange: {
        readonly duration: "200ms";
        readonly easing: "cubic-bezier(0.4, 0, 0.2, 1)";
    };
    readonly entrance: {
        readonly duration: "300ms";
        readonly easing: "cubic-bezier(0, 0, 0.2, 1)";
    };
    readonly exit: {
        readonly duration: "300ms";
        readonly easing: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly focus: {
        readonly duration: "50ms";
        readonly easing: "linear";
    };
    readonly loading: {
        readonly duration: "1000ms";
        readonly easing: "linear";
    };
};
//# sourceMappingURL=motion.d.ts.map