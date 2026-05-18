# forge-platform

A **frontend platform engineering system** with reusable UI patterns and QA infrastructure.

Instead of being a complex enterprise application, forge-platform is a **pattern library and architecture showcase** demonstrating modern frontend engineering practices.

## What Is Forge Platform?

Forge Platform is:

- ✅ A **reusable pattern library** for common UI problems
- ✅ **Storybook-driven development** with comprehensive documentation
- ✅ An **internal UI platform** for rapid application development
- ✅ A **testing and QA showcase** with Playwright, accessibility testing, and MSW
- ✅ **Architecture-first**: Reusable patterns > business logic


## Architecture Overview

forge-platform is a carefully structured monorepo showcasing frontend platform engineering practices:

- **Frontend Patterns**: AppShell, FilterableTable, SettingsForm, AsyncSection, ThemeSwitcher
- **Storybook Documentation**: Interactive pattern showcase with accessibility and dark mode
- **Thin App Demos**: Minimal integration examples showing pattern composition
- **QA Infrastructure**: Playwright fixtures, MSW handlers, accessibility helpers
- **Developer Experience**: TypeScript strict mode, clear package boundaries, comprehensive docs

## Quick Start

```bash
# Install dependencies
pnpm install

# Start all development servers
pnpm dev

# Start specific app
pnpm dev:dashboard      # http://localhost:3000 - Pattern showcase
pnpm dev:playground     # http://localhost:3001 - Resilience patterns
pnpm storybook          # http://localhost:6006 - Storybook documentation

# Build all packages
pnpm build

# Run tests
pnpm test
pnpm test:coverage
pnpm test:e2e

# Type checking and linting
pnpm type-check
pnpm lint
```

## Project Structure

```
forge-platform/
├── apps/
│   ├── dashboard/          # Pattern showcase (AppShell, FilterableTable, SettingsForm)
│   ├── playground/         # Resilience patterns (retry, async, realtime)
│   └── storybook/          # Storybook documentation of all patterns
├── packages/
│   ├── ui/                 # Reusable patterns library
│   │   ├── patterns/
│   │   │   ├── layouts/    # AppShell, PageContainer
│   │   │   ├── async/      # AsyncSection, error/loading states
│   │   │   ├── data/       # FilterableTable, MetricGrid
│   │   │   ├── forms/      # SettingsForm, ValidationSummary
│   │   │   └── ux/         # ThemeSwitcher, CommandPalette
│   │   ├── components/     # Primitives (Button, Input, Dialog)
│   │   ├── hooks/          # Custom hooks
│   │   └── tokens/         # Design tokens
│   ├── testing/            # QA infrastructure
│   │   ├── fixtures/       # Playwright fixtures
│   │   ├── handlers/       # MSW handlers
│   │   ├── factories/      # Mock data factories
│   │   └── helpers/        # Test utilities and a11y helpers
│   ├── auth/               # Authentication layer
│   ├── analytics/          # PostHog integration
│   ├── monitoring/         # Sentry and accessibility monitoring
│   ├── eslint-config/      # Shared ESLint rules
│   └── ts-config/          # Shared TypeScript configs
├── .github/workflows/      # CI/CD pipelines
└── turbo.json              # Turborepo configuration
```

## Core Concepts

### Patterns Over Components

Unlike a traditional component library, forge-platform focuses on **patterns** - composable solutions to recurring UI problems:

- **Primitive Components** (Input, Button, Dialog) - Basic building blocks
- **Patterns** (AppShell, FilterableTable, AsyncSection) - Reusable application structures
- **Integration Examples** (dashboard, playground) - How patterns compose together

### Storybook as Centerpiece

Storybook is the primary way to explore, test, and document patterns:

- **Interactive stories** for each pattern with all states
- **Accessibility audits** built into stories
- **Dark mode examples** for all components
- **Responsive behavior** showcase
- **Code examples** for copy-paste integration

### Thin Apps for Demonstration

The apps are **minimal integration demos**, not full-featured applications:

- **dashboard** - Shows AppShell, FilterableTable, SettingsForm, and basic CRUD
- **playground** - Shows resilience patterns: retry logic, async handling, realtime updates

Each app composes patterns from `@forge/ui` with minimal custom code.

### Testing as First-Class

`packages/testing` provides reusable QA infrastructure:

- Playwright fixtures for common scenarios
- MSW handlers for API mocking
- Accessibility testing helpers
- Mock factories for consistent test data
- Integration test utilities

## Monorepo Architecture

```
┌──────────────────────────────────────────────────────┐
│         Reusable Pattern Library (@forge/ui)         │
├───────────┬────────────┬──────────┬────────┬─────────┤
│ Layouts   │ Async      │ Data     │ Forms  │ UX      │
├───────────┴────────────┴──────────┴────────┴─────────┤
│  Primitives: Button, Input, Dialog, etc.            │
└───────────────────────┬────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    ┌───▼────────┐  ┌──▼──────────┐  ┌─▼──────────────┐
    │ Dashboard  │  │ Playground  │  │ Storybook Docs │
    │ (Patterns) │  │ (Resilience)│  │ (Showcase)     │
    └────────────┘  └─────────────┘  └────────────────┘
        Uses @forge/ui and @forge/testing
```

### Package Boundaries

#### `@forge/ui` - Pattern Library
Reusable frontend patterns organized by domain:

- **layouts** - AppShell, PageContainer
- **async** - AsyncSection, error/loading/empty states
- **data** - FilterableTable, MetricGrid, VirtualizedList
- **forms** - SettingsForm, FormSection, ValidationSummary
- **ux** - ThemeSwitcher, CommandPalette, FeatureFlagPanel

#### `@forge/testing` - QA Infrastructure
Reusable testing utilities and fixtures:

- Playwright fixtures for common app scenarios
- MSW request handlers and middleware
- Accessibility testing helpers
- Mock data factories
- Test utilities and assertions

#### `@forge/auth`, `@forge/analytics`, `@forge/monitoring`
Cross-cutting concerns shared by all apps

#### `apps/dashboard`, `apps/playground`, `apps/storybook`
Integration examples and documentation

## Usage Examples

### Using Patterns in an App

```tsx
import {
  AppShell,
  PageContainer,
  FilterableTable,
  AsyncSection,
  type Column,
} from '@forge/ui';

export function UserManagement() {
  const { data: users, isLoading, error } = useUsers();

  const columns: Column<User>[] = [
    { id: 'name', header: 'Name', accessor: (row) => row.name },
    { id: 'email', header: 'Email', accessor: (row) => row.email },
  ];

  return (
    <AppShell
      sidebar={<Navigation />}
      header={<Header />}
    >
      <PageContainer title="Users">
        <AsyncSection isLoading={isLoading} error={error}>
          <FilterableTable
            data={users}
            columns={columns}
            onFilter={handleFilter}
            onSort={handleSort}
          />
        </AsyncSection>
      </PageContainer>
    </AppShell>
  );
}
```

### Writing Tests with Testing Infrastructure

```tsx
import { test, expect } from '@playwright/test';
import { setupTestApp } from '@forge/testing/fixtures';
import { userFactory } from '@forge/testing/factories';

test('filter users by name', async ({ page }) => {
  const users = [
    userFactory.build({ name: 'Alice' }),
    userFactory.build({ name: 'Bob' }),
  ];

  await setupTestApp(page, { users });
  await page.fill('[placeholder="Search..."]', 'Alice');
  
  const rows = await page.locator('table tbody tr');
  expect(rows).toHaveCount(1);
});
```

## Development Standards

### Code Organization
- **Type Safety**: TypeScript strict mode across all packages
- **Package Isolation**: Each package has clear public API in `index.ts`
- **Component Colocati**on: Stories, tests, and components in same directory
- **Naming Conventions**: Patterns > Components > Utilities

### Testing
- **Unit Tests**: Vitest for component logic
- **Integration Tests**: Vitest for pattern composition
- **E2E Tests**: Playwright for real workflows
- **Accessibility**: Built into component stories and E2E tests
- **Coverage**: Aim for >80% coverage on patterns

### Documentation
- **Storybook Stories**: Every pattern has stories for all states
- **JSDoc Comments**: Public APIs documented with examples
- **README files**: High-level docs in each package
- **Code Comments**: Inline docs for complex logic

## Next Steps

1. **Explore Storybook** - Run `pnpm storybook` to see all patterns
2. **Check demo apps** - See pattern composition in `apps/dashboard` and `apps/playground`
3. **Review testing** - See QA patterns in `packages/testing`
4. **Try creating** - Use patterns to build a new feature
5. **Contribute** - Add new patterns following the established patterns

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:

- Creating new patterns
- Writing tests
- Documenting changes
- Code review process
- Commit conventions

**playground**
- Frontend engineering sandbox
- Realtime simulation, async boundaries, retry, and resilience patterns
- Uses: @forge/ui, @forge/analytics, @forge/monitoring

**storybook**
- Component library documentation and playground
- Isolated component development and testing
- Uses: @forge/ui

### Packages (packages/)

**@forge/ui** - Component Library
- Radix UI-based components
- Tailwind CSS styling
- Accessibility-first design (WCAG 2.1 AA)
- Zero application logic
- Exports: components, hooks, styles

**@forge/testing** - Testing Infrastructure
- Vitest utilities and RTL helpers
- MSW mock server setup
- Test fixtures and factories
- Common test patterns
- Re-exported for all consumers

**@forge/auth** - Authentication Layer
- Zustand-based auth store
- Session management
- JWT token handling
- User type definitions
- Login/logout logic

**@forge/analytics** - Event Tracking
- PostHog integration
- Event type definitions
- Custom hooks for tracking
- Event constants

**@forge/monitoring** - Error Tracking & A11y
- Sentry integration and setup
- Error classes and codes
- Accessibility testing utilities
- Axe testing integration

**@forge/eslint-config** - Lint Rules
- Shared ESLint configuration
- React, TypeScript, A11y plugins
- Consistent code style across monorepo

**@forge/ts-config** - TypeScript Configs
- Base, React, and App configurations
- Exported for consumer tsconfig.json extends

## Configuration Strategy

### Environment Variables

```bash
# Shared (.env)
VITE_APP_ENV=production
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=https://...@sentry.io/...
VITE_POSTHOG_KEY=phc_...

# App-specific (.env.local)
VITE_ADMIN_API_KEY=...
```

### Path Aliases

```typescript
// From any file in monorepo:
import { Button } from '@forge/ui';
import { useAnalytics } from '@forge/analytics';
import { render } from '@forge/testing';
import { useAuth } from '@forge/auth';

// Within apps:
import { Dashboard } from '@/components/Dashboard';
import { admin } from '@apps/admin/*';
```

### TypeScript Project References

```json
{
  "extends": "@forge/ts-config/app",
  "compilerOptions": {
    "paths": {
      "@forge/*": ["../../packages/*/src"],
      "@/*": ["./src/*"]
    }
  }
}
```

## CI/CD Pipeline

### Workflow Structure (`.github/workflows/ci.yml`)

1. **Lint** (runs first)
   - ESLint all packages
   - Type checking with TypeScript

2. **Test** (parallel with lint)
   - Unit and integration tests
   - Coverage reporting to Codecov
   - Vitest with jsdom environment

3. **Build** (depends on lint + test)
   - Builds all apps in parallel
   - Artifacts uploaded for deployment
   - Vite optimized builds

4. **E2E Tests** (depends on build)
   - Playwright tests across browsers
   - Chromium, Firefox, WebKit
   - Accessibility checks included

5. **Deploy** (main branch only)
   - Conditional deployment per app
   - Environment-specific configs
   - Rollback capabilities

### Turborepo Caching

- Task outputs cached globally
- `turbo.json` defines task dependencies
- Remote caching ready for CI integration
- Intelligent cache invalidation on dependency changes

## Development Workflow

### Adding a New Feature

1. Create feature branch: `git checkout -b feature/xyz`
2. Implement in relevant package/app
3. Run checks: `pnpm type-check && pnpm lint && pnpm test`
4. Build affected: `turbo build --filter=<changed-package>`
5. Test E2E: `pnpm test:e2e`
6. Submit PR with affected packages listed

### Adding a New Package

1. Create directory: `packages/new-package/`
2. Create `package.json` with `@forge/new-package` name
3. Create `tsconfig.json` extending `@forge/ts-config`
4. Add to `pnpm-workspace.yaml` (automatic)
5. Update path aliases in root `tsconfig.json`
6. Create `src/index.ts` as entry point

### Adding a New App

1. Create directory: `apps/new-app/`
2. Copy structure from existing app
3. Create `package.json`, `tsconfig.json`, `vite.config.ts`
4. Add to root `package.json` scripts
5. Configure dev server port (avoid conflicts)

## Testing Strategy

### Unit Tests
- Vitest for fast execution
- MSW for HTTP mocking
- RTL for component testing
- ~80% coverage target

### Integration Tests
- Multiple component interaction
- Store/state management
- API integration via MSW

### E2E Tests
- Playwright for full app testing
- Real browser testing (Chromium, Firefox, WebKit)
- Critical user journeys
- Performance monitoring

### Accessibility Tests
- Axe-core integration
- WCAG 2.1 AA compliance
- Automated CI checks
- Manual review for edge cases

## Performance Considerations

### Build Optimization
- Vite for fast development and production builds
- ES2020 as target (supports >98% browsers)
- Code splitting with Rollup
- Tree shaking for unused code

### Package Management
- pnpm for disk space efficiency (deduped node_modules)
- Workspace catalogs for dependency consistency
- Lock file for reproducible installs
- Peer dependency awareness

### Monorepo Optimization
- Turborepo for parallel task execution
- Incremental builds and tests
- Task caching across CI runs
- Smart dependency tracking

## Security Best Practices

- Strict TypeScript for type safety
- ESLint rules enforce best practices
- Environment variable management
- Dependency vulnerability scanning
- Code review process (PR checks)
- OWASP dependency audit
- Sentry for runtime error tracking

## Code Quality Gates

All PRs must pass:
- ✅ Type checking (tsc --noEmit)
- ✅ Linting (eslint)
- ✅ Unit tests (vitest)
- ✅ Build succeeds (vite build)
- ✅ No TypeScript errors

## Documentation

- [Architecture Decisions](./ARCHITECTURE.md)
- [Package Development Guide](./PACKAGES.md)
- [Testing Guide](./TESTING.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| **Language** | TypeScript 5.3+ (strict mode) |
| **React** | React 19 |
| **Build** | Vite 5, Turborepo |
| **Monorepo** | pnpm workspaces |
| **UI Components** | Radix UI + Tailwind CSS |
| **State** | Zustand, RTK Query |
| **Testing** | Vitest, RTL, Playwright |
| **Mocking** | MSW (Mock Service Worker) |
| **Linting** | ESLint, Prettier |
| **Error Tracking** | Sentry |
| **Analytics** | PostHog |
| **Accessibility** | Axe-core |
| **Component Docs** | Storybook 7 |

## Key Architectural Decisions

### Why Turborepo?
- Industry-standard for monorepo task orchestration
- Excellent DX with parallel execution and caching
- Minimal configuration required
- Works seamlessly with pnpm

### Why pnpm Workspaces?
- Significantly faster than npm/yarn
- Better disk space usage (deduped)
- Enforced peer dependency resolution
- Workspace catalogs for version consistency

### Why Radix UI?
- Unstyled, composable components
- Excellent accessibility out-of-box
- Minimal dependencies
- Works perfectly with Tailwind CSS

### Why Zustand?
- Lightweight state management
- No boilerplate
- TypeScript-friendly
- Perfect for cross-app shared state

### Package Boundaries Strategy
- Clear ownership and responsibility
- Minimize cross-package dependencies
- Enable independent versioning
- Reduce merge conflicts

## Next Steps

1. Install dependencies: `pnpm install`
2. Start development: `pnpm dev`
3. Run tests: `pnpm test`
4. Explore packages in isolation
5. Review ARCHITECTURE.md for deep dive

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

Proprietary - forge-platform
