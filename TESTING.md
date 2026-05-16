# Testing Guide

Comprehensive guide for testing in forge-platform.

## Testing Pyramid

```
           E2E Tests (10%)
         Playwright / Cypress
              
      Integration Tests (30%)
        Vitest + React Testing Library
        
    Unit Tests (60%)
      Vitest + Component Testing
```

## Unit Tests

Testing individual functions and components in isolation.

### Setup

```bash
# Install test dependencies (already in package.json)
pnpm install

# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### Writing Unit Tests

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick handler', async () => {
    const handleClick = vi.fn();
    render(<Button label="Click" onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('disables when disabled prop is true', () => {
    render(<Button label="Click" onClick={() => {}} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant styles', () => {
    render(<Button label="Click" onClick={() => {}} variant="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('button--secondary');
  });
});
```

### Testing React Hooks

```typescript
// useUser.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useUser } from './useUser';

describe('useUser', () => {
  it('fetches user on mount', async () => {
    const { result } = renderHook(() => useUser('1'));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.user).toEqual({ id: '1', name: 'Test' });
  });

  it('refetches when userId changes', async () => {
    const { result, rerender } = renderHook(
      ({ userId }) => useUser(userId),
      { initialProps: { userId: '1' } }
    );
    
    rerender({ userId: '2' });
    
    await waitFor(() => {
      expect(result.current.user?.id).toBe('2');
    });
  });
});
```

### Testing Zustand Stores

```typescript
// authStore.test.ts
import { useAuthStore } from './authStore';

describe('authStore', () => {
  it('sets user', () => {
    const store = useAuthStore.getState();
    const user = { id: '1', name: 'Test' };
    
    store.setUser(user);
    
    expect(store.user).toEqual(user);
  });

  it('clears auth on logout', () => {
    const store = useAuthStore.getState();
    store.setUser({ id: '1', name: 'Test' });
    store.setToken('token123');
    
    store.logout();
    
    expect(store.user).toBeNull();
    expect(store.token).toBeNull();
  });
});
```

### Mocking API Calls

```typescript
// userService.test.ts
import { http, HttpResponse } from 'msw';
import { setupTestServer } from '@forge/testing/mocks';
import { userService } from './userService';

describe('userService', () => {
  it('fetches user', async () => {
    const server = setupTestServer([
      http.get('/api/users/1', () => 
        HttpResponse.json({ id: '1', name: 'Test' })
      ),
    ]);
    
    const user = await userService.getUser('1');
    
    expect(user.name).toBe('Test');
  });

  it('handles errors', async () => {
    const server = setupTestServer([
      http.get('/api/users/1', () => 
        HttpResponse.json({ error: 'Not found' }, { status: 404 })
      ),
    ]);
    
    expect(() => userService.getUser('1')).rejects.toThrow('Not found');
  });
});
```

## Integration Tests

Testing multiple components and services working together.

### Example: Form Submission

```typescript
// SignupForm.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupTestServer } from '@forge/testing/mocks';
import { SignupForm } from './SignupForm';

describe('SignupForm Integration', () => {
  it('submits form successfully', async () => {
    const server = setupTestServer([
      http.post('/api/auth/signup', async ({ request }) => {
        const body = await request.json() as Record<string, string>;
        return HttpResponse.json({
          user: { id: '1', email: body.email },
          token: 'token123',
        });
      }),
    ]);
    
    render(<SignupForm />);
    
    // Fill form
    await userEvent.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );
    await userEvent.type(
      screen.getByLabelText(/password/i),
      'password123'
    );
    
    // Submit
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    // Verify success
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('displays validation errors', async () => {
    render(<SignupForm />);
    
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
```

## E2E Tests

End-to-end testing with Playwright.

### Setup

```bash
# Install Playwright
pnpm exec playwright install

# Run E2E tests
pnpm test:e2e

# Watch mode
pnpm exec playwright test --watch

# UI mode
pnpm exec playwright test --ui
```

### Writing E2E Tests

```typescript
// dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
  });

  test('loads dashboard', async ({ page }) => {
    await expect(page).toHaveTitle(/Dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('displays user metrics', async ({ page }) => {
    // Wait for data to load
    await page.waitForSelector('[data-testid="metric-card"]');
    
    const metrics = await page.locator('[data-testid="metric-card"]').count();
    expect(metrics).toBeGreaterThan(0);
  });

  test('navigates to user profile', async ({ page }) => {
    await page.click('text=Profile');
    await expect(page).toHaveURL(/\/profile/);
  });

  test('logs out', async ({ page }) => {
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Logout');
    
    await expect(page).toHaveURL(/\/login/);
  });
});
```

### Multi-browser Testing

```typescript
test.describe('Cross-browser', () => {
  test('works on Chrome', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Chrome-specific test');
    // Test
  });

  test('works on Firefox', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox', 'Firefox-specific test');
    // Test
  });
});
```

## Accessibility Testing

Testing for WCAG 2.1 AA compliance.

### Automated Testing

```typescript
// Button.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Button label="Click me" onClick={() => {}} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('button is keyboard accessible', async () => {
    const { getByRole } = render(
      <Button label="Click me" onClick={vi.fn()} />
    );
    
    const button = getByRole('button');
    expect(button).toHaveFocus(); // After tab
  });
});
```

### Manual Testing Checklist

- [ ] Keyboard navigation (Tab, Shift+Tab, Enter)
- [ ] Screen reader (NVDA, JAWS, VoiceOver)
- [ ] Color contrast (WCAG AA minimum)
- [ ] Focus indicators visible
- [ ] Alt text for images
- [ ] Form labels associated
- [ ] Meaningful link text
- [ ] Semantic HTML used

## Coverage Goals

### Target Coverage

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

### View Coverage Report

```bash
pnpm test:coverage
open coverage/index.html
```

## Debugging Tests

### Debug Mode

```typescript
import { render, screen } from '@testing-library/react';

test('debug test', () => {
  const { debug } = render(<Component />);
  debug(); // Prints DOM to console
  
  screen.debug(screen.getByRole('button'));
});
```

### Visual Debugging

```typescript
test.only('debug with screenshots', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'debug.png' });
  
  debugger; // Pauses in debugger
});
```

### Run Single Test

```bash
# Vitest
pnpm test -- Button.test.tsx --grep "renders with label"

# Playwright
pnpm exec playwright test dashboard.spec.ts -g "loads dashboard"
```

## Best Practices

### DO

- ✅ Test user behavior, not implementation
- ✅ Use semantic queries (getByRole, getByLabelText)
- ✅ Test accessibility along with functionality
- ✅ Use fixtures for consistent test data
- ✅ Mock external dependencies (APIs, timers)
- ✅ Keep tests focused and isolated
- ✅ Use descriptive test names

### DON'T

- ❌ Test implementation details
- ❌ Use testid as primary selector
- ❌ Duplicate production logic in tests
- ❌ Make tests interdependent
- ❌ Mock everything (including internals)
- ❌ Write flaky async tests
- ❌ Test third-party libraries

## Continuous Integration

Tests run on every PR:

```bash
# Lint and type check
pnpm lint
pnpm type-check

# Unit and integration tests
pnpm test

# E2E tests
pnpm test:e2e

# Build
pnpm build
```

All must pass before merging.

## Further Reading

- [Vitest Documentation](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
