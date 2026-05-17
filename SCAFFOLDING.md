# forge-platform - Scaffolding Summary

Enterprise-grade SaaS frontend platform monorepo showcasing senior-level frontend engineering practices.

---

## 🎯 Project Highlights

### Architecture
- **Monorepo Strategy**: Turborepo + pnpm workspaces
- **Build System**: Vite 5 with ES2020 targets
- **Type Safety**: TypeScript strict mode across all packages
- **Component System**: Radix UI + Tailwind CSS
- **State Management**: Zustand for lightweight, scalable state
- **Testing**: Vitest (unit/integration), Playwright (E2E), MSW (mocking)
- **Error Tracking**: Sentry for production monitoring
- **Analytics**: PostHog for product insights
- **CI/CD**: GitHub Actions with intelligent task caching

### Enterprise Standards
- Strict TypeScript with exact optional properties
- Accessibility-first (WCAG 2.1 AA) component library
- Comprehensive test coverage (80%+ target)
- Shared configuration packages (ESLint, TypeScript)
- Clear package boundaries and ownership
- Production-ready error handling
- Real-time error tracking and monitoring

---

## 📁 Complete Folder Structure

```
forge-platform/                          # Monorepo root
│
├── apps/                                # End-user applications (3 independent apps)
│   ├── dashboard/                 # Internal admin interface
│   ├── playground/             # Analytics and reporting
│   └── storybook/                       # Component library documentation
│
├── packages/                            # Shared infrastructure (7 packages)
│   ├── ui/                             # Radix UI component library (WCAG AA)
│   ├── testing/                        # Vitest + RTL + MSW utilities
│   ├── auth/                           # Authentication layer (Zustand)
│   ├── analytics/                      # PostHog event tracking
│   ├── monitoring/                     # Sentry + Axe accessibility
│   ├── eslint-config/                  # Shared lint rules
│   └── ts-config/                      # Shared TypeScript configs
│
├── .github/
│   └── workflows/                       # CI/CD pipelines
│       ├── ci.yml                      # Build → Test → Deploy workflow
│       └── deploy.yml                  # Production deployment
│
├── tooling/
│   └── scripts/
│       └── setup.sh                     # Environment verification
│
├── Configuration Files
│   ├── turbo.json                      # Turborepo: task orchestration
│   ├── tsconfig.json                   # Root TypeScript config (strict mode)
│   ├── package.json                    # Root: monorepo scripts + deps
│   ├── pnpm-workspace.yaml             # Workspace definition
│   ├── .eslintrc.json                  # ESLint: code quality rules
│   ├── .prettierrc                     # Prettier: code formatting
│   ├── tailwind.config.js              # Design system definition
│   ├── postcss.config.js               # CSS processing pipeline
│   ├── vitest.config.ts                # Unit/integration test config
│   ├── vitest.setup.ts                 # Test environment setup
│   ├── playwright.config.ts            # E2E test configuration
│   ├── .npmrc                          # pnpm configuration
│   ├── .gitignore                      # Git patterns
│   └── .env.example                    # Environment template
│
└── Documentation                        # 7 comprehensive guides
    ├── README.md                       # Project overview
    ├── SETUP.md                        # Getting started guide
    ├── ARCHITECTURE.md                 # Architectural decisions & rationale
    ├── PACKAGES.md                     # Package development guide
    ├── MONOREPO.md                     # Monorepo structure & commands
    ├── TESTING.md                      # Testing strategies & patterns
    ├── CONTRIBUTING.md                 # Development guidelines
    └── SCAFFOLDING.md                  # This file
```

---

## 🚀 Initial Setup Commands

```bash
# 1. Verify development environment
bash tooling/scripts/setup.sh

# 2. Install all dependencies
pnpm install

# 3. Start development servers
pnpm dev

# 4. Open in browser
# - Admin: http://localhost:3000
# - Analytics: http://localhost:3001
# - Portal: http://localhost:3002

# 5. Run tests
pnpm test

# 6. Check code quality
pnpm lint && pnpm type-check
```

---

## 📦 Key Configuration Files

### turbo.json - Task Orchestration
```json
{
  "tasks": {
    "build": {
      "outputs": ["dist/**"],
      "cache": true,
      "dependsOn": ["^build"]
    },
    "test": { "cache": true, "dependsOn": ["^build"] },
    "lint": { "cache": true, "dependsOn": ["^build"] },
    "dev": { "cache": false, "interactive": true }
  }
}
```
**Purpose**: Defines task dependencies, enables intelligent caching, parallel execution

### tsconfig.json - Strict Type Safety
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noUncheckedIndexedAccess": true
  },
  "paths": {
    "@forge/*": ["packages/*/src"],
    "@apps/*": ["apps/*/src"]
  }
}
```
**Purpose**: Enforces strict type checking across monorepo, enables path aliases

### pnpm-workspace.yaml - Workspace Definition
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
catalogs:
  react: [version constraints...]
  types: [type packages...]
  [more catalogs...]
```
**Purpose**: Defines workspace structure, centralizes dependency versions

### .npmrc - pnpm Configuration
```
shamefully-hoist=false
strict-peer-dependencies=true
auto-install-peers=true
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
```
**Purpose**: Optimizes node_modules structure, enforces peer dependencies

---

## 📝 Root package.json Scripts

```bash
# Development
pnpm dev              # All dev servers (3000, 3001)
pnpm dev:dashboard    # Dashboard only (3000)
pnpm dev:playground   # Playground only (3001)

# Building
pnpm build            # Build all apps (not Storybook)
pnpm build:all        # Build including Storybook
pnpm build:storybook  # Storybook component docs

# Testing
pnpm test             # Unit + integration tests (Vitest)
pnpm test:watch       # Watch mode for TDD
pnpm test:coverage    # Generate coverage report
pnpm test:e2e         # E2E tests (Playwright)

# Code Quality
pnpm lint             # ESLint check
pnpm lint:fix         # Auto-fix linting issues
pnpm type-check       # TypeScript verification
pnpm format           # Prettier code formatting

# Monorepo Management
pnpm clean            # Clean build outputs
pnpm clean:dist       # Deep clean with node_modules
pnpm deps:check       # Validate dependencies
pnpm deps:visualize   # Show dependency graph
```

---

## 🏗️ Architectural Decisions & Rationale

### Why Turborepo?
- Industry standard for monorepo orchestration
- Intelligent task caching (both local and distributed)
- Parallel execution with dependency awareness
- Minimal configuration overhead
- Excellent GitHub Actions integration

### Why pnpm Workspaces?
- 3-5x faster than npm/yarn
- Deduped node_modules (disk efficiency)
- Strict peer dependency resolution
- Workspace catalogs for version consistency
- Single lock file prevents conflicts

### Why TypeScript Strict Mode?
- Catches 15-20% of bugs at compile time
- Self-documenting code through types
- Better IDE support and refactoring
- Enterprise-grade quality expectations
- Minimal productivity cost with good setup

### Why Radix UI + Tailwind CSS?
- **Radix**: Unstyled, accessible primitives (WCAG 2.1 AA)
- **Tailwind**: Utility-first prevents CSS bloat, DX-optimized
- Zero styling dependencies, fully composable
- Perfect for design system abstraction
- High productivity without context switching

### Why Zustand?
- Only ~1KB with excellent TypeScript support
- Zero boilerplate, clean API
- DevTools integration for debugging
- Perfect for app-level shared state
- Scalable from simple to complex stores

### Why Vitest + Playwright?
- **Vitest**: ESM-native, fast, Jest-compatible
- **Playwright**: Multi-browser (Chromium, Firefox, WebKit)
- Native TypeScript support, no extra compilation
- Integrated with development environment
- Excellent for fast feedback loops

### Package Boundary Strategy
- Apps: Deployable end-user products
- Platform packages: Domain-specific reusable logic
- Infrastructure packages: Build tooling and config
- Clear ownership prevents conflicts
- Independent versioning and deployment

---

## 🌳 Monorepo Dependency Graph

```
Infrastructure Layer (No Dependencies)
├── @forge/ts-config ────────────────────┐
├── @forge/eslint-config ────────────────┤
└────────────────────────────────────────┤
                                          │
Service Layer                             │
├── @forge/monitoring (Sentry, Axe) ─────┤
├── @forge/analytics (PostHog) ──────────┤
├── @forge/auth (Zustand) ───────────────┤
└────────────────────────────────────────┤
                                          │
Testing Utilities                         │
├── @forge/testing ──────────────────────┤
│   ├─ MSW (API mocking)
│   ├─ RTL helpers
│   └─ Test fixtures
└────────────────────────────────────────┤
                                          │
UI Components Layer                       │
├── @forge/ui (Radix + Tailwind) ────────┤
│   ├─ Component library
│   ├─ Design system
│   └─ Accessibility defaults
└────────────────────────────────────────┤
                                          │
Application Layer ◄─────────────────────── Path Aliases (@forge/*)
├── dashboard
├── playground
└── storybook
```

**Key Principles**:
- Strict layering prevents circular dependencies
- All imports flow downward (no upward imports)
- Each layer is independently testable
- Apps only depend on packages, not each other
- Packages define clear public APIs (src/index.ts)

---

## 🧪 Testing Infrastructure

### Test Pyramid

```
             E2E (10%)
        Playwright Tests
         - Real browsers
         - User journeys
         
   Integration (30%)
   Vitest + React Testing Library
    - Multiple components
    - State + API interaction
    
Unit Tests (60%)
Vitest + RTL
 - Single components
 - Utilities, hooks
```

### Testing Stack Components

| Layer | Tool | Purpose | Config |
|-------|------|---------|--------|
| Unit/Integration | Vitest | Fast, ESM-native | vitest.config.ts |
| Components | @testing-library/react | Behavioral testing | RTL setup |
| API | MSW | Network mocking | setupTestServer() |
| E2E | Playwright | Real browser | playwright.config.ts |
| Accessibility | Axe-core | A11y validation | @forge/monitoring |
| Coverage | v8 | Metrics reporting | vitest.config.ts |

### Test Files

```
components/
├── Button.tsx
├── Button.test.tsx           # Unit tests
├── Button.a11y.test.tsx      # Accessibility tests
└── Button.stories.tsx        # Storybook docs
```

---

## 📊 Package Details

### @forge/ui (Component Library)
- **Purpose**: Shared React component system
- **Base**: Radix UI unstyled primitives
- **Styling**: Tailwind CSS utilities
- **Exports**: Components, hooks, CSS
- **Quality**: 80%+ test coverage, WCAG AA
- **Bundle**: Built with Vite (ES modules)

### @forge/testing (Testing Utilities)
- **Purpose**: Shared test infrastructure
- **Includes**: MSW fixtures, RTL helpers, test factories
- **Re-exported**: For all consumers
- **Pattern**: MSW for realistic API mocking
- **Setup**: Automatic server initialization

### @forge/auth (Authentication)
- **Purpose**: Auth and session management
- **Store**: Zustand for persistent state
- **Exports**: useAuth hook, useAuthStore, types
- **Features**: JWT tokens, user context, logout
- **Security**: Token storage, session persistence

### @forge/analytics (Event Tracking)
- **Purpose**: Product analytics integration
- **Provider**: PostHog
- **Exports**: useAnalytics hook, event types
- **Events**: Page views, user actions, conversions
- **Type-Safe**: Strongly typed event constants

### @forge/monitoring (Error Tracking & A11y)
- **Purpose**: Error tracking and accessibility
- **Features**: Sentry integration, error classes, Axe testing
- **Exports**: initSentry(), ForgeError, testAccessibility()
- **Breadcrumbs**: Error context tracking
- **Custom Errors**: App-specific error codes

### @forge/eslint-config (Lint Rules)
- **Purpose**: Shared linting standards
- **Includes**: TypeScript rules, React hooks, A11y
- **Plugins**: @typescript-eslint, react, jsx-a11y
- **Format**: Prettier integration (no conflicts)

### @forge/ts-config (TypeScript Configs)
- **Purpose**: Shared TypeScript configuration
- **Presets**: base.json, react.json, app.json
- **Extends**: Each can extend parent
- **Strictness**: Enforced in base config

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**`.github/workflows/ci.yml`** - Continuous Integration

```
┌─────────────────────────────────────────┐
│  1. Lint (ESLint, Prettier)             │
│     └─ Type-check (TypeScript)          │
├─────────────────────────────────────────┤
│  2. Test (Vitest + RTL)                 │
│     └─ Coverage Report (v8)             │
├─────────────────────────────────────────┤
│  3. Build (Vite)                        │
│     ├─ dashboard                  │
│     ├─ playground              │
├─────────────────────────────────────────┤
│  4. E2E Tests (Playwright)              │
│     ├─ Chromium                         │
│     ├─ Firefox                          │
│     └─ WebKit                           │
├─────────────────────────────────────────┤
│  5. Accessibility Checks (Axe)          │
└─────────────────────────────────────────┘
```

**`.github/workflows/deploy.yml`** - Deployment

Only runs on main branch after all checks pass. Separately deploys each app.

---

## 🎓 Engineering Standards

### TypeScript
- ✅ Strict mode enabled
- ✅ No `any` types
- ✅ Explicit return types
- ✅ Type-aware ESLint rules
- ✅ Project references for cross-package safety

### React & Components
- ✅ Functional components only
- ✅ Hooks for state and effects
- ✅ Props interfaces defined
- ✅ Accessible (semantic HTML, ARIA)
- ✅ No prop drilling (use context/stores)

### Testing
- ✅ 80%+ coverage target
- ✅ Test behavior, not implementation
- ✅ Use semantic queries (getByRole)
- ✅ MSW for API mocking
- ✅ Accessibility tests alongside unit tests

### Code Organization
- ✅ One component per file (except related)
- ✅ Collocated tests (Component.test.tsx)
- ✅ Clear directory structure
- ✅ Path aliases for imports
- ✅ Shared types in types/ folder

### Git & Commits
- ✅ Conventional commits (feat:, fix:, etc.)
- ✅ Feature branches (feature/xyz)
- ✅ PR reviews before merge
- ✅ Descriptive commit messages
- ✅ Link to issues when applicable

---

## 🚦 Getting Started Checklist

- [ ] Verify Node 20+ and pnpm 9+
- [ ] Run `bash tooling/scripts/setup.sh`
- [ ] Run `pnpm install`
- [ ] Run `pnpm dev` (start all dev servers)
- [ ] Open http://localhost:3000 in browser
- [ ] Run `pnpm test` (verify tests pass)
- [ ] Run `pnpm lint` (check code quality)
- [ ] Read [SETUP.md](./SETUP.md) for next steps
- [ ] Review [ARCHITECTURE.md](./ARCHITECTURE.md) for deep dive
- [ ] Check [PACKAGES.md](./PACKAGES.md) for package development

---

## 📚 Documentation Guide

| Document | Purpose | Audience |
|----------|---------|----------|
| **README.md** | Project overview & quick start | Everyone |
| **SETUP.md** | Development environment & getting started | Developers |
| **ARCHITECTURE.md** | Design decisions & rationale | Architects, Senior Devs |
| **PACKAGES.md** | Package development & best practices | Package Maintainers |
| **MONOREPO.md** | Structure, commands, workflows | Everyone (Reference) |
| **TESTING.md** | Testing strategies & patterns | QA Engineers, Developers |
| **CONTRIBUTING.md** | Development guidelines & standards | Contributors |

---

## 🎯 Production Readiness

✅ **Fully Production-Ready**
- Comprehensive error handling and tracking (Sentry)
- Real-time analytics (PostHog)
- Accessibility compliance (WCAG 2.1 AA)
- Automated testing (unit, integration, E2E)
- CI/CD pipeline (GitHub Actions)
- Type safety (TypeScript strict)
- Performance optimized (Vite, code splitting)
- Security best practices (no secrets, OWASP compliance)

✅ **Enterprise Standards**
- Clear architecture with well-defined boundaries
- Shared infrastructure (ESLint, TypeScript, Tailwind)
- Scalable from 3 apps to 50+ apps
- Team-friendly (clear documentation, standards)
- Maintainable (strong typing, testing, linting)
- Performance monitoring (analytics, error tracking)

---

## 🔗 Quick Links

**Getting Started**: [SETUP.md](./SETUP.md)
**Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)  
**Packages**: [PACKAGES.md](./PACKAGES.md)  
**Testing**: [TESTING.md](./TESTING.md)  
**Monorepo Ref**: [MONOREPO.md](./MONOREPO.md)  
**Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## ✨ Next Steps

1. **Understand the Architecture**: Read [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Set Up Development**: Follow [SETUP.md](./SETUP.md)
3. **Explore Packages**: Review [PACKAGES.md](./PACKAGES.md)
4. **Start Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
5. **Reference Commands**: Use [MONOREPO.md](./MONOREPO.md)

---

**forge-platform** demonstrates production-grade frontend engineering at an enterprise scale. Every decision prioritizes developer experience, code quality, and long-term maintainability.

🚀 **Happy coding!**
