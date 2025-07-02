import * as Yup from "yup";
import type { PaymentInterface } from "@/interfaces/payment-interface";

export const CreatePaymentSchema: Yup.ObjectSchema<PaymentInterface> =
  Yup.object({
    walletID: Yup.number().required("Wallet ID is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be a positive number")
      .min(1, "Amount must be at least 1"),
    subscriptionName: Yup.string()
      .required("Subscription name is required")
      .min(3, "Subscription name must be at least 3 characters long"),
    transactionType: Yup.string()
      .oneOf(["PAYMENT_JOB_POST"], "Invalid transaction type")
      .required("Transaction type is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters long")
      .required("Description is required"),
    buyerName: Yup.string()
      .min(3, "Buyer name must be at least 3 characters long")
      .required("Buyer name is required"),
  });
