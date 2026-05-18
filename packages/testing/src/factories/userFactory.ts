import { fixtures } from '../fixtures';

export type UserFactoryOverride = Partial<typeof fixtures.user>;
export type AdminFactoryOverride = Partial<typeof fixtures.admin>;

export function makeUser(
  overrides: UserFactoryOverride = {}
): typeof fixtures.user {
  return { ...fixtures.user, ...overrides };
}

export function makeAdmin(
  overrides: AdminFactoryOverride = {}
): typeof fixtures.admin {
  return { ...fixtures.admin, ...overrides };
}
