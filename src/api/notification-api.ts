import api from "@/config/axios-config";

export const getUnreadNotifications = async () => {
  const url = `/api/Notification/unread-count`;
  const response = await api.get(url, {
    requiresAuth: true,
  });

  return response.data;
};
