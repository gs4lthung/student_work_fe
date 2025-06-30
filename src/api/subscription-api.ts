import api from "@/config/axios-config";
import { useSubscriptionStore } from "@/stores/subscription-store";

export const getSubscriptions = async () => {
  const url = "/api/Subscription";
  const response = await api.get(url);
  if (response.status === 200) {
    console.log("Subscriptions fetched successfully:", response.data);
    useSubscriptionStore.getState().setSubscriptions(response.data);
    return response.data;
  }
};
