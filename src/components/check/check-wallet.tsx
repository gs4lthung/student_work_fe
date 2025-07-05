"use client";

import { getWalletByUserId } from "@/api/wallet-api";
import { useUserStore } from "@/stores/user-store";
import React, { useEffect } from "react";

export default function CheckWallet() {
  const { user } = useUserStore();
  const [isChecked, setIsChecked] = React.useState(false);

  useEffect(() => {
    if (!user?.userId || isChecked || user.role === "Student") return;

    const fetchWallet = async () => {
      try {
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
      } finally {
        setIsChecked(true); // make sure this is always set
      }
    };

    fetchWallet();
  }, [user?.userId, isChecked]);

  return null;
}
