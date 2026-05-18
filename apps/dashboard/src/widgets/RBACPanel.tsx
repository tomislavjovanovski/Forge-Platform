import { permissionMap, permissionNames } from '../features/permissions/permissionUtils';
import type { UserProfile } from '../types/dashboard';

interface RBACPanelProps {
  user: UserProfile;
}

export function RBACPanel({ user }: RBACPanelProps): JSX.Element {
  const permissions = permissionMap[user.role] ?? [];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">RBAC</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-50">Permissions summary</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {permissions.map((permission) => (
          <div key={permission} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm font-semibold text-slate-100">{permissionNames[permission] ?? permission}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
