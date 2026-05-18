export const currentUser = {
    id: 'u-01',
    name: 'Mina Chen',
    email: 'mina@forge.com',
    role: 'admin',
};
export const metrics = [
    { id: 'm-01', label: 'Active sessions', value: '8.4K', diff: '+12% vs last week', status: 'good' },
    { id: 'm-02', label: 'Permission requests', value: '120', diff: '-8% vs last week', status: 'warning' },
    { id: 'm-03', label: 'Audit exceptions', value: '4', diff: '+1 from yesterday', status: 'critical' },
    { id: 'm-04', label: 'Policy violations', value: '21', diff: '-3% vs last week', status: 'warning' },
];
export const auditLog = [
    { id: 'a-01', actor: 'Sasha Park', action: 'Updated role', target: 'Finance workspace', status: 'Success', createdAt: 'Just now' },
    { id: 'a-02', actor: 'Jules Morgan', action: 'Revoked access', target: '3rd party integration', status: 'Success', createdAt: '12m ago' },
    { id: 'a-03', actor: 'Mina Chen', action: 'Enabled feature flag', target: 'Experimental charts', status: 'Success', createdAt: '35m ago' },
    { id: 'a-04', actor: 'Aria Lee', action: 'Created alert rule', target: 'Payment failures', status: 'Pending review', createdAt: '2h ago' },
];
export const notifications = [
    { id: 'n-01', title: 'Audit export ready', body: 'Your CSV export is available in the Audit Center.', sentAt: '7m ago', unread: true },
    { id: 'n-02', title: 'New policy alert', body: 'A new RBAC policy request is waiting for approval.', sentAt: '28m ago', unread: true },
];
export const featureFlags = {
    enableAuditTrail: true,
    enableMonitoring: true,
    enableCommandPalette: true,
};
export const permissions = {
    owner: ['manage_users', 'view_audit', 'review_flags', 'deploy_changes'],
    admin: ['view_audit', 'review_flags'],
    analyst: ['view_metrics', 'view_logs'],
    viewer: ['view_metrics'],
};
//# sourceMappingURL=fixtures.js.map