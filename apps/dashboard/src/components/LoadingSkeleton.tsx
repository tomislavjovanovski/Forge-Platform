export function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-10 w-full animate-pulse rounded-2xl bg-slate-800/80" />
      ))}
    </div>
  );
}
