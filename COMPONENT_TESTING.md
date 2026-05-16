# Component Testing Strategy

## Testing Pyramid

```
        ╱╲
       ╱  ╲     E2E Tests (5%)
      ╱    ╲    - Full workflows
     ╱──────╲
    ╱        ╲   Integration Tests (25%)
   ╱          ╲  - Component composition
  ╱────────────╲
 ╱              ╲ Unit Tests (70%)
╱────────────────╲ - Individual components
```

## Unit Testing

Test individual components in isolation.

### Button Component Example

```tsx
// components/button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  describe('variants', () => {
    it('renders primary variant by default', () => {
      const { container } = render(<Button>Click</Button>);
      expect(container.querySelector('button')).toHaveClass('bg-blue-600');
    });

    it('renders secondary variant', () => {
      const { container } = render(<Button variant="secondary">Click</Button>);
      expect(container.querySelector('button')).toHaveClass('bg-slate-200');
    });
  });

  describe('sizes', () => {
    it('renders medium size by default', () => {
      const { container } = render(<Button>Click</Button>);
      expect(container.querySelector('button')).toHaveClass('h-10');
    });

    it('renders small size', () => {
      const { container } = render(<Button size="sm">Click</Button>);
      expect(container.querySelector('button')).toHaveClass('h-8');
    });
  });

  describe('loading state', () => {
    it('shows spinner when loading', () => {
      render(<Button isLoading>Processing</Button>);
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });

    it('disables button when loading', () => {
      render(<Button isLoading>Processing</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Button aria-label="Close dialog">×</Button>);
      expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
    });

    it('shows focus ring on keyboard focus', () => {
      const { container } = render(<Button>Click</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
      expect(container.querySelector('button')).toHaveClass('focus-visible:ring-2');
    });
  });
});
```

### Input Component Example

```tsx
// components/input/Input.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('updates value on change', async () => {
    const user = userEvent.setup();
    const { container } = render(<Input />);
    const input = container.querySelector('input') as HTMLInputElement;

    await user.type(input, 'test value');
    expect(input.value).toBe('test value');
  });

  it('displays error message', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Input helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  describe('labels', () => {
    it('renders label when provided', () => {
      render(<Input label="Email" />);
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('shows required indicator for required fields', () => {
      render(<Input label="Email" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('associates label with input', () => {
      const { container } = render(<Input label="Email" />);
      const label = screen.getByText('Email');
      const input = container.querySelector('input');

      expect(label.getAttribute('for')).toBe(input?.id);
    });

    it('marks as invalid with error', () => {
      const { container } = render(<Input error="Error" />);
      expect(container.querySelector('input')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
```

### Dialog Component Example

```tsx
// components/dialog/Dialog.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('renders when isOpen is true', () => {
    render(
      <Dialog isOpen={true} onOpenChange={() => {}}>
        Dialog content
      </Dialog>
    );
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Dialog isOpen={false} onOpenChange={() => {}}>
        Dialog content
      </Dialog>
    );
    expect(screen.queryByText('Dialog content')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when close button is clicked', async () => {
    const handleOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog isOpen={true} onOpenChange={handleOpenChange} title="Dialog">
        Content
      </Dialog>
    );

    await user.click(screen.getByLabelText('Close dialog'));
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on escape key', async () => {
    const handleOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog isOpen={true} onOpenChange={handleOpenChange}>
        Content
      </Dialog>
    );

    await user.keyboard('{Escape}');
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  describe('accessibility', () => {
    it('has role="dialog"', () => {
      render(
        <Dialog isOpen={true} onOpenChange={() => {}}>
          Content
        </Dialog>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      render(
        <Dialog isOpen={true} onOpenChange={() => {}}>
          Content
        </Dialog>
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('manages focus properly', async () => {
      const { container } = render(
        <Dialog isOpen={true} onOpenChange={() => {}} showClose>
          Content
        </Dialog>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const dialog = container.querySelector('[role="dialog"]');
      const closeButton = screen.getByLabelText('Close dialog');

      expect(closeButton).toHaveFocus();
    });
  });
});
```

## Integration Testing

Test components working together.

```tsx
// __tests__/form-integration.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, Input } from '@forge/ui';

describe('Form Integration', () => {
  it('form submission works with button and inputs', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <form onSubmit={handleSubmit}>
        <Input label="Name" required />
        <Input label="Email" type="email" required />
        <Button type="submit">Submit</Button>
      </form>
    );

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByText('Submit');

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
```

## Accessibility Testing

```tsx
// __tests__/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@forge/ui';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('button has no accessibility violations', async () => {
    const { container } = render(
      <Button>
        Click me
      </Button>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Testing Best Practices

### 1. Test Behavior, Not Implementation

```tsx
// ❌ Bad - Testing implementation details
expect(component.find('.button-primary')).toHaveLength(1);

// ✅ Good - Testing behavior
expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
```

### 2. Use User Events, Not Fire Events

```tsx
// ❌ Bad - fireEvent doesn't represent real interaction
fireEvent.click(button);

// ✅ Good - userEvent simulates real user interaction
await user.click(button);
```

### 3. Query by Accessible Queries

```tsx
// ❌ Bad - Implementation details
const button = container.querySelector('.button');

// ✅ Good - Accessible queries
const button = screen.getByRole('button', { name: /submit/i });
```

### 4. Test Error States

```tsx
it('displays validation error', () => {
  render(<Input error="Email is required" />);
  expect(screen.getByText('Email is required')).toBeInTheDocument();
});
```

### 5. Test Loading States

```tsx
it('shows loading spinner', () => {
  render(<Button isLoading>Processing</Button>);
  expect(screen.getByLabelText('Loading')).toBeInTheDocument();
});
```

### 6. Test Keyboard Interactions

```tsx
it('closes dialog on escape', async () => {
  const user = userEvent.setup();
  const { rerender } = render(
    <Dialog isOpen={true} onOpenChange={() => {}}>
      Content
    </Dialog>
  );

  await user.keyboard('{Escape}');
  expect(onOpenChange).toHaveBeenCalled();
});
```

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific file
pnpm test button.test.tsx

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## Coverage Goals

- **Statements**: 85%+
- **Branches**: 80%+
- **Functions**: 85%+
- **Lines**: 85%+

## Resources

- [Testing Library Documentation](https://testing-library.com/)
- [Vitest Documentation](https://vitest.dev/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
