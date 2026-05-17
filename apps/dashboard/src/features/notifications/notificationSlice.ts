import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationItem } from '../../types/dashboard';

interface NotificationState {
  items: NotificationItem[];
}

const initialState: NotificationState = {
  items: [
    {
      id: 'n-01',
      title: 'Workspace permission updated',
      body: 'Your RBAC membership was upgraded to Admin for the Sales workspace.',
      sentAt: '5m ago',
      unread: true,
    },
    {
      id: 'n-02',
      title: 'Pipeline synthesis completed',
      body: 'The audit report for Q2 is ready for review.',
      sentAt: '23m ago',
      unread: true,
    },
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markRead(state, action: PayloadAction<string>) {
      const item = state.items.find((notification) => notification.id === action.payload);
      if (item) {
        item.unread = false;
      }
    },
    addNotification(state, action: PayloadAction<NotificationItem>) {
      state.items.unshift(action.payload);
    },
  },
});

export const { markRead, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
