import { rest } from 'msw';
import { auditLog, currentUser, featureFlags, metrics, notifications } from './fixtures';

export const handlers = [
  rest.get('/api/auth/profile', (_req, res, ctx) => res(ctx.status(200), ctx.json(currentUser))),
  rest.get('/api/metrics', (_req, res, ctx) => res(ctx.status(200), ctx.json(metrics))),
  rest.get('/api/audit/log', (_req, res, ctx) => res(ctx.status(200), ctx.json(auditLog))),
  rest.get('/api/notifications', (_req, res, ctx) => res(ctx.status(200), ctx.json(notifications))),
  rest.get('/api/feature-flags', (_req, res, ctx) => res(ctx.status(200), ctx.json(featureFlags))),
];
