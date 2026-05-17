export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  diff: string;
  status: 'good' | 'warning' | 'critical';
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  status: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  sentAt: string;
  unread: boolean;
}

export interface FeatureFlagMap {
  enableAuditTrail: boolean;
  enableMonitoring: boolean;
  enableCommandPalette: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'analyst' | 'viewer';
}
