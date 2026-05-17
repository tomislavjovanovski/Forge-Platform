# Frontend Platform Engineering Architecture

forge-platform is a **frontend platform engineering system** - a monorepo that prioritizes **reusable patterns, strong architecture, and developer experience** over business domain complexity.

## Design Philosophy

### What We Build

✅ **Reusable patterns** - AppShell, FilterableTable, AsyncSection, etc.
✅ **Storybook documentation** - Interactive pattern showcase
✅ **QA infrastructure** - Testing utilities, fixtures, helpers
✅ **Architecture examples** - Thin apps demonstrating pattern composition
✅ **Developer experience** - Strong typing, clear boundaries, comprehensive docs

### What We Don't Build

❌ **Complex business logic** - RBAC systems, audit logs, notification centers
❌ **Fake SaaS features** - CRM workflows, complex domain models
❌ **Enterprise workflows** - Multi-tenant systems, approval chains
❌ **Heavy domain modeling** - This is NOT a business application

## Core Architecture

### 1. Pattern-First Development

Unlike component libraries, forge-platform is **pattern-first**:

```
Primitive Components (Button, Input, Dialog)
    ↓
    ├─ Patterns (AppShell, FilterableTable, AsyncSection)
    │   ├─ Layout Patterns (Sidebar, Header composition)
    │   ├─ Data Patterns (Tables, Grids, Lists)
    │   ├─ Async Patterns (Loading, Error, Empty states)
    │   ├─ Form Patterns (Settings forms, Validation)
    │   └─ UX Patterns (Theme switcher, Command palette)
    ↓
Integration Apps (Dashboard, Playground)
    ├─ Pattern composition examples
    ├─ Real-world usage demonstrations
    └─ Minimal custom code
```

**Rationale**:
- Patterns solve recurring problems, not just styled components
- Composable solutions scale to complex UIs
- Patterns can be documented and tested comprehensively
- Clear value proposition for other teams
- Easier to maintain than many individual components

### 2. Storybook as the Primary Product

Storybook is not an afterthought - it's the **primary way to use forge-platform**:

```
User Workflow:
1. Open Storybook
2. Find pattern that matches their needs
3. Review interactive examples and states
4. Copy pattern into their app
5. Import from @forge/ui
```

**Each pattern story includes**:
- Default state
- All state variations (loading, error, empty, success)
- Dark mode example
- Responsive behavior
- Accessibility notes
- Interaction examples
- Code snippets for copy-paste

### 3. Thin Integration Apps

The apps (`dashboard`, `playground`) are **minimal demos**, not full products:

- **dashboard** (500 LOC) - Shows AppShell, FilterableTable, SettingsForm
- **playground** (400 LOC) - Shows resilience patterns and async handling
- **storybook** - Comprehensive pattern documentation

**Why minimal?**
- Demonstrates pattern composition without noise
- Easy to understand and modify
- Focuses on architecture, not business logic
- Serves as reference implementation
- Low maintenance burden

### 4. Testing as Infrastructure

`packages/testing` provides reusable QA infrastructure:

```
@forge/testing/
├── fixtures/         - Playwright fixtures for common scenarios
├── handlers/         - MSW handlers for API mocking
├── factories/        - Mock data generators
├── accessibility/    - A11y testing helpers
└── utilities/        - Common test assertions
```

Used by:
- Component tests in `packages/ui`
- App tests in `apps/*/`
- E2E tests in Playwright

**Philosophy**: Testing patterns are as important as UI patterns.

## Package Structure

### `packages/ui/` - Pattern Library

```
packages/ui/
├── src/
│   ├── patterns/
│   │   ├── layouts/      # AppShell, PageContainer
│   │   ├── async/        # AsyncSection, error boundaries
│   │   ├── data/         # FilterableTable, MetricGrid
│   │   ├── forms/        # SettingsForm, ValidationSummary
│   │   └── ux/           # ThemeSwitcher, CommandPalette
│   ├── components/       # Primitives: Button, Input, Dialog
│   ├── hooks/            # useDialog, custom hooks
│   ├── tokens/           # Design tokens (spacing, colors)
│   └── utils/            # cn(), utility functions
├── tsconfig.json
├── package.json
└── vite.config.ts        # For building components
```

**Export Structure**:
```tsx
// Patterns
import { AppShell, FilterableTable, AsyncSection } from '@forge/ui';

// Primitives
import { Button, Input, Dialog } from '@forge/ui';

// Types
import type { Column, FormField } from '@forge/ui';

// Utilities
import { cn } from '@forge/ui';
```

### `packages/testing/` - QA Infrastructure

```
packages/testing/
├── src/
│   ├── fixtures/
│   │   └── playwright.ts  # App fixtures for E2E
│   ├── handlers/
│   │   ├── auth.ts        # MSW auth handlers
│   │   ├── users.ts       # MSW user handlers
│   │   └── server.ts      # MSW server setup
│   ├── factories/
│   │   ├── user.ts        # User factory
│   │   ├── role.ts        # Role factory
│   │   └── index.ts       # All factories
│   ├── accessibility/
│   │   ├── audit.ts       # a11y audit helpers
│   │   └── rules.ts       # Custom a11y rules
│   ├── utilities/
│   │   ├── assertions.ts  # Custom assertions
│   │   └── helpers.ts     # Test helpers
│   └── index.ts           # Main exports
└── package.json
```

**Usage Examples**:

```tsx
// E2E test
import { test, expect } from '@playwright/test';
import { setupTestApp } from '@forge/testing/fixtures';

test('filter users', async ({ page }) => {
  await setupTestApp(page, { users: [...] });
  // Test code...
});

// Unit test with mocked data
import { userFactory } from '@forge/testing/factories';

test('renders user name', () => {
  const user = userFactory.build({ name: 'Alice' });
  render(<UserCard user={user} />);
  expect(screen.getByText('Alice')).toBeInTheDocument();
});
```

### `apps/dashboard/` - Pattern Showcase

```
apps/dashboard/
├── src/
│   ├── App.tsx             # Main app (~200 LOC)
│   ├── main.tsx            # Entry point
│   ├── index.css            # Tailwind styles
│   └── vite.config.ts
└── package.json
```

**What it demonstrates**:
- AppShell layout pattern
- FilterableTable data pattern
- SettingsForm form pattern
- AsyncSection state pattern
- ThemeSwitcher UX pattern
- Responsive behavior
- Dark mode

**Code ratio**:
- 80% pattern usage (`@forge/ui`)
- 20% custom composition
- No business logic

### `apps/playground/` - Resilience Patterns

```
apps/playground/
├── src/
│   ├── App.tsx             # Main app (~300 LOC)
│   ├── main.tsx
│   ├── index.css
│   └── vite.config.ts
└── package.json
```

**What it demonstrates**:
- WebSocket/realtime patterns
- Retry with exponential backoff
- Async boundary handling
- Skeleton loaders
- Optimistic updates
- Connection status tracking
- Error recovery

### `apps/storybook/` - Pattern Documentation

```
apps/storybook/
├── stories/
│   ├── patterns-overview.mdx     # Pattern guide
│   ├── appshell.stories.tsx      # AppShell story
│   ├── filterabletable.stories.tsx  # Table story
│   ├── settingsform.stories.tsx  # Form story
│   ├── asyncsection.stories.tsx  # Async story
│   ├── themeswitcher.stories.tsx # UX story
│   └── ...other stories
├── .storybook/
│   ├── main.ts                   # Storybook config
│   └── preview.ts                # Global decorators
└── package.json
```

**Features**:
- 30+ interactive stories
- Accessibility audit
- Dark mode showcase
- Responsive preview
- Code snippets
- Interaction tests

## Design Principles

### 1. Composition Over Inheritance

Patterns are built from smaller patterns and primitives:

```tsx
// ✅ Good: Composable patterns
<AppShell
  sidebar={<Sidebar />}
  header={<Header />}
>
  <PageContainer title="Users">
    <AsyncSection isLoading={loading} error={error}>
      <FilterableTable data={users} columns={columns} />
    </AsyncSection>
  </PageContainer>
</AppShell>

// ❌ Bad: Monolithic component
<SuperDashboard
  users={users}
  isLoading={loading}
  error={error}
  showSidebar={true}
  sidebarContent={sidebar}
  // ...30 more props
/>
```

### 2. Props Over Config Objects

Patterns accept flexible props, not large config objects:

```tsx
// ✅ Good: Clear, type-safe props
<FilterableTable
  data={users}
  columns={columns}
  onFilter={handleFilter}
  onSort={handleSort}
  showRowNumbers
/>

// ❌ Bad: Hidden config
<Table
  config={{
    data: users,
    columns,
    handlers: { filter, sort },
    options: { showRowNumbers: true }
  }}
/>
```

### 3. Accessibility First

All patterns follow WCAG 2.1 Level AA:
- Keyboard navigation
- Proper ARIA labels
- Focus management
- Color contrast
- Screen reader support

### 4. Dark Mode Support

All patterns support dark mode via Tailwind's `dark:` prefix:

```tsx
// ✅ All patterns support dark mode
<div className="bg-white dark:bg-slate-900">
  <span className="text-slate-900 dark:text-slate-50">Text</span>
</div>
```

### 5. Responsive Design

Mobile-first approach:

```tsx
// ✅ Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Single column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## Data Flow in Patterns

### Props-Based (Recommended)

```tsx
function MyComponent() {
  const [data, setData] = useState([]);

  return (
    <FilterableTable
      data={data}
      columns={columns}
      onFilter={handleFilter}
    />
  );
}
```

**Advantages**:
- Simple and predictable
- Works with any state management
- Easy to test
- Clear data flow

### With React Query

```tsx
function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <AsyncSection isLoading={isLoading} error={error}>
      <FilterableTable data={data} columns={columns} />
    </AsyncSection>
  );
}
```

### With Zustand

```tsx
function MyComponent() {
  const { users, loading } = useStore((s) => ({
    users: s.users,
    loading: s.loading,
  }));

  return (
    <AsyncSection isLoading={loading}>
      <FilterableTable data={users} columns={columns} />
    </AsyncSection>
  );
}
```

All approaches work seamlessly with patterns.

## Testing Strategy

### Unit Tests (Vitest)
Test individual patterns in isolation:

```tsx
test('FilterableTable filters data', () => {
  render(
    <FilterableTable
      data={mockUsers}
      columns={columns}
      onFilter={handleFilter}
    />
  );
  // Assert behavior
});
```

### Integration Tests (Vitest)
Test pattern composition:

```tsx
test('AppShell with FilterableTable', () => {
  render(
    <AppShell sidebar={<Nav />} header={<Header />}>
      <FilterableTable data={users} columns={columns} />
    </AppShell>
  );
  // Assert interaction
});
```

### E2E Tests (Playwright)
Test real user workflows with fixtures:

```tsx
test('filter and sort users', async ({ appPage }) => {
  await appPage.goto('/users');
  await appPage.filterTable('Alice');
  await appPage.sortByColumn('name');
  // Assert final state
});
```

### Accessibility Tests
Built into Storybook stories and E2E tests:

```tsx
test('AsyncSection is accessible', async () => {
  const { container } = render(<AsyncSection />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Performance Considerations

### Code Splitting
Patterns are exported individually for tree-shaking:

```tsx
// ✅ Only imports AppShell
import { AppShell } from '@forge/ui';

// ❌ Would import entire library
import * as UI from '@forge/ui';
```

### Bundle Size
Target: <15KB gzipped for entire pattern library

```
AppShell: 2.5KB
FilterableTable: 3.2KB
SettingsForm: 2.8KB
AsyncSection: 1.5KB
ThemeSwitcher: 1.2KB
Other patterns: 3.8KB
Total: ~15KB gzipped
```

### Virtualization
Data patterns support virtualization for large datasets:

```tsx
<VirtualizedTable
  data={1000000} // 1M rows
  columns={columns}
  rowHeight={40}
  visibleRows={20}
/>
```

## CI/CD & Deployment

### Build Pipeline (Turborepo)
```bash
$ pnpm build
→ @forge/ui builds (tsc)
→ @forge/testing builds (tsc)
→ Apps build (vite)
→ Storybook builds (sb build)
```

### Test Pipeline
```bash
$ pnpm test
→ Unit tests (vitest)

$ pnpm test:e2e
→ E2E tests (playwright)
```

### Linting & Type Checking
```bash
$ pnpm lint
→ ESLint with shared config

$ pnpm type-check
→ TypeScript strict mode
```

## Future Roadmap

### Phase 1 (Current)
- ✅ Core patterns (AppShell, Table, Form, AsyncSection)
- ✅ Storybook documentation
- ✅ Basic QA infrastructure
- ✅ Two demo apps

### Phase 2
- 🔄 Advanced data patterns (MetricGrid, VirtualizedList)
- 🔄 Advanced form patterns (MultiStep, DynamicFields)
- 🔄 Advanced async patterns (RetryBoundary, SuspenseBoundary)
- 🔄 Expanded testing helpers

### Phase 3
- ⏳ Real-time patterns (RealtimePanel, StreamingData)
- ⏳ More UX patterns (CommandPalette, SearchUI)
- ⏳ Analytics integration examples
- ⏳ Monitoring integration examples

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Adding new patterns
- Writing tests
- Updating documentation
- Code review process

**Boundaries Enforced by**:
- TypeScript project references (strict imports)
- ESLint rules (if needed via custom plugins)
- Package.json dependencies (explicit public APIs)
- Documentation (PACKAGES.md)

### 3. Strict TypeScript Configuration

**Decision**: TypeScript strict mode + additional strictness flags

**Rationale**:
- **Type Safety**: Catches 15-20% of bugs at compile time
- **Maintainability**: Easier to refactor with confidence
- **Self-Documentation**: Types serve as inline documentation
- **Enterprise Standard**: Expected in production codebases

**Configuration**:
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitOverride": true,
  "noUncheckedIndexedAccess": true
}
```

**Cost**: Slightly longer development time initially, but pays off in maintenance

### 4. Radix UI + Tailwind CSS for Components

**Decision**: Headless components + utility-first CSS

**Rationale**:

**Radix UI**:
- Unstyled primitive components
- Excellent accessibility (WCAG 2.1 AA)
- Zero styling dependencies
- Perfect for Tailwind integration
- Composable and extendable

**Tailwind CSS**:
- Utility-first approach prevents CSS bloat
- Type-safe with IntelliSense
- Excellent PurgeCSS integration for bundle size
- Consistent design system via config
- High productivity (no context switching)

**Alternative Considered**: Material-UI, Chakra UI
- Material-UI: Too opinionated, heavier bundle
- Chakra UI: Good alternative, but Radix more performant

### 5. Zustand for State Management

**Decision**: Lightweight Zustand over Redux/MobX

**Rationale**:
- **Simplicity**: ~1KB, zero boilerplate
- **Type Safety**: Perfect TypeScript support
- **DevTools**: Browser extension support
- **Middleware**: persist, immer, etc. available
- **Scalability**: Works from simple to complex stores

**Usage Pattern**:
```typescript
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: 'auth-store' }
  )
);
```

**When to Consider Redux**: If action history, time-travel debugging becomes critical

### 6. Vitest for Unit/Integration Testing

**Decision**: Vitest over Jest for local tests

**Rationale**:
- **Speed**: ESM-native, faster than Jest
- **Compatibility**: Drop-in Jest replacement
- **Vite Integration**: Uses same config as build
- **TypeScript**: Native TS support without babel-jest
- **Watch Mode**: Faster in development

**Testing Pyramid**:
```
         E2E (Playwright)           10%
    Integration Tests (Vitest)     30%
      Unit Tests (Vitest)          60%
```

### 7. Playwright for E2E Testing

**Decision**: Playwright over Cypress/Selenium

**Rationale**:
- **Multi-browser**: Chromium, Firefox, WebKit from same codebase
- **Reliability**: No flakiness issues common with Cypress
- **Performance**: Fast execution
- **API**: Modern, intuitive, well-documented
- **CI-Ready**: Excellent GitHub Actions integration

**E2E Test Categories**:
1. Critical user journeys (signup, payment, etc.)
2. Cross-browser compatibility
3. Performance benchmarks
4. Accessibility automated checks

### 8. MSW for API Mocking

**Decision**: Mock Service Worker over alternative mocking strategies

**Rationale**:
- **Browser API Interception**: Works at network level
- **Isomorphic**: Same mocks in browser and Node.js
- **Realistic**: Mocks real HTTP layer
- **Maintainability**: Decoupled from component code
- **Dev Experience**: Works in Storybook seamlessly

**Usage**:
```typescript
const handlers = [
  http.get('/api/users', () => HttpResponse.json(users))
];
const server = setupServer(...handlers);
```

### 9. Sentry for Error Tracking

**Decision**: Sentry for production error tracking

**Rationale**:
- **Real-time Alerts**: Know about errors before users
- **Source Maps**: Stack traces map to original code
- **User Context**: Who experienced the error
- **Breadcrumbs**: Leading up to error
- **Performance Monitoring**: Beyond errors
- **Pricing**: Free tier sufficient for startups

**Implementation**:
- Initialized in app entry point
- React Error Boundary integration
- Custom error capture for API errors

### 10. PostHog for Product Analytics

**Decision**: PostHog over Mixpanel/Amplitude

**Rationale**:
- **Open Source**: Can self-host if needed
- **Event Semantics**: Flexible event tracking
- **Product Insights**: Funnels, retention, cohorts
- **Pricing**: More generous free tier
- **Privacy**: Better GDPR/privacy defaults

**Event Types**:
- Page views (tracked automatically)
- User actions (clicks, form submissions)
- Feature usage
- Errors and performance metrics

### 11. Turborepo for Build Orchestration

**Decision**: Turborepo for monorepo task management

**Rationale**:
- **Speed**: Intelligent task scheduling and caching
- **Incremental**: Only rebuild changed packages
- **Distributed**: Ready for distributed caching
- **DX**: Minimal configuration
- **Visibility**: Clear task dependencies and execution order

**Task Graph**:
```
lint (all packages) ──┐
                      ├─→ build (all packages) ──→ deploy
test (all packages) ──┘
```

### 12. pnpm Workspaces

**Decision**: pnpm over npm/yarn for workspace management

**Rationale**:
- **Performance**: 3-5x faster than npm/yarn
- **Disk Space**: Deduped node_modules
- **Dependency Integrity**: Strict peer dependency resolution
- **Catalogs**: Version consistency without repetition
- **Lock File**: Fast, deterministic installs

**Workspace Structure**:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

## Infrastructure Decisions

### TypeScript Configuration Strategy

**Decision**: Shared base config with app/package overrides

**Why**:
- Consistency across monorepo
- Easy to update standards
- Package-specific overrides when needed

**Hierarchy**:
```
base.json (strictest)
├─ react.json (+ JSX)
└─ app.json (+ module targets)
```

### ESLint Configuration

**Decision**: Shared configuration package

**Included**:
- TypeScript rules (type-aware)
- React best practices
- React Hooks rules
- Accessibility (jsx-a11y)
- Prettier integration (no formatting conflicts)

### Environment Variables

**Decision**: App-level .env files with VITE_ prefix

**Rationale**:
- Vite exposes only VITE_ prefixed vars (security)
- Can be committed (no secrets, use CI secrets)
- Type-safe via generated types
- Build-time constants (fully replaced)

## Testing Strategy Decisions

### Unit Tests
- **Colocation**: Tests next to source
- **Pattern**: `Component.test.tsx`
- **Coverage**: 80%+ target
- **Mocks**: MSW for API calls

### Integration Tests
- **What**: Multiple components + state
- **How**: Render with providers, MSW
- **Examples**: Form submission flows

### E2E Tests
- **Frequency**: Critical paths only
- **Environment**: Real backend (or MSW)
- **Browsers**: Chromium (primary), Firefox, Safari

### Accessibility Tests
- **Automated**: Axe-core for detection
- **Frequency**: Per component, per page
- **Manual**: Keyboard, screen reader testing

## Deployment Strategy

### Separate Apps, Shared Dependencies

**Decision**: Each app independently deployable

**Benefits**:
- Different deployment schedules
- Independent rollback capability
- Canary deployments per app
- Separate feature flags per app

**Shared State**:
- Deployed to shared backend API
- Cross-app auth via single session

## Security Decisions

### No Secrets in Repository

**Decision**: All secrets in CI/CD secrets or env

**Implementation**:
- `.env` committed (public values)
- `.env.local` gitignored
- CI injects secrets at build time

### Dependency Security

**Decision**: Regular scanning and updates

**Tools**:
- Dependabot for automated PRs
- npm audit for vulnerabilities
- Snyk or npm audit in CI

### Cross-Site Scripting (XSS) Protection

- React's built-in HTML escaping
- CSP headers in app servers
- No dangerouslySetInnerHTML without validation

## Performance Decisions

### Code Splitting

**Decision**: App-level splitting, shared packages as one bundle

**Why**:
- Route-based splitting reduces initial bundle
- Shared packages = common denominator
- Lazy load features, not packages

### Asset Optimization

- Images: Vite handles via Rollup
- Fonts: Custom subset, preload critical
- CSS: Purged by Tailwind (only used classes)

## Documentation Decisions

### Markdown Over Wiki

**Decision**: Docs in git (versioned with code)

**Benefits**:
- Version with code changes
- Code review for doc updates
- Easy diffs and history
- Offline accessible

## Future Considerations

### When to Consider Multi-Repo
- If apps become truly independent
- Different release cycles needed
- Teams want independent ownership
- Monorepo size becomes unmanageable

### Scaling Considerations
- Distributed task caching (Turborepo Remote Caching)
- Nx Cloud for additional insights
- Dependency graph visualization
- Package versioning strategy (semver)
