import { useGetAuditLogQuery } from '../services/dashboardApi';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

export function AuditLogPanel(): JSX.Element {
  const { data, isLoading } = useGetAuditLogQuery();

  if (isLoading) {
    return <LoadingSkeleton rows={5} />;
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Audit logs</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-50">Recent security events</h3>
        </div>
        <button className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-600 hover:bg-slate-900">
          Export
        </button>
      </div>
      <div className="space-y-4">
        {data?.slice(0, 5).map((entry) => (
          <div key={entry.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-100">{entry.action}</p>
              <span className="text-xs uppercase tracking-[0.28em] text-slate-500">{entry.createdAt}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{entry.actor} · {entry.target}</p>
            <p className="mt-3 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              {entry.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
