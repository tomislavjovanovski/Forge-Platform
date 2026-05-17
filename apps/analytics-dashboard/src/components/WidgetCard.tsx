import type { ReactNode } from 'react';

interface WidgetCardProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function WidgetCard({
  eyebrow,
  title,
  description,
  action,
  className = '',
  children,
}: WidgetCardProps): React.ReactElement {
  return (
    <section
      className={`rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-cyan-300/70">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
