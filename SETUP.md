# Getting Started with forge-platform

## Prerequisites

- **Node.js**: 20+ ([download](https://nodejs.org/))
- **pnpm**: 9+ (`npm install -g pnpm`)
- **Git**: 2.0+ ([download](https://git-scm.com/))

## First Time Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd forge-platform
```

### 2. Verify Environment

```bash
bash tooling/scripts/setup.sh
```

This checks:
- ✓ Node 20+
- ✓ pnpm 9+
- ✓ Dependencies installed
- ✓ TypeScript compilation

### 3. Install Dependencies

```bash
pnpm install
```

This installs all dependencies for the monorepo using pnpm workspaces.

## Development

### Start Development Servers

#### All Apps

```bash
pnpm dev
```

Opens:
- Admin Dashboard: http://localhost:3000
- Analytics Dashboard: http://localhost:3001
- Public Portal: http://localhost:3002

#### Specific App

```bash
pnpm dev:admin         # Admin dashboard
pnpm dev:analytics     # Analytics dashboard
pnpm dev:portal        # Public portal
```

#### Storybook (Component Library)

```bash
pnpm dev:storybook     # http://localhost:6006
```

Browse and develop components in isolation with live reload.

## Testing

### Run All Tests

```bash
pnpm test
```

### Watch Mode

```bash
pnpm test:watch
```

Great for TDD - automatically re-runs tests on file changes.

### Coverage Report

```bash
pnpm test:coverage
open coverage/index.html
```

### E2E Tests

```bash
pnpm test:e2e

# With UI
pnpm exec playwright test --ui

# Debug mode
pnpm exec playwright test --debug
```

## Code Quality

### Type Checking

```bash
pnpm type-check
```

Checks TypeScript without building.

### Linting

```bash
pnpm lint           # Check for issues
pnpm lint:fix       # Auto-fix issues
```

### Formatting

```bash
pnpm format         # Format all files
pnpm format:check   # Check if formatted
```

## Building

### Build Everything

```bash
pnpm build
```

### Build Specific App

```bash
turbo build --filter=@forge/admin-dashboard
```

### Build for Production

```bash
VITE_APP_ENV=production pnpm build
```

## Monorepo Commands

### Run Task in Package

```bash
# Run test in ui package
turbo test --filter=@forge/ui

# Run build in admin app
turbo build --filter=@forge/admin-dashboard
```

### Visualize Dependency Graph

```bash
pnpm deps:visualize
```

Shows which packages depend on which.

### Check Dependencies

```bash
pnpm deps:check
```

Validates dependency versions across monorepo.

## Common Tasks

### Add a New Dependency

```bash
# Add to specific package
pnpm add lodash --filter=@forge/ui

# Add to monorepo root (dev dependency)
pnpm add -w -D eslint
```

### Remove a Dependency

```bash
pnpm remove lodash --filter=@forge/ui
```

### Update Dependencies

```bash
# Check for updates
pnpm outdated

# Update interactively
pnpm update --interactive --latest
```

### Create a New Package

See [PACKAGES.md](./PACKAGES.md#creating-a-new-package)

## Debugging

### VS Code Debugging

#### Browser Debugging

1. Install [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension
2. Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "attach",
      "name": "Attach Chrome",
      "port": 9222,
      "pathMapping": {
        "/": "${workspaceRoot}/",
        "/src": "${workspaceRoot}/src"
      }
    }
  ]
}
```

3. Start dev server: `pnpm dev:admin`
4. Open Chrome DevTools (F12)
5. Start debugging: F5 in VS Code

#### Node Debugging

```bash
node --inspect-brk ./node_modules/.bin/vitest --run --reporter=verbose
```

Then open DevTools URL in Chrome.

### Console Debugging

```typescript
// Add temporary debug logging
console.log('DEBUG:', value);

// Use debugger statement
debugger; // Pauses if DevTools open
```

### React DevTools

Install [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html) browser extension for component inspection.

## Troubleshooting

### Dependencies Not Installing

```bash
# Clean and reinstall
pnpm clean
pnpm install
```

### Build Failures

```bash
# Clear turbo cache
turbo build --no-cache

# Verify TypeScript
pnpm type-check

# Check for linting errors
pnpm lint
```

### Port Already in Use

Default ports:
- Admin: 3000
- Analytics: 3001
- Portal: 3002
- Storybook: 6006

Change in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3000,
    strictPort: false, // Find next available
  },
});
```

### Tests Failing

```bash
# Run specific test with verbose output
pnpm test Button.test.tsx -- --reporter=verbose

# Update snapshots if intentional
pnpm test -- -u
```

### Hot Module Replacement (HMR) Not Working

Ensure `vite.config.ts` has HMR configured:

```typescript
export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
    },
  },
});
```

## Environment Variables

### Create Local .env

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (not committed):

```
VITE_APP_ENV=development
VITE_API_URL=http://localhost:8000
VITE_SENTRY_DSN=
VITE_POSTHOG_KEY=
```

### Access in Code

```typescript
// TypeScript with type checking
const apiUrl = import.meta.env.VITE_API_URL;

// Only VITE_ prefixed vars are exposed
// Others are removed from bundle for security
```

## Performance Tips

### Faster Installs

```bash
# Use --prefer-offline for cached packages
pnpm install --prefer-offline

# Use frozen-lockfile to skip dependency resolution
pnpm install --frozen-lockfile
```

### Faster Builds

```bash
# Turborepo caches results
turbo build

# Only rebuild changed
turbo build --only-affected
```

### Faster Tests

```bash
# Run tests in parallel
pnpm test

# Single thread (for debugging)
pnpm test -- --no-threads
```

## Documentation

- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture decisions
- [PACKAGES.md](./PACKAGES.md) - Package development
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contributing guidelines
- [TESTING.md](./TESTING.md) - Testing practices

## Getting Help

### Check Logs

```bash
# See turbo logs
turbo build --verbose

# See pnpm logs
pnpm install --verbose
```

### Ask Questions

- Check existing issues on GitHub
- Create a discussion for questions
- Ask in #dev channel (if applicable)

### Report Bugs

- Search existing issues
- Provide minimal reproducible example
- Include environment info: `node -v`, `pnpm -v`, `uname -a`

## Next Steps

1. ✅ Run `bash tooling/scripts/setup.sh`
2. ✅ Start dev server: `pnpm dev`
3. ✅ Open http://localhost:3000
4. ✅ Run tests: `pnpm test`
5. ✅ Read [ARCHITECTURE.md](./ARCHITECTURE.md) for deep dive

Happy coding! 🚀
