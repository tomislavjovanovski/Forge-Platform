# Forge Platform QA Infrastructure

This document captures the enterprise frontend quality engineering infrastructure introduced for the Forge Platform monorepo.

## Architecture Overview

The QA infrastructure is designed around three core layers:

1. **Shared test assets** in `packages/testing`
2. **Application-level E2E suites** under `apps/<app>/tests`
3. **Observability and monitoring** in `packages/monitoring` and `packages/analytics`

### Why this architecture?

- **Maintainability**: shared fixtures, MSW handlers, and feature flag utilities live in one package and can be used across apps.
- **Scalability**: each app keeps its own page objects and test specs, while the root config drives consistent cross-browser execution.
- **Developer experience**: `@forge/testing` exports reusable helpers for auth, accessibility, mocked API interactions, and Playwright utilities.

## Folder Structure

- `packages/testing/`
  - `src/mocks/` - MSW request handlers and browser/node mocks
  - `src/fixtures/` - canonical test data
  - `src/accessibility/` - Axe runner utilities for test assertions
  - `src/auth/` - test identity helpers and auth tokens
  - `src/factories/` - factory functions for consistent fixture creation
  - `src/playwright/` - browser-level helpers and route mocks
- `packages/monitoring/`
  - `src/sentry/` - Sentry initialization and runtime error instrumentation
  - `src/errorBoundary.ts` - application-level error boundary component with observability
  - `src/accessibility/` - accessibility integration helpers
- `packages/analytics/`
  - `src/posthog.ts` - PostHog bootstrap and tracking utilities
- `apps/admin-dashboard/tests/`
  - `page-objects/` - reusable page abstractions
  - `fixtures/` - app-specific mock data
  - `specs/` - focused smoke and regression tests
- `apps/analytics-dashboard/tests/`
  - same structure for analytics-specific coverage

## Shared Playwright Configuration

`playwright.config.ts` now supports:

- environment-driven `PW_APP` selection for targeted app preview servers
- cross-browser execution across Chromium, Firefox, and WebKit
- CI-safe retries and trace/screenshot capture on first retry
- parallel execution with `fullyParallel` and worker scaling
- HTML and JSON reporter output for dashboards and artifact upload

The root config is intentionally app-agnostic, while app-level tests remain colocated with the application.

## MSW API Mocking

The shared test package now includes:

- `packages/testing/src/mocks/handlers.ts` for reusable API definitions
- `packages/testing/src/mocks/browser.ts` for browser-driven MSW initialization
- `packages/testing/src/mocks/server.ts` for node-based integration tests

This makes it easy to create deterministic endpoint behavior in component and integration tests without relying on backend fixture state.

## Accessibility Automation

Accessibility helpers are shared through `packages/testing/src/accessibility/index.ts` and provide:

- programmatic Axe execution against rendered DOM
- structured failure messages for dashboard output
- integration with Vitest and Playwright failure handling

## Page Object Patterns

Each app now has a small `page-objects/` directory for reusable page abstractions.
This reduces brittle selectors and keeps test flows readable:

- `apps/admin-dashboard/tests/page-objects/DashboardPage.ts`
- `apps/analytics-dashboard/tests/page-objects/AnalyticsPage.ts`

## Test Utilities

The shared fixture layer includes:

- `packages/testing/src/factories/userFactory.ts`
- `packages/testing/src/auth/testAuth.ts`
- `packages/testing/src/featureFlags.ts`
- `packages/testing/src/playwright/route.ts`
- `packages/testing/src/playwright/auth.ts`

These helpers focus on stable test data, auth state injection, and API route mocking.

## Observability Strategy

Observability is split across monitoring and analytics:

- `packages/monitoring/src/sentry/index.ts` initializes Sentry for runtime error capture
- `packages/monitoring/src/errorBoundary.ts` captures React render failures and reports them
- `packages/analytics/src/posthog.ts` encapsulates PostHog initialization and tracking

This split ensures production-grade telemetry while keeping QA artifacts separate from runtime analytics.

## CI/CD Pipeline Examples

Three enterprise workflows are now available:

- `.github/workflows/ci.yml` – combined lint, unit, build, cross-browser E2E, accessibility, and Lighthouse checks
- `.github/workflows/preview-deploy.yml` – preview build validation for pull requests with smoke E2E
- `.github/workflows/release.yml` – semantic release on tagged pushes

### Pipeline design principles

- matrixed app and browser execution
- build isolation by app
- preview validation before merge
- Lighthouse budgets as part of QA guardrails
- semantic-release for consistent versioning and changelog generation

## Performance and Bundle Strategy

- `.lighthouserc.json` contains Lighthouse budgets and thresholds
- `tooling/vite.analyze.config.ts` produces a bundle analysis HTML report
- `package.json` adds `analyze:bundle`, `lhci:collect`, and `lhci:assert` helper scripts

## Release and Maintenance

This infrastructure is built for a large SaaS team:

- use feature flags for progressive rollout and regression isolation
- keep app tests co-located with feature areas
- keep shared QA helpers in `packages/testing` to avoid duplication
- use preview deployments as a validation gate before production merges
- keep performance budgets in source control and enforce them in CI

## Recommended developer workflows

- `pnpm test:e2e:admin` – targeted admin app E2E run
- `pnpm test:accessibility` – run Axe checks across dedicated test files
- `pnpm analyze:bundle` – generate bundle-analysis output
- `pnpm exec lhci autorun --config .lighthouserc.json` – Lighthouse checks against a running preview
- `pnpm exec semantic-release` – release automation on tagged commits
