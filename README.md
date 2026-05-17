# forge-platform

A frontend platform engineering monorepo built with React 19, TypeScript, Turborepo, and pnpm workspaces.

## Architecture Overview

forge-platform is a carefully structured monorepo showcasing enterprise-grade frontend engineering practices. It demonstrates:

- **Scalable Monorepo Architecture**: Turborepo with task caching and parallel execution
- **Package Boundaries**: Clear separation of concerns with well-defined package ownership
- **Strict Typing**: TypeScript strict mode enforced across all packages
- **Shared Infrastructure**: Centralized tooling, config, and utilities
- **QA Automation**: Comprehensive testing pyramid (unit, integration, e2e, accessibility)
- **Engineering Documentation**: Storybook-driven patterns, recipes, and standards
- **Component Library**: Shared component and pattern system

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers for all apps
pnpm dev

# Start specific app
pnpm dev:dashboard      # http://localhost:3000
pnpm dev:playground     # http://localhost:3001

# Build all
pnpm build

# Run tests
pnpm test
pnpm test:coverage

# Run linting
pnpm lint
pnpm lint:fix

# Type checking
pnpm type-check
```

## Project Structure

```
forge-platform/
├── apps/
│   ├── dashboard/            # Reusable application patterns
│   ├── playground/           # Frontend engineering sandbox
│   └── storybook/            # Component library documentation
├── packages/
│   ├── ui/                   # Shared Radix UI component library
│   ├── testing/              # Testing utilities, mocks, fixtures
│   ├── auth/                 # Authentication & authorization layer
│   ├── analytics/            # PostHog analytics integration
│   ├── monitoring/           # Sentry error tracking & accessibility
│   ├── eslint-config/        # Shared ESLint configuration
│   └── ts-config/            # Shared TypeScript configurations
├── .github/workflows/        # CI/CD pipelines
├── tooling/scripts/          # Shared scripts and utilities
└── turbo.json                # Turborepo configuration
```

## Monorepo Dependency Graph

```
┌─────────────────────────────────────────────────────────┐
│                    Shared Packages                       │
├─────────────────────────────────────────────────────────┤
│  @forge/eslint-config │ @forge/ts-config               │
└───────────┬───────────────────────────┬──────────────────┘
            │                           │
┌───────────▼────────────┬──────────────▼─────────────────┐
│   Shared Utilities     │   Shared Components            │
├────────────────────────┼────────────────────────────────┤
│ @forge/testing         │  @forge/ui                     │
│ @forge/auth            │    └─ Radix UI components      │
│ @forge/analytics       │    └─ Tailwind CSS             │
│ @forge/monitoring      │    └─ Accessibility ready      │
└────────┬───────────────┴────────────┬────────────────────┘
         │                            │
    ┌────▼──────────────────┬─────────▼────────────┐
    │    Applications        │                     │
    ├───────────────────────┼─────────────────────┤
    │ dashboard             │ storybook           │
    │ playground            │ (engineering docs)  │
    └───────────────────────┴─────────────────────┘
```

## Package Boundaries

### Applications (apps/)

**dashboard**
- Reusable application shell and UI pattern examples
- Tables, forms, dialogs, feature flags, and accessibility patterns
- Uses: @forge/ui, @forge/auth, @forge/analytics, @forge/monitoring

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
