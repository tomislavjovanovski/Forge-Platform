# Design System Quick Reference

## Component API Quick Guide

### Button

```tsx
import { Button } from '@forge/ui';

// Basic
<Button>Click me</Button>

// Variants: primary (default) | secondary | tertiary | danger | ghost
<Button variant="danger">Delete</Button>

// Sizes: xs | sm | md (default) | lg | xl
<Button size="lg">Large Button</Button>

// With icons
<Button icon={<PlusIcon />}>Add</Button>
<Button iconEnd={<ArrowIcon />}>Next</Button>

// States
<Button disabled>Disabled</Button>
<Button isLoading>Processing...</Button>
<Button fullWidth>Full Width</Button>

// Combine
<Button variant="secondary" size="sm" disabled>
  Save
</Button>
```

### Input

```tsx
import { Input } from '@forge/ui';

// Basic
<Input placeholder="Enter text..." />

// With label
<Input label="Email" type="email" required />

// With error
<Input error="Email is invalid" />

// With helper text
<Input helperText="We'll never share your email" />

// With icons
<Input icon={<SearchIcon />} placeholder="Search..." />

// Sizes: sm | md (default) | lg
<Input size="lg" placeholder="Large input" />

// States
<Input disabled />
<Input value="Controlled value" onChange={(e) => {}} />

// Combine
<Input
  label="Name"
  required
  error={errors.name}
  helperText="Your full name"
  icon={<PersonIcon />}
/>
```

### Dialog

```tsx
import { Dialog } from '@forge/ui';
import { useState } from 'react';

const [open, setOpen] = useState(false);

// Basic
<Dialog isOpen={open} onOpenChange={setOpen}>
  Content
</Dialog>

// With title
<Dialog isOpen={open} onOpenChange={setOpen} title="Confirm">
  Are you sure?
</Dialog>

// With footer
<Dialog
  isOpen={open}
  onOpenChange={setOpen}
  title="Delete Item"
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="danger">Delete</Button>
    </>
  }
>
  This cannot be undone.
</Dialog>

// Sizes: sm | md (default) | lg | xl
<Dialog isOpen={open} onOpenChange={setOpen} size="lg">
  Content
</Dialog>

// Without close button
<Dialog isOpen={open} onOpenChange={setOpen} showClose={false}>
  Content
</Dialog>

// No backdrop dismiss
<Dialog isOpen={open} onOpenChange={setOpen} closeOnBackdropClick={false}>
  Content
</Dialog>
```

## Token Usage

### Colors

```tsx
import { semanticColors, interactiveColors } from '@forge/ui';

// Semantic colors (all shades)
semanticColors.brand[500]      // Primary brand color
semanticColors.success[600]    // Success shade
semanticColors.warning[500]    // Warning color
semanticColors.critical[600]   // Error shade
semanticColors.neutral[900]    // Darkest gray

// Interactive colors (context-aware)
interactiveColors.text.primary
interactiveColors.background.secondary
interactiveColors.border.focus
interactiveColors.state.success
```

### Typography

```tsx
import { typography } from '@forge/ui';

// Font families
typography.fonts.sans    // Default sans-serif stack
typography.fonts.mono    // Monospace fonts

// Scale (size, lineHeight, fontWeight)
typography.scale.base.fontSize    // 1rem
typography.scale.xl.fontWeight    // 600

// Semantic variants
<h1 style={typography.variants.h1}>Heading</h1>
<p style={typography.variants.body}>Body text</p>
<button style={typography.variants.button}>Button</button>
```

### Spacing

```tsx
import { spacing, breakpoints, shadows } from '@forge/ui';

// Spacing values (0-96, step 0.5-4px)
spacing[4]      // 1rem (16px)
spacing[8]      // 2rem (32px)

// With Tailwind
<div className="p-4 gap-6 mb-8">  {/* spacing[4], spacing[6], spacing[8] */}
  Content
</div>

// Breakpoints
breakpoints.sm      // 640px
breakpoints.md      // 768px
breakpoints.lg      // 1024px

// Shadows
<div className="shadow-lg">      {/* shadows.lg */}
  Content
</div>
```

### Motion

```tsx
import { motionTokens, animationGuidelines } from '@forge/ui';

// Durations
motionTokens.duration.fast      // 150ms
motionTokens.duration.base      // 200ms
motionTokens.duration.slow      // 300ms

// Easing
motionTokens.easing['standard']
motionTokens.easing['emphasis']
motionTokens.easing.bounce

// Pre-built transitions
motionTokens.transition.color
motionTokens.transition['all']

// Animation recommendations
animationGuidelines.microInteraction.duration   // fast (150ms)
animationGuidelines.entrance.easing             // ease-out
```

## Utility Functions

### `cn()` - Class Merging

```tsx
import { cn } from '@forge/ui';

cn('px-4 py-2', 'px-8')  // 'px-8 py-2' (Tailwind precedence)
cn('flex', condition && 'justify-center')  // Conditional classes
cn(baseClass, variant === 'lg' && 'text-lg')  // Variant classes
```

### `resp()` - Responsive Classes

```tsx
import { resp } from '@forge/ui';

resp({
  base: 'flex flex-col',
  md: 'flex-row',
  lg: 'gap-8'
})
// Result: "flex flex-col md:flex-row lg:gap-8"
```

### `ariaAttr()` - ARIA Helpers

```tsx
import { ariaAttr } from '@forge/ui';

<button
  aria-hidden={ariaAttr.hidden(isHidden)}
  aria-disabled={ariaAttr.disabled(isDisabled)}
  aria-expanded={ariaAttr.expanded(isExpanded)}
  aria-selected={ariaAttr.selected(isSelected)}
>
  Menu
</button>
```

## Custom Hooks

```tsx
import {
  useDialog,
  useTheme,
  useKeyboardNav,
  useFocusTrap,
  useClickOutside,
  useMediaQuery,
  useControlledState,
} from '@forge/ui';

// Dialog state management
const { isOpen, open, close, toggle } = useDialog();

// Theme management
const { theme, toggleTheme } = useTheme();

// Keyboard navigation
useKeyboardNav(
  () => console.log('Escape pressed'),
  () => console.log('Enter pressed')
);

// Focus trap (for modals)
const dialogRef = useRef(null);
useFocusTrap(dialogRef, isOpen);

// Click outside detection
const menuRef = useRef(null);
useClickOutside(menuRef, () => setOpen(false));

// Media queries
const isMobile = useMediaQuery('(max-width: 640px)');
const isLarge = useMediaQuery('(min-width: 1024px)');

// Controlled/uncontrolled state
const [value, setValue] = useControlledState(
  controlledValue,
  defaultValue,
  onChange
);
```

## Dark Mode

```tsx
// In your Tailwind config
export default {
  darkMode: 'class',  // or 'media'
  // ...
}

// In components
<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-slate-50">
    Text that changes in dark mode
  </p>
</div>

// Using hook
const { theme, toggleTheme } = useTheme();

<button onClick={toggleTheme}>
  {theme === 'dark' ? '☀️' : '🌙'}
</button>
```

## Component Composition Patterns

### Compound Components

```tsx
// Design pattern for flexible APIs
<Dialog title="Confirm">
  <Dialog.Body>
    Are you sure?
  </Dialog.Body>
  <Dialog.Footer>
    <Button>Cancel</Button>
    <Button variant="danger">Delete</Button>
  </Dialog.Footer>
</Dialog>
```

### Controlled + Uncontrolled

```tsx
// Controlled (parent manages state)
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled (component manages state)
<Input defaultValue="initial" ref={inputRef} />
```

### Polymorphic Components

```tsx
// Same component, different HTML
<Button>Button</Button>
<Button as="a" href="/link">Link Button</Button>
<Button as="label">Label Button</Button>
```

## Common Patterns

### Form with Validation

```tsx
import { Input, Button } from '@forge/ui';
import { useState } from 'react';

export function MyForm() {
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate...
    // Submit...
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Dialog with Form

```tsx
import { Dialog, Button, Input } from '@forge/ui';
import { useState } from 'react';

export function CreateDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const handleCreate = () => {
    // Submit...
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create</Button>

      <Dialog
        isOpen={open}
        onOpenChange={setOpen}
        title="Create New"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </>
        }
      >
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </Dialog>
    </>
  );
}
```

### Responsive Layout

```tsx
import { resp } from '@forge/ui';

export function ResponsiveGrid() {
  const gridClass = resp({
    base: 'grid grid-cols-1 gap-4',
    md: 'grid-cols-2 gap-6',
    lg: 'grid-cols-3 lg:gap-8',
  });

  return <div className={gridClass}>Items</div>;
}
```

## Accessibility Checklist

- [ ] All interactive elements have visible focus states
- [ ] Color is not the only way to convey information
- [ ] Forms have associated labels
- [ ] Buttons have descriptive text or aria-label
- [ ] Dialogs are modal and trap focus
- [ ] Keyboard navigation works (Tab, Escape, Enter)
- [ ] Contrast meets WCAG AA (4.5:1 for text)
- [ ] Icons have aria-label or are decorative
- [ ] Alt text on images
- [ ] Semantic HTML (button, input, form, etc.)

## Resources

- [Component Stories in Storybook](http://localhost:6006)
- [Design System Documentation](./DESIGN_SYSTEM.md)
- [Testing Guide](./COMPONENT_TESTING.md)
- [Tailwind CSS](https://tailwindcss.com/)
- [CVA Documentation](https://cva.style/)
