"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PaymentInterface } from "@/interfaces/payment-interface";
import { useSubscriptionStore } from "@/stores/subscription-store";
import { useUserStore } from "@/stores/user-store";
import { Form, Formik } from "formik";
import React from "react";
import { Wallet, Shield } from "lucide-react";
import { createPayment } from "@/api/payment-api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { CreatePaymentSchema } from "@/validations/payment-validation";

export default function PaymentPage() {
  const { user } = useUserStore();
  const { subscriptions } = useSubscriptionStore();

  const initialValues = React.useMemo<PaymentInterface>(() => {
    return {
      amount: 0,
      description: "",
      subscriptionName: "",
      transactionType: "PAYMENT_JOB_POST",
      walletID: user?.walletID || 0,
      buyerName: (user?.firstName ?? "") + " " + (user?.lastName ?? ""),
    };
  }, [user]);

  if (!user || !subscriptions) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Đang tải thông tin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full mb-4">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Nạp tiền vào ví{" "}
            <span className="text-green-500 dark:text-green-400">SPOINT</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Nạp tiền để sử dụng dịch vụ đăng tin
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Payment Form */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                Thông tin thanh toán
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Nhập số tiền bạn muốn nạp vào ví
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={initialValues}
                validationSchema={CreatePaymentSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    console.log("Submitting payment with values:", values);
                    setSubmitting(true);
                    const response = await createPayment(values);
                    if (response) {
                      toast.success(
                        "Đang chuyển hướng đến cổng thanh toán. Vui lòng đợi..."
                      );
                      setTimeout(() => {
                        window.location.href = response.data;
                        resetForm();
                      }, 2000);
                    }
                  } catch (error) {
                    if (error instanceof AxiosError) {
                      toast.error(
                        "Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau."
                      );
                    }
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                }) => {
                  return (
                    <Form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        {initialValues.subscriptionName}
                        <Label
                          htmlFor="amount"
                          className="text-base font-medium text-gray-700 dark:text-gray-300"
                        >
                          Số tiền nạp (SPOINT)
                        </Label>
                        <div className="relative">
                          <Input
                            id="amount"
                            name="amount"
                            type="number"
                            min={0}
                            max={1000000}
                            step={1000}
                            placeholder="Nhập số tiền"
                            value={values.amount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="h-12 text-lg pr-20 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                          />
                          <Badge className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900">
                            SPOINT
                          </Badge>
                        </div>
                        {errors.amount && touched.amount && (
                          <p className="text-red-500 dark:text-red-400 text-sm">
                            {errors.amount}
                          </p>
                        )}
                      </div>

                      {/* Quick Amount Options */}
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600 dark:text-gray-400">
                          Chọn gói nạp tiền 🔻
                        </Label>
                        <div className="grid grid-cols-4 gap-2">
                          {subscriptions.map((subscription) => (
                            <Button
                              key={subscription.subscriptionID}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                values.subscriptionName =
                                  subscription.subscriptionName;
                                values.description = `Nạp tiền cho gói ${subscription.subscriptionName}`;
                                handleChange({
                                  target: {
                                    name: "amount",
                                    value: subscription.price,
                                  },
                                });
                              }}
                              className="border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600 dark:bg-gray-700"
                            >
                              {subscription.price.toLocaleString()}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white"
                      >
                        {isSubmitting ? <LoadingSpinner /> : "Nạp tiền"}
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </CardContent>
          </Card>

          {/* Information Cards */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 grid md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                <Wallet className="w-5 h-5 text-green-500 dark:text-green-400" />
                Ví của bạn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Số dư:</span>
                <span className="font-mono text-sm text-gray-900 dark:text-white">
                  {user?.walletBalance?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-100 dark:border-green-800">
                Tiền sẽ được nạp vào ví ngay sau khi thanh toán thành công
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">
                    Thanh toán an toàn
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Giao dịch được mã hóa và bảo mật. Chúng tôi không lưu trữ
                    thông tin thanh toán của bạn.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
