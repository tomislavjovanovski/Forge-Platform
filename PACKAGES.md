# Package Development Guide

Detailed documentation for developing and maintaining packages in the forge-platform monorepo.

## Package Types

### 1. Applications (apps/)

Deployable end-user products with complete feature sets.

**Characteristics**:
- Public: `false` (not published to npm)
- Entry: `src/main.tsx` or `src/main.ts`
- Bundled: Yes, with Vite
- Testing: Full pyramid (unit, integration, e2e)
- Deployment: Independent CI/CD pipeline

**Example: dashboard**

```
apps/dashboard/
├── src/
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Root component
│   ├── index.css          # Global styles
│   ├── components/        # Feature components
│   ├── pages/             # Route pages
│   ├── hooks/             # Custom hooks
│   └── types/             # Local types
├── e2e/                   # Playwright tests
├── vite.config.ts         # Build configuration
├── vitest.config.ts       # Test configuration
├── tsconfig.json          # Type checking
├── package.json           # Dependencies
└── index.html             # HTML template
```

**Package.json**:
```json
{
  "name": "@forge/dashboard",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest"
  },
  "dependencies": {
    "@forge/ui": "workspace:*",
    "@forge/auth": "workspace:*",
    "react": "19.0.0"
  }
}
```

**Development Workflow**:
```bash
# Start dev server
pnpm dev:dashboard

# Build
pnpm build --filter=@forge/dashboard

# Test
pnpm test --filter=@forge/dashboard

# E2E
pnpm test:e2e --filter=@forge/dashboard
```

### 2. Platform Packages (packages/)

Reusable domain-specific functionality and utilities.

#### @forge/ui - Component Library

**Purpose**: Shared React component system

**Characteristics**:
- Public: `true` (publishable to npm)
- No app logic
- Fully self-contained
- Accessibility first
- Styled with Tailwind CSS
- Built with Vite

**Structure**:
```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx        # Component
│   │   │   ├── Button.test.tsx   # Tests
│   │   │   ├── Button.stories.tsx# Storybook
│   │   │   └── index.ts          # Export
│   │   ├── Dialog/
│   │   ├── Form/
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   └── index.ts
├── vite.config.ts         # Library build config
├── package.json           # With exports field
└── tsconfig.json
```

**Component Pattern**:
```typescript
import type { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}: ButtonProps): React.ReactElement => {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        isLoading && 'opacity-50 pointer-events-none'
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

**Exports Strategy** (package.json):
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./components": {
      "types": "./dist/components/index.d.ts",
      "import": "./dist/components/index.js"
    },
    "./styles": "./dist/styles.css"
  }
}
```

**Using Components**:
```typescript
// From apps
import { Button, Dialog, Form } from '@forge/ui';
import '@forge/ui/styles';

// Or import specific
import { Button } from '@forge/ui/components';
```

#### @forge/auth - Authentication

**Purpose**: Authentication and authorization layer

**Exports**:
- `useAuth()` - Hook for current user
- `useAuthStore` - Zustand store
- `AuthProvider` - Provider component
- `LOGIN_URL`, `LOGOUT_URL` - Constants

**Implementation**:
```typescript
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'forge-auth' }
  )
);

export function useAuth() {
  const { user, token, setUser, setToken, logout } = useAuthStore();
  
  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const { user, token } = await response.json();
    setUser(user);
    setToken(token);
  };
  
  return { user, token, login, logout };
}
```

**Usage in App**:
```typescript
function AdminApp() {
  const { user, login } = useAuth();
  
  if (!user) {
    return <LoginForm onLogin={login} />;
  }
  
  return <Dashboard />;
}
```

#### @forge/analytics - Event Tracking

**Purpose**: PostHog integration for product analytics

**Exports**:
- `useAnalytics()` - Hook for tracking
- `events` - Event constants
- `initAnalytics()` - Setup function

**Event Types**:
```typescript
export type EventType =
  | 'page_view'
  | 'user_action'
  | 'feature_used'
  | 'error_occurred'
  | 'conversion';

export const events = {
  PAGE_VIEW: 'page_view',
  USER_SIGNUP: 'user_signup',
  FEATURE_USED: 'feature_used',
} as const;
```

**Usage**:
```typescript
function Dashboard() {
  const { track } = useAnalytics();
  
  useEffect(() => {
    track({
      event: 'page_view',
      properties: { page: 'dashboard' }
    });
  }, [track]);
  
  return <div>Dashboard</div>;
}
```

#### @forge/monitoring - Error Tracking & A11y

**Purpose**: Sentry error tracking and accessibility utilities

**Modules**:
- `sentry/` - Sentry initialization and integration
- `errors/` - Error classes and codes
- `accessibility/` - Axe-core utilities

**Sentry Setup**:
```typescript
// In app entry point
import { initSentry } from '@forge/monitoring/sentry';

initSentry({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_APP_ENV,
  tracesSampleRate: 0.1,
});
```

**Custom Error Handling**:
```typescript
import { ForgeError, ErrorCode } from '@forge/monitoring/errors';

throw new ForgeError(
  ErrorCode.VALIDATION_ERROR,
  'Email is required',
  400,
  { field: 'email' }
);
```

**Accessibility Testing**:
```typescript
import { testAccessibility } from '@forge/monitoring/accessibility';

test('Dashboard should be accessible', async () => {
  const { container } = render(<Dashboard />);
  await testAccessibility(container);
});
```

#### @forge/testing - Testing Utilities

**Purpose**: Shared testing infrastructure and fixtures

**Modules**:
- `mocks/` - MSW setup
- `fixtures/` - Test data factories
- `utils/` - RTL helpers

**Setting Up Tests**:
```typescript
import { setupTestServer, getTestServer } from '@forge/testing/mocks';
import { fixtures } from '@forge/testing/fixtures';
import { render, screen } from '@forge/testing/utils';

beforeAll(() => {
  const server = setupTestServer([
    http.get('/api/users/:id', () => HttpResponse.json(fixtures.user))
  ]);
});

test('loads user', async () => {
  render(<UserProfile userId="1" />);
  const name = await screen.findByText('Test User');
  expect(name).toBeInTheDocument();
});
```

### 3. Infrastructure Packages

#### @forge/ts-config - TypeScript Configurations

**Purpose**: Shared TypeScript configuration base

**Exports**:
- `base.json` - Base configuration
- `react.json` - React app configuration
- `app.json` - Application-specific

**Usage in App**:
```json
{
  "extends": "@forge/ts-config/app",
  "compilerOptions": {
    "paths": {
      "@forge/*": ["../../packages/*/src"]
    }
  }
}
```

#### @forge/eslint-config - ESLint Rules

**Purpose**: Shared linting rules

**Features**:
- TypeScript support (type-aware rules)
- React and React Hooks
- Accessibility checks
- Prettier integration

**Usage in App**:
```json
{
  "extends": "@forge/eslint-config"
}
```

## Creating a New Package

### Step 1: Create Directory Structure

```bash
mkdir -p packages/new-package/src
```

### Step 2: Create package.json

```json
{
  "name": "@forge/new-package",
  "version": "1.0.0",
  "description": "Description",
  "private": false,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc",
    "lint": "eslint src",
    "type-check": "tsc --noEmit",
    "test": "vitest"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

### Step 3: Create tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Step 4: Create src/index.ts

```typescript
export const myPackage = {
  // Exports
};
```

### Step 5: Update Root Configuration

Update `tsconfig.json` paths to include:
```json
{
  "paths": {
    "@forge/new-package": ["packages/new-package/src"],
    "@forge/new-package/*": ["packages/new-package/src/*"]
  }
}
```

## Import Guidelines

### Import Order

```typescript
// 1. React and third-party libraries
import React, { useState } from 'react';
import { create } from 'zustand';

// 2. Forge packages
import { Button } from '@forge/ui';
import { useAnalytics } from '@forge/analytics';

// 3. Local imports
import { Dashboard } from '@/components/Dashboard';
import { helper } from '@/utils/helper';
```

### Path Aliases

```typescript
// ✅ DO - Use aliases
import { Dialog } from '@forge/ui';
import { component } from '@/components/component';

// ❌ DON'T - Use relative paths from different roots
import { Dialog } from '../../../../packages/ui/src';

// ❌ DON'T - Cross-import from apps
import { Dashboard } from '@forge/dashboard'; // Not exported!
```

## Package Versioning

### Version Strategy

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features
- **Patch** (1.0.0 → 1.0.1): Bug fixes

### Publishing

```bash
# Use changesets for coordinated releases
pnpm changeset
pnpm version
pnpm publish
```

## Testing Packages

### Unit Tests

```bash
pnpm test --filter=@forge/ui
```

### Coverage

```bash
pnpm test:coverage --filter=@forge/ui
```

### Storybook (for @forge/ui)

```bash
pnpm dev:storybook  # Port 6006
```

## Dependency Management

### Workspace Dependencies

Always use `workspace:*` for monorepo packages:

```json
{
  "dependencies": {
    "@forge/ui": "workspace:*",
    "@forge/auth": "workspace:*"
  }
}
```

### External Dependencies

- Use pnpm catalogs for consistency
- Version constraints: `^1.2.3` (new features)
- Keep dependencies minimal
- Audit for vulnerabilities: `npm audit`

## Best Practices

1. **Clear Entry Points**: Export public API from `src/index.ts`
2. **Documentation**: Add JSDoc to public functions
3. **Type Safety**: No `any` types, strict mode enabled
4. **Testing**: 80%+ coverage for packages
5. **Accessibility**: Components accessible by default
6. **Bundle Size**: Monitor with `npm-check-bundlesize`
7. **Breaking Changes**: Document in CHANGELOG
8. **Peer Dependencies**: Specify clearly for shared libs

## Troubleshooting

### Package Not Found

Check path aliases in `tsconfig.json` and `vite.config.ts`

### Build Errors

```bash
pnpm type-check --filter=@forge/package
pnpm lint --filter=@forge/package
```

### Test Failures

Ensure MSW server initialized before tests

### Stale Cache

```bash
pnpm clean && pnpm install
turbo build --no-cache
```
