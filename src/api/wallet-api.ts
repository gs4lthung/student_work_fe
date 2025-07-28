import api from "@/config/axios-config";

export const getWalletByUserId = async (userId: string) => {
  const url = `/api/Wallets/user/${userId}`;
  const res = await api.get(url, {
    requiresAuth: true,
  });

  if (res) {
    console.log("getWalletByUserId res", res.data);
    return res.data;
  }
};

export const getWalletTransactionsByWalletId = async (walletId: number) => {
  const url = `/api/WalletTransactions/wallet/${walletId}`;
  const res = await api.get(url, {
    requiresAuth: true,
  });

  if (res) {
    console.log("getWalletTransactionsByWalletId res", res.data);
    return res.data;
  }
};
