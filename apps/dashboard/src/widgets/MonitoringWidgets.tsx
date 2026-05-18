import type { ReactElement } from 'react';
import { useGetMetricsQuery } from '../services/dashboardApi';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

const statusStyles = {
  good: 'bg-emerald-500/10 text-emerald-300',
  warning: 'bg-amber-500/10 text-amber-300',
  critical: 'bg-rose-500/10 text-rose-300',
} as const;

export function MonitoringWidgets(): ReactElement {
  const { data, isLoading } = useGetMetricsQuery();

  if (isLoading) {
    return <LoadingSkeleton rows={4} />;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {data?.map((metric) => (
        <div key={metric.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{metric.label}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[metric.status]}`}>
              {metric.status}
            </span>
          </div>
          <div className="mt-4 flex items-end gap-4">
            <p className="text-3xl font-semibold text-slate-50">{metric.value}</p>
            <p className="text-sm text-slate-400">{metric.diff}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
