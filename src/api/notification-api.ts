import api from "@/config/axios-config";

export const getUnreadNotifications = async () => {
  const url = `/api/Notification/unread-count`;
  const response = await api.get(url, {
    requiresAuth: true,
  });

  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const url = `/api/Notification/mark-all-as-read`;
  const response = await api.post(
    url,
    {},
    {
      requiresAuth: true,
    }
  );

  return response.data;
};
