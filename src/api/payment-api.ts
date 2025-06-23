import api from "@/config/axios-config";
import { PaymentInterface } from "@/interfaces/payment-interface";

export const createPayment = async (data: PaymentInterface) => {
  const url = `/api/Payment/payos/link-payment`;
  const response = await api.post(url, data, {
    requiresAuth: true,
  });

  return response
};
