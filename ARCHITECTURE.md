# Architecture Decisions & Rationale

## High-Level Architecture

forge-platform follows a **modular monorepo architecture** with clear separation between:

1. **Applications** - End-user facing products
2. **Shared Packages** - Reusable utilities and infrastructure
3. **Tooling** - Build, lint, and development utilities

This architecture enables:
- Rapid feature development with code sharing
- Independent app scaling and deployment
- Shared quality standards across all products
- Clear ownership and responsibility boundaries

## Key Design Decisions

### 1. Monorepo vs. Multi-Repo

**Decision**: Single monorepo using pnpm workspaces + Turborepo

**Rationale**:
- **Code Sharing**: Common UI components, utilities, and services benefit all apps
- **Dependency Consistency**: Single lock file prevents version conflicts
- **Simplified Development**: One `pnpm install`, one build pipeline
- **Easier Refactoring**: Large-scale changes across packages are simpler
- **Type Safety**: TypeScript project references enable strict cross-package typing

**Trade-offs**:
- Monorepo adds complexity vs. single app
- All packages in one repository (mitigated by clear boundaries)
- Shared CI/CD pipeline (partially mitigated by task filtering)

### 2. Package Boundaries Strategy

**Decision**: Four types of packages with explicit responsibilities

**Types**:
1. **Applications** (apps/) - Complete, deployable products
2. **Platform Packages** (packages/) - Reusable domain logic
3. **Infrastructure** (packages/) - Build/lint configuration
4. **Testing** (packages/) - QA utilities and fixtures

**Rationale**:
- Clear ownership prevents ownership ambiguity
- Reduces coupling between unrelated domains
- Enables independent versioning and deployment
- Facilitates team scaling (teams own packages)
- Reduces merge conflicts

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
