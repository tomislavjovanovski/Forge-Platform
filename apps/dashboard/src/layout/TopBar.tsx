import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleMode } from '../features/theme/themeSlice';
import { GlobalSearch } from '../features/search/GlobalSearch';
import type { ReactElement } from 'react';

interface TopBarProps {
  unreadCount: number;
  onOpenNotifications: () => void;
}

export function TopBar({ unreadCount, onOpenNotifications }: TopBarProps): ReactElement {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <header className="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/90 px-6 py-5 shadow-sm shadow-slate-950/20 backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin dashboard</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50">Command center</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(toggleMode())}
            className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
          >
            Notifications
            {unreadCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <GlobalSearch />
    </header>
  );
}
