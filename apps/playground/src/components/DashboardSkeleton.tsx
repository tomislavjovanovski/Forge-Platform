function SkeletonBlock({
  className,
}: {
  className: string;
}): React.ReactElement {
  return <div className={`animate-pulse rounded-3xl bg-white/6 ${className}`} />;
}

export function DashboardSkeleton(): React.ReactElement {
  return (
    <div className="space-y-6" aria-label="Loading observability dashboard">
      <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6">
        <SkeletonBlock className="h-4 w-40" />
        <SkeletonBlock className="mt-4 h-10 w-3/4" />
        <SkeletonBlock className="mt-3 h-4 w-full" />
        <SkeletonBlock className="mt-2 h-4 w-2/3" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5"
          >
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="mt-4 h-9 w-28" />
            <SkeletonBlock className="mt-3 h-3 w-16" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="mt-5 h-[320px] w-full" />
        </div>
        <div className="space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
            <SkeletonBlock className="h-4 w-36" />
            <SkeletonBlock className="mt-5 h-24 w-full" />
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
            <SkeletonBlock className="h-4 w-44" />
            <SkeletonBlock className="mt-5 h-24 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
