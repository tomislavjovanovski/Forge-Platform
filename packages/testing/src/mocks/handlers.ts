/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { rest } from 'msw';
import type { RestRequest, ResponseComposition, RestContext, RequestHandler } from 'msw';
import { fixtures } from '../fixtures';

const loginHandler = rest.post<{ email?: string }>(
  '/api/auth/login',
  async (
    req: RestRequest<{ email?: string }>,
    res: ResponseComposition,
    ctx: RestContext
  ) => {
    const body = (await req.json()) as { email?: string };
    const email = body.email;

    if (email === fixtures.admin.email) {
      return res(
        ctx.status(200),
        ctx.json({ token: 'admin-token', user: fixtures.admin })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ token: 'user-token', user: fixtures.user })
    );
  }
) as unknown as RequestHandler;

export const authHandlers: RequestHandler[] = [loginHandler];

const userHandler = rest.get('/api/user', (_req, res, ctx) =>
  res(ctx.status(200), ctx.json(fixtures.user))
) as unknown as RequestHandler;

const featureFlagsHandler = rest.get('/api/feature-flags', (_req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      enableNewDashboard: true,
      enableExperimentalCharts: false,
    })
  )
) as unknown as RequestHandler;

export const defaultHandlers: RequestHandler[] = [
  ...authHandlers,
  userHandler,
  featureFlagsHandler,
];
