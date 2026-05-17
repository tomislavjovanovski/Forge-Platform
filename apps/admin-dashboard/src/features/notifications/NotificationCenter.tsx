import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { markRead } from './notificationSlice';

export function NotificationCenter() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.notifications.items);
  const unread = useMemo(() => items.filter((item) => item.unread).length, [items]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Notifications</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-50">Inbox</h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-400">
          {unread} unread
        </span>
      </div>
      <div className="space-y-4">
        {items.map((notification) => (
          <div key={notification.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-100">{notification.title}</p>
                <p className="mt-2 text-sm text-slate-400">{notification.body}</p>
              </div>
              <button
                type="button"
                onClick={() => dispatch(markRead(notification.id))}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400 transition hover:border-slate-500"
              >
                Mark read
              </button>
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-500">
              {notification.sentAt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
