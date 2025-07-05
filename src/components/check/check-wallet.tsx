"use client";

import { getWalletByUserId } from "@/api/wallet-api";
import { useUserStore } from "@/stores/user-store";
import React, { useEffect } from "react";

export default function CheckWallet() {
  const { user } = useUserStore();
  const [isChecked, setIsChecked] = React.useState(false);

  useEffect(() => {
    async function fetchWallet() {
      if (!user || isChecked || user.role === "Student") return;

      try {
        console.log("check wallet");
        const wallet = await getWalletByUserId(user.userId!);
        if (wallet) {
          console.log("wallet", wallet);
          useUserStore.getState().setUser({
            ...user,
            walletID: wallet.walletID,
            walletBalance: wallet.balance,
          });
          setIsChecked(true); 
        }
      } catch (error) {
        console.error("Failed to fetch wallet:", error);
      }
    }
    fetchWallet();
  }, [user, isChecked]);
  return null;
}
