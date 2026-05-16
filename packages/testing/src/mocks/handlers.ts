import { rest } from 'msw';
import { fixtures } from '../fixtures';

export const authHandlers = [
  rest.post('/api/auth/login', async (req, res, ctx) => {
    const body = await req.json();
    const email = (body as { email?: string }).email;

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
  }),
];

export const defaultHandlers = [
  ...authHandlers,
  rest.get('/api/user', (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(fixtures.user))
  ),
  rest.get('/api/feature-flags', (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        enableNewDashboard: true,
        enableExperimentalCharts: false,
      })
    )
  ),
];
