"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Copy,
  CheckCircle,
  AlertCircle,
  BanknoteIcon as Bank,
  CreditCard,
  FileText,
  RefreshCw,
  Headset,
  HandCoins,
  Download,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

export default function PaymentPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success(`${field} đã được sao chép vào clipboard`, {
      description: `Bạn có thể dán ${field} vào ứng dụng ngân hàng của mình.`,
      duration: 2000,
    });

    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  const paymentInfo = {
    accountHolder: "LAM TIEN HUNG",
    accountNumber: "970422",
    transferContent: "NAP13853SW",
    bank: "Ngân hàng TMCP Phương Đông (OCB)",
    exchangeRate: "1.000 VNĐ = 1 SPoint",
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Thanh toán để nạp{" "}
          <span className="text-green-600 dark:text-green-500">SPoint</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Vui lòng hoàn tất thanh toán để nạp điểm vào tài khoản của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="col-span-1 lg:col-span-3 border-gray-200 dark:border-gray-800 shadow-md">
          <CardHeader className="border-b border-gray-200 dark:border-gray-800">
            <CardTitle className="flex items-center gap-2">
              <Bank className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              Thông tin chuyển khoản
            </CardTitle>
            <CardDescription>
              Vui lòng chuyển khoản theo thông tin dưới đây
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Chủ tài khoản:
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {paymentInfo.accountHolder}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      copyToClipboard(
                        paymentInfo.accountHolder,
                        "Chủ tài khoản"
                      )
                    }
                  >
                    {copied === "Chủ tài khoản" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bank className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Số tài khoản:
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {paymentInfo.accountNumber}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      copyToClipboard(paymentInfo.accountNumber, "Số tài khoản")
                    }
                  >
                    {copied === "Số tài khoản" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Nội dung chuyển khoản:
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="font-mono text-gray-800 dark:text-gray-100 px-3 py-1"
                  >
                    {paymentInfo.transferContent}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      copyToClipboard(
                        paymentInfo.transferContent,
                        "Nội dung chuyển khoản"
                      )
                    }
                  >
                    {copied === "Nội dung chuyển khoản" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bank className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Ngân hàng:
                  </span>
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {paymentInfo.bank}
                </span>
              </div>
            </div>

            <Alert className="mt-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <RefreshCw className="h-4 w-4 text-green-600 dark:text-green-500" />
              <AlertTitle className="text-green-800 dark:text-green-500">
                Quy đổi mệnh giá
              </AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400 font-semibold">
                {paymentInfo.exchangeRate}
              </AlertDescription>
            </Alert>

            <Alert className="mt-2 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-500" />
              <AlertTitle className="text-red-800 dark:text-red-500">
                Lưu ý quan trọng
              </AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-400">
                Vui lòng chuyển khoản đúng nội dung để hệ thống tự động nạp!.
                Nếu chuyển khoản sai nội dung, vui lòng liên hệ với admin để
                được hỗ trợ.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="border-t border-gray-200 dark:border-gray-800 flex justify-between">
            <Button variant="outline">
              Liên hệ hỗ trợ
              <Headset />
            </Button>
            <Button variant="default">
              Đã thanh toán
              <HandCoins />
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1 lg:col-span-2 border-gray-200 dark:border-gray-800 shadow-md">
          <CardHeader className="border-b border-gray-200 dark:border-gray-800">
            <CardTitle className="flex items-center gap-2">
              <ScanLine className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              Quét mã QR để thanh toán
            </CardTitle>
            <CardDescription>
              Sử dụng ứng dụng ngân hàng để quét mã QR
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="p-4 rounded-lg shadow-sm mb-4">
              <Image
                src="https://api.vietqr.io/image/970422-fuoverflowbank-x4DKMtC.jpg?accountName=NGUYEN%20THI%20KIM%20CHI&addInfo=NAP13853FUO"
                alt="QR Code thanh toán"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
              Mã QR có chứa đầy đủ thông tin chuyển khoản
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
            <Button variant="outline" className="w-full">
              Tải mã QR
              <Download />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Hệ thống sẽ tự động cập nhật SPoint sau khi nhận được thanh toán của bạn
        (thông thường trong vòng 1-5 phút)
      </div>
    </div>
  );
}
