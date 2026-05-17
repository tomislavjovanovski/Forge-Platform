import type { TraceSpan } from '../data/observability';

const spanTone: Record<TraceSpan['status'], string> = {
  ok: 'from-emerald-400 to-cyan-300',
  warning: 'from-amber-400 to-orange-300',
  error: 'from-rose-500 to-fuchsia-400',
};

interface TraceWaterfallProps {
  spans: TraceSpan[];
}

export function TraceWaterfall({ spans }: TraceWaterfallProps): React.ReactElement {
  const totalDuration = Math.max(...spans.map((span) => span.start + span.duration));

  return (
    <div className="rounded-[24px] border border-white/8 bg-slate-900/70 p-4">
      <div className="grid grid-cols-[minmax(0,220px)_1fr] gap-4 border-b border-white/8 pb-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
        <div>Span</div>
        <div className="flex justify-between">
          <span>0 ms</span>
          <span>{totalDuration} ms</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {spans.map((span) => {
          const left = (span.start / totalDuration) * 100;
          const width = (span.duration / totalDuration) * 100;

          return (
            <div key={span.id} className="grid grid-cols-[minmax(0,220px)_1fr] gap-4">
              <div className="min-w-0">
                <p
                  className="truncate text-sm font-medium text-white"
                  style={{ paddingLeft: `${span.depth * 14}px` }}
                >
                  {span.name}
                </p>
                <p
                  className="truncate text-xs uppercase tracking-[0.2em] text-slate-500"
                  style={{ paddingLeft: `${span.depth * 14}px` }}
                >
                  {span.service}
                </p>
              </div>

              <div className="relative flex h-11 items-center rounded-full bg-white/[0.03]">
                <div
                  className={`absolute h-7 rounded-full bg-gradient-to-r ${spanTone[span.status]} shadow-[0_10px_22px_rgba(6,182,212,0.18)]`}
                  style={{
                    left: `${left}%`,
                    width: `${Math.max(width, 6)}%`,
                  }}
                />
                <div className="absolute inset-x-3 flex justify-between text-[0.68rem] font-medium text-slate-200">
                  <span>{span.start} ms</span>
                  <span>{span.duration} ms</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
