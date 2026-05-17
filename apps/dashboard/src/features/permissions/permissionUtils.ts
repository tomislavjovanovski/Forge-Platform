export const permissionMap = {
  owner: ['manage_users', 'view_audit', 'review_flags', 'deploy_changes'],
  admin: ['view_audit', 'review_flags', 'view_metrics'],
  analyst: ['view_metrics', 'view_logs'],
  viewer: ['view_metrics'],
} as const;

export type UserRole = keyof typeof permissionMap;
export type Permission = (typeof permissionMap)[UserRole][number];

export function canAccess(role: UserRole, permission: Permission) {
  const rolePermissions = permissionMap[role] as readonly Permission[];
  return rolePermissions.includes(permission);
}

export const permissionNames: Record<Permission, string> = {
  manage_users: 'Manage users',
  view_audit: 'View audit trail',
  review_flags: 'Review feature flags',
  deploy_changes: 'Deploy changes',
  view_metrics: 'View metrics',
  view_logs: 'View logs',
};
