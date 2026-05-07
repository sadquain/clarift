export type NotificationItem = {
  id: string;
  type: "comment" | "reaction" | "follow" | "newsletter" | "system";
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

const notifications = new Map<string, NotificationItem[]>();

export const notificationService = {
  list(userId: string) {
    return notifications.get(userId) ?? [];
  },
  push(userId: string, item: Omit<NotificationItem, "id" | "createdAt" | "read">) {
    const record: NotificationItem = {
      ...item,
      id: crypto.randomUUID(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    notifications.set(userId, [record, ...(notifications.get(userId) ?? [])]);
    return record;
  },
  markRead(userId: string, id: string) {
    const list = notifications.get(userId) ?? [];
    const item = list.find((entry) => entry.id === id);
    if (item) item.read = true;
    return item ?? null;
  },
};
