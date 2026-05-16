# @forge/ui Design System

Production-grade design system and component library for Forge Platform. Built with React, TypeScript, Tailwind CSS, and inspired by enterprise design systems like Shopify Polaris and Radix UI.

## Philosophy

This design system follows these core principles:

1. **Accessibility First** - All components are WCAG 2.1 AA compliant by default
2. **Type-Safe** - Full TypeScript support with strict types
3. **Composable** - Compound component patterns for maximum flexibility
4. **Themeable** - Built-in dark mode and token-based theming
5. **Scalable** - Designed to grow with your product
6. **Maintainable** - Clear patterns and conventions

## Quick Start

```tsx
import { Button, Input, Dialog } from '@forge/ui';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Dialog
      </Button>

      <Dialog
        isOpen={open}
        onOpenChange={setOpen}
        title="Welcome"
      >
        <Input label="Name" placeholder="Enter your name" />
      </Dialog>
    </>
  );
}
```

## Design Tokens

The design system uses a comprehensive token architecture for consistency:

### Colors

Semantic color naming with light and dark mode support:
- `neutral` - Grayscale for text, backgrounds, borders
- `brand` - Primary action colors
- `success`, `warning`, `critical`, `info` - State colors

```tsx
import { semanticColors, interactiveColors } from '@forge/ui';

// Use in components
const bgColor = interactiveColors.background.primary;
```

### Typography

Consistent type scales with semantic variants:

```tsx
import { typography } from '@forge/ui';

// Type scales: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
// Semantic variants: h1-h4, body, body-sm, button, label, caption, code
```

### Spacing

8px-based spacing scale for layouts:

```tsx
import { spacing } from '@forge/ui';

// 0-96: from 0 to 384px
// Use with Tailwind: p-4, gap-6, mb-8
```

### Motion

Animation tokens for consistent timing:

```tsx
import { motionTokens, animationGuidelines } from '@forge/ui';

// Durations: instant, fastest, faster, fast, base, slow, slower, slowest
// Easing: linear, in, out, in-out, standard, emphasis, bounce, elastic
```

## Components

### Button

Versatile button with multiple variants and sizes.

```tsx
<Button>Click me</Button>
<Button variant="secondary" size="lg">Large Secondary</Button>
<Button isLoading>Processing...</Button>
<Button icon={<PlusIcon />} iconEnd={<ArrowIcon />}>
  Add Item
</Button>
```

**Variants:** primary, secondary, tertiary, danger, ghost  
**Sizes:** xs, sm, md (default), lg, xl  
**Props:**
- `variant` - Visual style
- `size` - Button size
- `isLoading` - Show loading spinner
- `icon` / `iconEnd` - Icons before/after text
- `fullWidth` - Stretch to container width
- `disabled` - Disable interaction

### Input

Form input element with states and annotations.

```tsx
<Input placeholder="Enter text..." />
<Input
  label="Email"
  type="email"
  error="Invalid email"
  helperText="We'll never share your email"
  required
/>
<Input icon={<SearchIcon />} />
```

**Sizes:** sm, md (default), lg  
**Props:**
- `label` - Input label
- `error` - Error message
- `helperText` - Helper text below input
- `icon` / `iconEnd` - Icons in input
- `required` - Mark as required
- `fullWidth` - Stretch to container width
- `disabled` - Disable interaction

### Dialog

Modal dialog with proper focus management and accessibility.

```tsx
const [open, setOpen] = useState(false);

<Dialog
  isOpen={open}
  onOpenChange={setOpen}
  title="Confirm Action"
  size="md"
  closeOnBackdropClick
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button>Confirm</Button>
    </>
  }
>
  <p>Are you sure?</p>
</Dialog>
```

**Sizes:** sm, md (default), lg, xl  
**Props:**
- `title` - Dialog title
- `isOpen` - Control open state
- `onOpenChange` - Callback when state changes
- `size` - Dialog size
- `closeOnBackdropClick` - Close on backdrop click
- `footer` - Footer content
- `showClose` - Show close button (default: true)

## Styling Utilities

### `cn()` - Class Merging

Merge Tailwind classes with proper precedence handling:

```tsx
import { cn } from '@forge/ui';

const buttonClass = cn(
  'px-4 py-2 rounded',
  condition && 'bg-blue-500',
  overrides // Tailwind precedence respected
);
```

### `resp()` - Responsive Classes

Create responsive classes easily:

```tsx
import { resp } from '@forge/ui';

const classes = resp({
  base: 'flex flex-col',
  md: 'flex-row',
  lg: 'flex-row gap-8'
});
// Result: "flex flex-col md:flex-row lg:flex-row lg:gap-8"
```

### `ariaAttr()` - ARIA Helpers

Type-safe ARIA attribute generation:

```tsx
import { ariaAttr } from '@forge/ui';

<button
  aria-hidden={ariaAttr.hidden(isHidden)}
  aria-disabled={ariaAttr.disabled(isDisabled)}
  aria-expanded={ariaAttr.expanded(isExpanded)}
>
  Menu
</button>
```

## Dark Mode

All components support dark mode with Tailwind's dark mode selector:

```tsx
// In tailwind.config.ts
export default {
  darkMode: 'class',
  // ...
}

// In component
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
  Content
</div>
```

## Accessibility

Every component is built with accessibility in mind:

- ✅ Semantic HTML
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast compliance
- ✅ Screen reader support

## Component Patterns

### Compound Components

```tsx
// Pattern for flexible, composable APIs
<Form>
  <Form.Group>
    <Form.Label>Name</Form.Label>
    <Form.Input />
  </Form.Group>
</Form>
```

### Controlled vs Uncontrolled

All components support both patterns:

```tsx
// Controlled
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled (component manages state)
<Input defaultValue="initial" />
```

### Variant-Driven APIs

Using CVA (class-variance-authority) for variant management:

```tsx
const buttonVariants = cva('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary'
    },
    size: {
      sm: 'btn-sm',
      lg: 'btn-lg'
    }
  }
});

<Button variant="primary" size="lg">Large Primary</Button>
```

## Testing

All components are designed for testability:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@forge/ui';

test('button renders and handles click', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  screen.getByText('Click me').click();
  expect(handleClick).toHaveBeenCalled();
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Theming

Customize the design system by overriding tokens:

```tsx
// theme.ts
import { semanticColors } from '@forge/ui';

export const customColors = {
  ...semanticColors,
  brand: {
    // Override brand colors
    500: '#your-brand-color',
  }
};
```

## Contributing

When adding new components:

1. Follow the established folder structure
2. Include TypeScript types
3. Add CVA variants for styling
4. Implement accessibility features
5. Create Storybook stories
6. Add unit tests
7. Update this README

## Resources

- [Shopify Polaris](https://polaris.shopify.com/) - Inspiration for patterns
- [Radix UI](https://radix-ui.com/) - Headless component inspiration
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility guidelines
- [CVA](https://cva.style/) - Component variant patterns

## License

MIT
