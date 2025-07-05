"use client";

import { getWalletByUserId } from "@/api/wallet-api";
import { useUserStore } from "@/stores/user-store";
import React, { useEffect } from "react";

export default function CheckWallet() {
  const { user } = useUserStore();
  const [isChecked, setIsChecked] = React.useState(false);
  const [hasHydrated, setHasHydrated] = React.useState(false);

  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) {
      setHasHydrated(true);
    } else {
      const unsub = useUserStore.persist.onHydrate?.(() => {
        setHasHydrated(true);
      });
      return unsub;
    }
  }, []);

  useEffect(() => {
    async function fetchWallet() {
      if (
        typeof window === "undefined" ||
        !user ||
        isChecked ||
        user.role === "Student"
      )
        return;

      try {
        console.log("check wallet");
        const wallet = await getWalletByUserId(user.userId!);
        if (wallet) {
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
  }, [user, isChecked, hasHydrated]);
  return null;
}
