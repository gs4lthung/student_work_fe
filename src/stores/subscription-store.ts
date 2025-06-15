import { SubscriptionInterface } from "@/interfaces/subscription-interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SubscriptionStore = Pick<
  SubscriptionInterface,
  | "subscriptionID"
  | "subscriptionName"
  | "description"
  | "price"
  | "durationDays"
>;
interface SubscriptionState {
  subscriptions: SubscriptionStore[];
  setSubscriptions: (subscriptions: SubscriptionStore[]) => void;
  clearSubscriptions: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      subscriptions: [],
      setSubscriptions: (subscriptions) => set({ subscriptions }),
      clearSubscriptions: () => set({ subscriptions: [] }),
    }),
    {
      name: "subscription-storage",
    }
  )
);
