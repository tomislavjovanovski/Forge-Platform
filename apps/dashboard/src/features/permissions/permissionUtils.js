export const permissionMap = {
    owner: ['manage_users', 'view_audit', 'review_flags', 'deploy_changes'],
    admin: ['view_audit', 'review_flags', 'view_metrics'],
    analyst: ['view_metrics', 'view_logs'],
    viewer: ['view_metrics'],
};
export function canAccess(role, permission) {
    const rolePermissions = permissionMap[role];
    return rolePermissions.includes(permission);
}
export const permissionNames = {
    manage_users: 'Manage users',
    view_audit: 'View audit trail',
    review_flags: 'Review feature flags',
    deploy_changes: 'Deploy changes',
    view_metrics: 'View metrics',
    view_logs: 'View logs',
};
//# sourceMappingURL=permissionUtils.js.map