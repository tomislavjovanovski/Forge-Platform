import { useMemo, useState } from 'react';

const items = [
  { id: 's-01', label: 'Users', path: '/users' },
  { id: 's-02', label: 'Audit history', path: '/audit' },
  { id: 's-03', label: 'Monitoring', path: '/monitoring' },
  { id: 's-04', label: 'Notifications', path: '/notifications' },
  { id: 's-05', label: 'Feature flags', path: '/flags' },
];

export function GlobalSearch(): JSX.Element {
  const [query, setQuery] = useState('');
  const results = useMemo(
    () =>
      items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="group relative">
      <label htmlFor="global-search" className="sr-only">
        Global search
      </label>
      <div className="relative text-slate-400 focus-within:text-slate-600">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          🔎
        </span>
        <input
          id="global-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search dashboards, alerts, users..."
          className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 py-2 pl-11 pr-4 text-sm text-slate-100 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/40"
        />
      </div>
      {query && (
        <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/95 shadow-2xl backdrop-blur">
          {results.length ? (
            results.map((item) => (
              <button
                key={item.id}
                type="button"
                className="w-full px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-slate-800"
              >
                {item.label}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-slate-500">No matches found.</div>
          )}
        </div>
      )}
    </div>
  );
}
