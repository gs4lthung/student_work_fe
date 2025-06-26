import { NotificationInterface } from "@/interfaces/notification-interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationStore = Pick<
  NotificationInterface,
  "notificationID" | "userID" | "message" | "isRead" | "createdAt" | "title"
>;

interface NotificationState {
  notifications: NotificationStore[];
  setNotifications: (notifications: NotificationStore[]) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      setNotifications: (notifications) => set({ notifications }),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "notification-storage",
    }
  )
);
