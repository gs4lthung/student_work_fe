import api from "@/config/axios-config";

export const getSubscriptions = async () => {
  const url = "/api/Subscription";
  const response = await api.get(url);
  if (response.status === 200) {
    return response.data;
  }
};
