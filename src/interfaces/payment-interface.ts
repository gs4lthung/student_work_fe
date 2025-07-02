export interface PaymentInterface {
  walletID: number;
  amount: number;
  subscriptionName: string;
  transactionType: "PAYMENT_JOB_POST";
  description: string;
  buyerName: string;
}
