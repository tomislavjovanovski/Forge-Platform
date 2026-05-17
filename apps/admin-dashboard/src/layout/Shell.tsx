import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import type { UserProfile } from '../types/dashboard';

interface ShellProps {
  user: UserProfile;
  unreadCount: number;
  onOpenNotifications: () => void;
  children: ReactNode;
}

export function Shell({ user, unreadCount, onOpenNotifications, children }: ShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative mx-auto flex min-h-screen max-w-full overflow-hidden lg:max-w-[1600px]">
        <Sidebar user={user} />
        <div className="flex min-h-screen flex-1 flex-col">
          <TopBar unreadCount={unreadCount} onOpenNotifications={onOpenNotifications} />
          <main className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
