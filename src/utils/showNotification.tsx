import {
  addNotification,
  type NotificationItem,
  pendingQueue,
} from '@app/components/NotificationManager.tsx';
import type { ReactNode } from 'react';

type ShowNotificationArgs = {
  message: ReactNode;
  id?: string;
  isError?: boolean;
  timeout?: number;
};

export const showNotification = ({
  message,
  id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  isError = false,
  timeout = 3000,
}: ShowNotificationArgs) => {
  const notification: NotificationItem = { id, message, isError, timeout };

  if (addNotification) {
    addNotification(notification);
  } else {
    pendingQueue.push(notification);
  }
};
