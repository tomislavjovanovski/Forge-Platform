import type { ReactElement } from 'react';
import type { UserProfile } from '../types/dashboard';

interface SidebarProps {
  user: UserProfile;
}

const navItems = [
  { label: 'Overview', hint: 'Metrics' },
  { label: 'Audit', hint: 'Logs' },
  { label: 'Monitoring', hint: 'Health' },
  { label: 'Permissions', hint: 'RBAC' },
  { label: 'Notifications', hint: 'Inbox' },
];

export function Sidebar({ user }: SidebarProps): ReactElement {
  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-8 border-r border-slate-800 bg-slate-950 p-6 lg:flex">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Forge Admin</p>
        <h1 className="mt-4 text-xl font-semibold text-slate-50">Workspace shell</h1>
      </div>

      <div className="space-y-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
          >
            <span>{item.label}</span>
            <span className="text-xs text-slate-500">{item.hint}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto rounded-3xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Account</p>
        <p className="mt-3 font-semibold text-slate-50">{user.name}</p>
        <p className="text-sm text-slate-400">{user.email}</p>
        <span className="mt-3 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
          {user.role}
        </span>
      </div>
    </aside>
  );
}
