"use client";

import type React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSubscriptionStore } from "@/stores/subscription-store";
import { useEffect } from "react";
import { getSubscriptions } from "@/api/subscription-api";
import { SubscriptionInterface } from "@/interfaces/subscription-interface";

const ServiceCard = ({
  subscription,
}: {
  subscription: SubscriptionInterface;
}) => {
  return (
    <Card
      className={cn(
        "relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md border-gray-200 dark:border-gray-800"
      )}
    >
      <CardHeader className="pt-2 text-center">
        <div className="flex justify-center mb-4">
          <div
            className={cn(
              "rounded-full p-3 flex items-center justify-center bg-green-500 dark:bg-green-800"
            )}
          >
            <Check className="h-6 w-6" />
          </div>
        </div>
        <h3 className="text-lg font-bold mb-1">
          {subscription.subscriptionName}
        </h3>
        <div className="text-3xl font-bold">
          {subscription.price.toLocaleString("vi-VN")}₫
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Thời hạn: {subscription.durationDays} ngày
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-6">
        {subscription.description.split(".").length > 1 ? (
          <ul className="space-y-2">
            {subscription.description.split(".").map((des, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-500" />
                <span>{des.trim()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {subscription.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-2">
        <Button
          className={cn(
            "w-full py-6 font-medium text-white bg-green-500 hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:opacity-90"
          )}
        >
          Chọn dịch vụ
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function AddNewJobPage() {
  const { subscriptions } = useSubscriptionStore();
  useEffect(() => {
    async function fetchSubscriptions() {
      if (!subscriptions || subscriptions.length === 0) {
        console.log("Fetching subscriptions...");
        await getSubscriptions();
      }
    }
    fetchSubscriptions();
  }, [subscriptions]);
  return (
    <div className="bg-gray-50 dark:bg-[#0A0F1C] text-gray-900 dark:text-white py-16 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptions?.map((subscription, index) => (
            <ServiceCard key={index} subscription={subscription} />
          ))}
        </div>
      </div>
    </div>
  );
}
