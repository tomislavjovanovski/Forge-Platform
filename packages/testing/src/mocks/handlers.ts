/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

import {
  http,
  HttpResponse,
} from 'msw';

import type {
  HttpHandler,
} from 'msw';

import { fixtures } from '../fixtures';

interface LoginRequestBody {
  email?: string;
}

const loginHandler: HttpHandler =
  http.post(
    '/api/auth/login',
    async ({
      request,
    }) => {
      const body =
        (await request.json()) as LoginRequestBody;

      const email =
        body.email;

      if (
        email ===
        fixtures.admin.email
      ) {
        return HttpResponse.json(
          {
            token:
              'admin-token',

            user:
              fixtures.admin,
          },
          {
            status: 200,
          },
        );
      }

      return HttpResponse.json(
        {
          token:
            'user-token',

          user:
            fixtures.user,
        },
        {
          status: 200,
        },
      );
    },
  );

export const authHandlers: HttpHandler[] =
  [
    loginHandler,
  ];

const userHandler: HttpHandler =
  http.get(
    '/api/user',
    () => {
      return HttpResponse.json(
        fixtures.user,
        {
          status: 200,
        },
      );
    },
  );

const featureFlagsHandler: HttpHandler =
  http.get(
    '/api/feature-flags',
    () => {
      return HttpResponse.json(
        {
          enableNewDashboard:
            true,

          enableExperimentalCharts:
            false,
        },
        {
          status: 200,
        },
      );
    },
  );

export const defaultHandlers: HttpHandler[] =
  [
    ...authHandlers,
    userHandler,
    featureFlagsHandler,
  ];