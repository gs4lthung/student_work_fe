"use client";

import { getWalletByUserId } from "@/api/wallet-api";
import { useUserStore } from "@/stores/user-store";
import { useEffect } from "react";

export default function CheckWallet() {
  const { user } = useUserStore();

  useEffect(() => {
    async function fetchWallet() {
      if (!window || !user || user.role === "Student") return;

      try {
        console.log("check wallet");
        const wallet = await getWalletByUserId(user.userId!);
        if (wallet) {
          useUserStore.getState().setUser({
            ...user,
            walletID: wallet.walletID,
            walletBalance: wallet.balance,
          });
        }
      } catch (error) {
        console.error("Failed to fetch wallet:", error);
      }
    }
    fetchWallet();
  }, [user]);
  return null;
}
