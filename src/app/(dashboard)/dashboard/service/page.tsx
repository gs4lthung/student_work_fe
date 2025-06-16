'use client'

import { getSubscriptions } from "@/api/subscription-api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH2 } from "@/components/ui/typography";
import { colorConst } from "@/const/color-const";
import { useSubscriptionStore } from "@/stores/subscription-store";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";


export default function DashboardService() {
  const { subscriptions } = useSubscriptionStore();
  useEffect(() => {
    async function fetchSubscriptions() {
      if (!subscriptions || subscriptions.length === 0) {
        await getSubscriptions();
      }
    }
    fetchSubscriptions();
  }, [subscriptions]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <TypographyH2 className="">Danh sách</TypographyH2>
        <Button variant={"outline"} className={colorConst.createBtnHoverColor}>
          <Plus />
        </Button>
      </div>
      <Table>
        <TableCaption>Danh sách dịch vụ</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">ID</TableHead>
            <TableHead className="w-2/12">Tên dịch vụ</TableHead>
            <TableHead className="w-2/12">Giá</TableHead>
            <TableHead className="w-5/12">Mô tả</TableHead>
            <TableHead className="w-2/12">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions?.map((service, index) => (
            <TableRow key={index}>
              <TableCell className="font-semibold">{index + 1}</TableCell>
              <TableCell>{service.subscriptionName}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>
                {service.description.split(".").map((des, index) => (
                  <p key={index} className="text-sm mb-2">
                    {des}
                  </p>
                ))}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant={"outline"}>
                  <Eye />
                </Button>
                <Button
                  variant={"outline"}
                  className={colorConst.updateBtnHoverColor}
                >
                  <Pencil />
                </Button>
                <Button
                  variant={"outline"}
                  className={colorConst.deleteBtnHoverColor}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
