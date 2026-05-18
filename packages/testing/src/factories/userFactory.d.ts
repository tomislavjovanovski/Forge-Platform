import { fixtures } from '../fixtures';
export type UserFactoryOverride = Partial<typeof fixtures.user>;
export type AdminFactoryOverride = Partial<typeof fixtures.admin>;
export declare function makeUser(overrides?: UserFactoryOverride): typeof fixtures.user;
export declare function makeAdmin(overrides?: AdminFactoryOverride): typeof fixtures.admin;
//# sourceMappingURL=userFactory.d.ts.map