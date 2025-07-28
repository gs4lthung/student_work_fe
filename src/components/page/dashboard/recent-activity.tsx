"use client";

import { getWalletTransactionsByWalletId } from "@/api/wallet-api";
import CheckWallet from "@/components/check/check-wallet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletTransactionInterface } from "@/interfaces/wallet-interface";
import { useUserStore } from "@/stores/user-store";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RecentActivityProps {
  className?: string;
}

export function RecentActivity({ className }: RecentActivityProps) {

  const [walletTransactions, setWalletTransactions] = useState<
    WalletTransactionInterface[]
  >([]);
  const { user } = useUserStore();
  useEffect(() => {
    async function fetchTransactions() {
      if (!user?.walletID) {
        return;
      }
      const response = await getWalletTransactionsByWalletId(user.walletID);
      if (response) {
        setWalletTransactions(response);
      }
    }
    fetchTransactions();
  }, [user?.walletID]);

  return (
    <Card className={className}>
      <CheckWallet />
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
        <CardDescription>
          Theo dõi hoạt động gần đây của bạn trên nền tảng
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {walletTransactions.map((transaction) => (
            <div
              key={transaction.transactionID}
              className="flex items-start gap-4"
            >
              <div className="relative mt-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{transaction.orderCode}</p>
                  <p className="text-xs text-muted-foreground">
                    {(() => {
                      const createdAtDate = new Date(transaction.createdAt);
                      return (
                        <>
                          {createdAtDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          {createdAtDate.getTime() > Date.now() - 86400000 ? (
                            <span>Hôm nay</span>
                          ) : (
                            <span>{createdAtDate.toLocaleDateString()}</span>
                          )}
                        </>
                      );
                    })()}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {transaction.description}
                </p>
                <p className="text-sm font-medium">
                  {transaction.amount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <span className="text-xs text-muted-foreground">
                  {transaction.transactionType === "SUCCESS"
                    ? "Thành công"
                    : "Rút tiền"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href="/dashboard/recent-activity">
          <Button variant="link" className="w-full text-sm">
            Xem tất cả hoạt động
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
