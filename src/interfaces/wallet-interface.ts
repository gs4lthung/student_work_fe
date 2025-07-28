export interface WalletTransactionInterface {
  transactionID: number;
  walletID: number;
  amount: number;
  transactionType: "SUCCESS";
  description: string;
  orderCode: number;
  createdAt: Date;
}
