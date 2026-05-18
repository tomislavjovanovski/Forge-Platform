import { fixtures } from '../fixtures';
export function makeUser(overrides = {}) {
    return { ...fixtures.user, ...overrides };
}
export function makeAdmin(overrides = {}) {
    return { ...fixtures.admin, ...overrides };
}
//# sourceMappingURL=userFactory.js.map