# Monorepo Structure & Commands Reference

Complete reference for navigating and working with forge-platform monorepo.

## Directory Structure

```
forge-platform/
│
├── apps/                           # End-user applications
│   ├── admin-dashboard/            # Internal admin interface
│   │   ├── src/
│   │   ├── e2e/
│   │   ├── vite.config.ts
│   │   ├── vitest.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── analytics-dashboard/        # Analytics and reporting
│   │   └── [same structure]
│   ├── public-portal/              # Customer-facing app
│   │   └── [same structure]
│   └── storybook/                  # Component library docs
│       ├── .storybook/
│       └── [components from @forge/ui]
│
├── packages/                       # Shared libraries
│   ├── ui/                         # Component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   ├── vite.config.ts
│   │   └── package.json
│   ├── testing/                    # Testing utilities
│   │   ├── src/
│   │   │   ├── mocks/
│   │   │   ├── fixtures/
│   │   │   └── utils/
│   │   └── package.json
│   ├── auth/                       # Authentication
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   ├── providers/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── analytics/                  # Event tracking (PostHog)
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   ├── events/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── monitoring/                 # Error tracking & A11y (Sentry)
│   │   ├── src/
│   │   │   ├── sentry/
│   │   │   ├── errors/
│   │   │   ├── accessibility/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── eslint-config/              # Shared ESLint rules
│   │   ├── src/
│   │   └── package.json
│   └── ts-config/                  # Shared TypeScript configs
│       ├── base.json
│       ├── react.json
│       ├── app.json
│       └── package.json
│
├── .github/
│   └── workflows/                  # CI/CD pipelines
│       ├── ci.yml                  # Lint, test, build
│       └── deploy.yml              # Deploy to production
│
├── tooling/
│   └── scripts/                    # Development scripts
│       └── setup.sh                # Environment verification
│
├── Configuration files
│   ├── turbo.json                  # Turborepo config
│   ├── tsconfig.json               # Root TypeScript config
│   ├── package.json                # Monorepo root
│   ├── pnpm-workspace.yaml         # Workspace config
│   ├── .eslintrc.json              # Linting rules
│   ├── .prettierrc                 # Code formatting
│   ├── tailwind.config.js          # Design system
│   ├── postcss.config.js           # CSS processing
│   ├── vitest.config.ts            # Test runner config
│   ├── vitest.setup.ts             # Test setup
│   ├── playwright.config.ts        # E2E test config
│   ├── .npmrc                      # pnpm configuration
│   ├── .gitignore                  # Git ignore patterns
│   └── .env.example                # Example env vars
│
└── Documentation
    ├── README.md                   # Project overview
    ├── SETUP.md                    # Getting started
    ├── ARCHITECTURE.md             # Architecture decisions
    ├── PACKAGES.md                 # Package development
    ├── TESTING.md                  # Testing guide
    ├── CONTRIBUTING.md             # Contributing guide
    └── MONOREPO.md                 # This file
```

## Dependency Graph

### Package Dependencies

```
@forge/eslint-config  ←─ shared build config, no dependencies
@forge/ts-config      ←─ shared config, no dependencies

@forge/monitoring     ← Sentry, Axe
@forge/analytics      ← PostHog
@forge/auth           ← Zustand (state management)

@forge/testing        ← Vitest, RTL, MSW
                      ← (depends on all above for fixtures)

@forge/ui             ← Radix UI, Tailwind, clsx
                      ← (pure component library)

admin-dashboard       ← @forge/ui, @forge/auth, @forge/analytics, @forge/monitoring
analytics-dashboard   ← @forge/ui, @forge/analytics, @forge/monitoring
public-portal         ← @forge/ui, @forge/auth, @forge/monitoring

storybook             ← @forge/ui (only)
```

### Workspace Setup (pnpm-workspace.yaml)

```yaml
packages:
  - 'apps/*'        # All apps included as packages
  - 'packages/*'    # All packages included
```

Benefits:
- Single `pnpm install` installs everything
- Single lock file (pnpm-lock.yaml)
- Cross-package imports with path aliases
- Workspace: protocol for dependencies

## Commands Reference

### Installation

```bash
# Install all dependencies
pnpm install

# Install with frozen lock (CI)
pnpm install --frozen-lockfile

# Prefer offline cached packages
pnpm install --prefer-offline

# Install and link workspace packages
pnpm install --recursive
```

### Development

```bash
# Start all dev servers
pnpm dev

# Start specific app dev server
pnpm dev:admin          # http://localhost:3000
pnpm dev:analytics      # http://localhost:3001
pnpm dev:portal         # http://localhost:3002

# Start Storybook
pnpm dev:storybook      # http://localhost:6006
```

### Building

```bash
# Build all (except Storybook)
pnpm build

# Build everything including Storybook
pnpm build:all

# Build Storybook only
pnpm build:storybook

# Build specific package with Turborepo
turbo build --filter=@forge/ui
turbo build --filter=@forge/admin-dashboard

# Build and dependencies
turbo build --filter=...@forge/ui

# No cache
turbo build --no-cache
```

### Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# Test specific package
pnpm test --filter=@forge/ui

# E2E tests
pnpm test:e2e

# E2E with UI
pnpm exec playwright test --ui

# E2E debug
pnpm exec playwright test --debug
```

### Linting & Formatting

```bash
# Run ESLint
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check if formatted
pnpm format:check

# Type checking
pnpm type-check

# Type check specific package
pnpm type-check --filter=@forge/auth
```

### Turborepo Commands

```bash
# Run task in dependency order
turbo build

# Run task only in affected packages
turbo build --only-affected

# Verbose output
turbo build --verbose

# No cache
turbo build --no-cache

# Visualize dependency graph
turbo build -- --graph

# Run in parallel (default)
turbo build --parallel

# Sequential execution
turbo build --no-daemon

# Prune monorepo (for CI optimization)
turbo prune --scope=@forge/admin-dashboard
```

### Dependency Management

```bash
# Check for outdated dependencies
pnpm outdated

# Update interactively
pnpm update --interactive --latest

# Add dependency to package
pnpm add react --filter=@forge/ui

# Add to monorepo root (dev)
pnpm add -w -D eslint

# Remove dependency
pnpm remove lodash --filter=@forge/ui

# Check dependency conflicts
pnpm dedupe

# Check monorepo dependencies
pnpm deps:check

# Visualize dependency graph
pnpm deps:visualize
```

### Cleaning

```bash
# Clean build artifacts
pnpm clean

# Clean everything including node_modules
pnpm clean:dist

# Remove all build outputs
turbo clean
```

### Monorepo-Specific

```bash
# Check if package is in monorepo
pnpm list @forge/ui

# List all workspace packages
pnpm ls --depth=0

# Run script in package
pnpm --filter=@forge/ui test

# Run script in multiple packages
pnpm --filter='./packages/*' test

# Filter examples
pnpm --filter @forge/ui             # Exact package
pnpm --filter @forge/admin-*        # Glob pattern
pnpm --filter ...@forge/ui          # Include dependents
```

## Scripts Explained

### Root package.json Scripts

```bash
# Development
pnpm dev              # Start all dev servers
pnpm dev:admin        # Start specific app
pnpm dev:analytics
pnpm dev:portal

# Building
pnpm build            # Build all (except Storybook)
pnpm build:all        # Build including Storybook
pnpm build:storybook  # Storybook only

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # Coverage report
pnpm test:e2e         # E2E tests

# Code Quality
pnpm lint             # ESLint check
pnpm lint:fix         # Auto-fix
pnpm type-check       # TypeScript check
pnpm format           # Format code
pnpm format:check     # Check formatting

# Monorepo
pnpm clean            # Clean build outputs
pnpm clean:dist       # Clean dist folders
pnpm deps:check       # Check dependencies
pnpm deps:visualize   # Graph visualization
```

## Turborepo Task Definition (turbo.json)

```json
{
  "tasks": {
    "build": {
      "outputs": ["dist/**"],
      "cache": true,
      "dependsOn": ["^build"]  // Wait for dependencies
    },
    "test": {
      "cache": true,
      "outputs": ["coverage/**"],
      "dependsOn": ["^build"]
    },
    "lint": {
      "cache": true,
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,           // Never cache dev
      "interactive": true       // Keep interactive
    }
  }
}
```

**Task Dependencies**:
- `^build` - Build dependencies first, then this package
- `build` - Build this package
- `[]` - No dependencies

## Workspace Protocols

### workspace:* (Fixed)

```json
{
  "dependencies": {
    "@forge/ui": "workspace:*"   // Links to current version
  }
}
```

When published:
```json
{
  "@forge/ui": "1.0.0"  // Replaced with actual version
}
```

### workspace:^ (Caret)

```json
{
  "dependencies": {
    "@forge/ui": "workspace:^"   // Allows patch updates
  }
}
```

## pnpm Configuration (.npmrc)

```
shamefully-hoist=false          # Keep node_modules isolated
strict-peer-dependencies=true   # Strict peer dep checking
auto-install-peers=true         # Auto-install peer deps

# Public hoist patterns (tools needed globally)
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
```

## Common Workflows

### Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/new-component

# 2. Make changes to ui package
# Edit: packages/ui/src/components/NewComponent.tsx

# 3. Run tests locally
pnpm test --filter=@forge/ui

# 4. Build to verify
turbo build --filter=@forge/ui

# 5. Check everything
pnpm lint && pnpm type-check && pnpm test

# 6. Commit and push
git add .
git commit -m "feat(ui): Add NewComponent"
git push origin feature/new-component

# 7. Create PR
# ...CI runs all checks...
```

### Adding App Feature

```bash
# 1. Make changes to app
# Edit: apps/admin-dashboard/src/...

# 2. Test locally
pnpm dev:admin
# Visit http://localhost:3000

# 3. Run tests
turbo test --filter=@forge/admin-dashboard

# 4. E2E tests
pnpm test:e2e

# 5. Build
turbo build --filter=@forge/admin-dashboard

# 6. Verify no regressions
pnpm lint && pnpm type-check
```

### Adding New Package

```bash
# 1. Create directory and files
mkdir packages/new-package
cd packages/new-package
# Create: package.json, tsconfig.json, src/index.ts

# 2. Update root tsconfig.json paths
# Add: "@forge/new-package": ["packages/new-package/src"]

# 3. Install
pnpm install

# 4. Use in apps
# In apps: import { ... } from '@forge/new-package'

# 5. Test
pnpm test --filter=@forge/new-package
```

### Dependency Updates

```bash
# 1. Check for updates
pnpm outdated

# 2. Update interactively
pnpm update --interactive --latest

# 3. Run full test suite
pnpm test

# 4. Type check
pnpm type-check

# 5. Commit
git add .
git commit -m "chore: Update dependencies"
```

## CI/CD Pipeline Integration

### GitHub Actions Workflow

```yaml
- name: Install dependencies
  run: pnpm install --frozen-lockfile

- name: Lint
  run: pnpm lint

- name: Type check
  run: pnpm type-check

- name: Test
  run: pnpm test

- name: Build
  run: turbo build

- name: E2E tests
  run: pnpm test:e2e
```

All affected packages are automatically tested.

## Performance Optimization

### Caching Strategy

Turborepo caches:
- Task outputs (if `cache: true` in turbo.json)
- Generated files (dist/, .next/)
- Test coverage

Cache hit saves time in:
- CI/CD pipelines
- Local development
- Team collaboration

### Remote Caching

For CI/CD optimization:

```bash
# Enable Turborepo remote caching
turbo link
turbo build --remote-only
```

## Troubleshooting

### Package Not Found

```bash
# Verify path alias in tsconfig.json
grep "@forge/ui" tsconfig.json

# Check package exports
cat packages/ui/package.json | grep exports
```

### Build Failures

```bash
# Clear cache
turbo build --no-cache

# Run with verbose output
turbo build --verbose

# Type check specific package
pnpm type-check --filter=@forge/ui
```

### Test Failures

```bash
# Run single test
pnpm test Button.test.tsx

# Debug mode
pnpm test -- --inspect-brk
```

### Dependency Conflicts

```bash
# Check peer dependencies
pnpm ls

# Deduplicate
pnpm dedupe

# Reinstall
pnpm install --force
```

## Best Practices

1. ✅ Always use `workspace:*` for monorepo packages
2. ✅ Keep packages focused (single responsibility)
3. ✅ Update pnpm and Node regularly
4. ✅ Use turbo filtering for large monorepos
5. ✅ Monitor monorepo size (consider splitting if 100+ packages)
6. ✅ Use consistent patterns across packages
7. ✅ Document package dependencies clearly
8. ✅ Test all affected packages before merging

## Resources

- [Turborepo Docs](https://turbo.build)
- [pnpm Documentation](https://pnpm.io)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [npm Workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
