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
import { useDraftJobPostStore } from "@/stores/job-store";
import { useSubscriptionStore } from "@/stores/subscription-store";
import { useUserStore } from "@/stores/user-store";
import { Form, Formik } from "formik";
import React from "react";
import { Wallet, Shield, Info } from "lucide-react";
import { createPayment } from "@/api/payment-api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function PaymentPage() {
  const { user } = useUserStore();
  const { subscriptions } = useSubscriptionStore();
  const { data } = useDraftJobPostStore();

  const initialValues = React.useMemo<PaymentInterface>(() => {
    const subscription = subscriptions.find(
      (sub) => String(sub.subscriptionID) === String(data?.subscriptionID)
    );
    return {
      amount: subscription?.price || 0,
      description: `Nạp tiền vào ví SPOINT cho gói ${
        subscription?.subscriptionName || ""
      }`,
      subscriptionName: subscription?.subscriptionName || "",
      transactionType: "PAYMENT_JOB_POST",
      walletId: user?.walletID || 0,
      buyerName: "",
    };
  }, [user, subscriptions, data]);

  const subscription = subscriptions.find(
    (sub) => String(sub.subscriptionID) === String(data?.subscriptionID)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-4">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nạp tiền vào ví <span className="text-green-500">SPOINT</span>
          </h1>
          <p className="text-gray-600">Nạp tiền để sử dụng dịch vụ đăng tin</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Payment Form */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Thông tin thanh toán
              </CardTitle>
              <CardDescription>
                Nhập số tiền bạn muốn nạp vào ví
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
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
                          className="text-base font-medium text-gray-700"
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
                            className="h-12 text-lg pr-20 focus:border-green-500 focus:ring-green-500"
                          />
                          <Badge className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-100 text-green-700 hover:bg-green-100">
                            SPOINT
                          </Badge>
                        </div>
                        {errors.amount && touched.amount && (
                          <p className="text-red-500 text-sm">
                            {errors.amount}
                          </p>
                        )}
                      </div>

                      {/* Quick Amount Options */}
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600">
                          Số tiền gợi ý
                        </Label>
                        <div className="grid grid-cols-4 gap-2">
                          {[10000, 50000, 100000, 500000].map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleChange({
                                  target: { name: "amount", value: amount },
                                })
                              }
                              className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                            >
                              {amount.toLocaleString()}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-green-500 hover:bg-green-600 text-white"
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
          <div className="grid md:grid-cols-2 gap-4">
            {/* Subscription Info */}
            {subscription && (
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="w-5 h-5 text-green-500" />
                    Thông tin gói
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tên gói:</span>
                    <span className="font-medium">
                      {subscription.subscriptionName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá:</span>
                    <span className="font-semibold text-green-600">
                      {subscription.price?.toLocaleString()} SPOINT
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Wallet Info */}
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-green-500" />
                  Ví của bạn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Số dư:</span>
                  <span className="font-mono text-sm">
                    {user?.walletBalance?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="text-sm text-gray-500 bg-green-50 p-3 rounded border border-green-100">
                  Tiền sẽ được nạp vào ví ngay sau khi thanh toán thành công
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Notice */}
          <Card className="border border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-800 mb-1">
                    Thanh toán an toàn
                  </h3>
                  <p className="text-sm text-green-700">
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
