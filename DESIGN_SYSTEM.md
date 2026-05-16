# Design System Architecture & Guidelines

## Token System Architecture

The design system is built on a layered token architecture inspired by design token frameworks:

```
Global Tokens
    ↓
Semantic Tokens
    ↓
Component Tokens
    ↓
Component Variants
```

### Layer 1: Global Tokens (`tokens/`)

Raw, context-independent values:
- Colors (hex values)
- Typography (font families, sizes, weights)
- Spacing (px/rem units)
- Motion (durations, easing functions)
- Shadows & elevations

```ts
// tokens/colors.ts
export const semanticColors = {
  neutral: { 50, 100, ..., 900 },
  brand: { 50, 100, ..., 900 },
  // ...
}

// tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem',  // 8px
  // ...
}
```

### Layer 2: Semantic Tokens

Context-aware tokens for common use cases:

```ts
// tokens/colors.ts
export const interactiveColors = {
  text: {
    primary: semanticColors.neutral[900],
    secondary: semanticColors.neutral[600],
    // ...
  },
  background: {
    primary: semanticColors.neutral[0],
    secondary: semanticColors.neutral[50],
    // ...
  }
}
```

### Layer 3: Component Tokens

Component-specific configurations via CVA:

```ts
// components/button/Button.tsx
const buttonVariants = cva('base-styles', {
  variants: {
    variant: {
      primary: 'bg-brand-600 text-white hover:bg-brand-700',
      secondary: 'bg-neutral-200 text-neutral-900',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
    }
  }
})
```

## Folder Structure

```
packages/ui/
├── src/
│   ├── index.ts                    # Main entry point
│   ├── tokens/                     # Design tokens
│   │   ├── index.ts
│   │   ├── colors.ts              # Color tokens
│   │   ├── typography.ts          # Type scale
│   │   ├── spacing.ts             # Spacing & breakpoints
│   │   └── motion.ts              # Animation tokens
│   ├── utils/                      # Utility functions
│   │   ├── index.ts
│   │   └── cn.ts                  # Class merging, responsive
│   ├── components/                 # Component library
│   │   ├── index.ts
│   │   ├── button/
│   │   │   └── Button.tsx
│   │   ├── input/
│   │   │   └── Input.tsx
│   │   ├── dialog/
│   │   │   └── Dialog.tsx
│   │   ├── data-table/            # [Example structure]
│   │   │   ├── DataTable.tsx
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   └── [more components]
│   ├── hooks/                      # Custom React hooks
│   │   ├── index.ts
│   │   ├── useDialog.ts           # Dialog state management
│   │   └── useTheme.ts            # Theme context
│   ├── theme/                      # Theme provider
│   │   ├── index.ts
│   │   └── provider.tsx           # Theme context provider
│   └── styles/
│       └── globals.css             # Global styles
├── stories/                        # Storybook stories
│   ├── button.stories.tsx
│   ├── input.stories.tsx
│   └── [component].stories.tsx
├── docs/                          # MDX documentation
│   ├── getting-started.mdx
│   ├── tokens.mdx
│   └── accessibility.mdx
├── README.md
└── package.json
```

## Export Strategy

### Barrel Exports (Re-exports)

```ts
// packages/ui/src/index.ts
export * from './tokens';        // All tokens
export * from './utils';         // Utilities
export * from './components';    // All components
export * from './hooks';         // Custom hooks
```

### Component Exports

```ts
// packages/ui/src/components/index.ts
export * from './button/Button';
export * from './input/Input';
export * from './dialog/Dialog';
```

### Per-Component Exports

```ts
// packages/ui/src/components/button/Button.tsx
export { Button, buttonVariants };
export type { ButtonProps };
```

### Usage

```tsx
// Import components
import { Button, Input, Dialog } from '@forge/ui';

// Import tokens
import { semanticColors, spacing } from '@forge/ui';

// Import utilities
import { cn, resp } from '@forge/ui';

// Import types
import type { ButtonProps } from '@forge/ui';
```

## Theming Architecture

### Theme Provider Pattern

```tsx
// theme/provider.tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### CSS Variables Approach (Alternative)

```css
:root {
  --color-primary: #2E7FF4;
  --color-text: #111827;
  --spacing-base: 1rem;
  --duration-base: 200ms;
}

[data-theme="dark"] {
  --color-primary: #60A5FA;
  --color-text: #F9FAFB;
}
```

## Component Development Checklist

When creating new components:

### 1. Setup
- [ ] Create component folder: `components/[name]/`
- [ ] Create main component: `[Name].tsx`
- [ ] Create barrel export: `index.ts`
- [ ] Create types if needed: `types.ts`

### 2. Component API
- [ ] Define props interface with JSDoc comments
- [ ] Use CVA for variant management
- [ ] Support `className` prop for customization
- [ ] Support `ref` forwarding with `forwardRef`
- [ ] Set `displayName` for debugging

### 3. Styling
- [ ] Use Tailwind utilities
- [ ] Use `cn()` for class merging
- [ ] Support dark mode
- [ ] Ensure focus states for accessibility
- [ ] Use consistent spacing/sizing

### 4. Accessibility
- [ ] Use semantic HTML
- [ ] Add ARIA labels/roles as needed
- [ ] Support keyboard navigation
- [ ] Manage focus properly
- [ ] Test with screen readers

### 5. Testing
- [ ] Create unit tests with Vitest
- [ ] Test component rendering
- [ ] Test props and variants
- [ ] Test event handlers
- [ ] Test accessibility (use axe)

### 6. Documentation
- [ ] Create Storybook stories (CSF 3.0)
- [ ] Document props with argTypes
- [ ] Create usage examples
- [ ] Add MDX documentation page
- [ ] Update main README

### 7. Quality
- [ ] Type-check passes
- [ ] Linting passes
- [ ] Tests pass
- [ ] Storybook builds
- [ ] No console errors

## Responsive Design Strategy

### Mobile-First Approach

```tsx
// Base styles are mobile (320px+)
<div className="flex flex-col px-4">

  {/* At sm: (640px+) */}
  {/* At md: (768px+) become 2-column */}
  {/* At lg: (1024px+) add gap */}
</div>

// Using responsive utility
import { resp } from '@forge/ui';

const containerClass = resp({
  base: 'flex flex-col gap-4',
  sm: 'flex-row',
  md: 'gap-6',
  lg: 'gap-8'
});
```

### Breakpoint Guidelines

| Name | Size | Use Case |
|------|------|----------|
| xs | 320px | Mobile devices |
| sm | 640px | Small tablets |
| md | 768px | Medium tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Large displays |
| 2xl | 1536px | 2K+ displays |

## Semantic Color Naming

Instead of arbitrary color names, use intent-based naming:

```ts
// ❌ Bad
const colors = {
  blue600: '#2E7FF4',
  blue700: '#1E5BC6'
}

// ✅ Good
const colors = {
  primary: '#2E7FF4',        // Primary actions
  secondary: '#6B7280',      // Secondary content
  success: '#22C55E',        // Success states
  warning: '#F59E0B',        // Warning states
  critical: '#EF4444',       // Error states
  info: '#0EA5E9'            // Informational
}
```

## Motion System Recommendations

### Duration Guidelines

- **Instant** (0ms) - No animation
- **Micro** (50-100ms) - Hover effects, focus states
- **Standard** (200ms) - State changes, transitions
- **Slow** (300-500ms) - Entrance/exit animations
- **Very Slow** (1000ms+) - Loading indicators

### Easing Guidelines

- **linear** - Loading spinners, infinite loops
- **standard** (cubic-bezier(0.4, 0, 0.2, 1)) - General purpose
- **emphasis** (cubic-bezier(0.2, 0, 0, 1)) - Attention-grabbing
- **ease-out** - Entrance animations (decelerate)
- **ease-in** - Exit animations (accelerate)

## Accessibility Standards

All components should meet WCAG 2.1 Level AA:

- ✅ **1.4.3** Contrast: Minimum 4.5:1 for text
- ✅ **2.1.1** Keyboard: All functionality via keyboard
- ✅ **2.1.2** No Keyboard Trap: Users can navigate out
- ✅ **2.4.7** Focus Visible: Always show focus indicator
- ✅ **3.2.4** Consistent Identification: Components behave predictably
- ✅ **4.1.2** Name, Role, Value: Proper ARIA usage

## Performance Considerations

### Code Splitting

Components are tree-shakeable:

```tsx
// Only Button is included in bundle
import { Button } from '@forge/ui';
```

### CSS-in-JS vs Tailwind

Using Tailwind CSS for:
- Zero runtime overhead
- Smaller bundle size
- Better treeshaking
- Excellent editor support

### Component Memoization

```tsx
// Memoize expensive components
export const DataTable = React.memo(({ data }: Props) => {
  return <table>{/* ... */}</table>;
});
```

## Common Patterns

### Slot/Composition Pattern

```tsx
// Base component accepts children
<Button>Click</Button>

// With composed components
<Dialog>
  <Dialog.Header>Title</Dialog.Header>
  <Dialog.Body>Content</Dialog.Body>
  <Dialog.Footer>Actions</Dialog.Footer>
</Dialog>
```

### As Prop Pattern

```tsx
// Polymorphic components
<Button as="a" href="/link">Link Button</Button>
<Button as="button">Button</Button>
```

### Render Props Pattern

```tsx
// Flexible component composition
<DataTable
  data={data}
  renderRow={(row) => <tr>{/* ... */}</tr>}
/>
```

## Future Enhancements

Planned components and features:
- Tabs, Accordion, Collapsible
- Select, Multiselect, Combobox
- Checkbox, Radio, Toggle
- Popover, Tooltip, Dropdown
- Breadcrumb, Pagination
- Alert, Toast notifications
- Form components (FormField, FormLabel)
- Advanced table features (sorting, filtering)
- Dark mode theme provider
- Component composition examples

## References

- [Design Tokens Format Module](https://design-tokens.github.io/community-group/format/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Primitives](https://radix-ui.com/)
- [Shopify Polaris](https://polaris.shopify.com/)
- [CVA (Class Variance Authority)](https://cva.style/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
