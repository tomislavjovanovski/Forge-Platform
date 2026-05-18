/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { http, HttpResponse, } from 'msw';
import { fixtures } from '../fixtures';
const loginHandler = http.post('/api/auth/login', async ({ request, }) => {
    const body = (await request.json());
    const email = body.email;
    if (email ===
        fixtures.admin.email) {
        return HttpResponse.json({
            token: 'admin-token',
            user: fixtures.admin,
        }, {
            status: 200,
        });
    }
    return HttpResponse.json({
        token: 'user-token',
        user: fixtures.user,
    }, {
        status: 200,
    });
});
export const authHandlers = [
    loginHandler,
];
const userHandler = http.get('/api/user', () => {
    return HttpResponse.json(fixtures.user, {
        status: 200,
    });
});
const featureFlagsHandler = http.get('/api/feature-flags', () => {
    return HttpResponse.json({
        enableNewDashboard: true,
        enableExperimentalCharts: false,
    }, {
        status: 200,
    });
});
export const defaultHandlers = [
    ...authHandlers,
    userHandler,
    featureFlagsHandler,
];
//# sourceMappingURL=handlers.js.map