import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2 } from "@/components/ui/typography";
import React from "react";

const AccountTab = () => {
  return (
    <div className="grid grid-cols-8 gap-8">
      <div className="col-span-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">
          Thông tin đăng nhập
        </h2>
        <div className="flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={"swork@gmail.com"}
            readOnly
          />
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            placeholder="Mật khẩu"
            value={"password"}
            disabled
          />
          <Button variant={"outline"} className="w-1/3">
            Thay đổi mật khẩu
          </Button>
        </div>
        <Separator className="my-4" />
        <h2 className="text-lg font-semibold mb-4 text-gray-600">
          Thông tin liên hệ
        </h2>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            id="name"
            type="text"
            placeholder="Họ và tên"
            value={"Lam Tien Hung"}
            readOnly
          />
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            type="text"
            placeholder="Số điện thoại"
            value={"0987654321"}
            readOnly
          />
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            type="text"
            placeholder="Địa chỉ"
            value={"TP. Hồ Chí Minh"}
            readOnly
          />
          <Button className="w-1/3">Chỉnh sửa thông tin</Button>
        </div>
      </div>
      <div className="col-span-3 flex flex-col gap-2 items-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">
          Ảnh đại diện
        </h2>
        <Avatar className="w-24 h-24">
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>
        <Button className="w-1/3">Chỉnh sửa ảnh</Button>
      </div>
    </div>
  );
};

const CompanyTab = () => {
  return (
    <div className="grid grid-cols-8 gap-8">
      <div className="col-span-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">
          Thông tin công ty
        </h2>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name">Tên công ty</Label>
          <Input
            id="name"
            type="text"
            placeholder="Tên công ty"
            value={"Student Work"}
            readOnly
          />
          <Label htmlFor="taxId">Mã số thuế</Label>
          <Input
            id="taxId"
            type="text"
            placeholder="Mã số thuế"
            value={"123456789"}
            readOnly
          />
          <Label htmlFor="size">Quy mô</Label>
          <Select value="medium" disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Quy mô" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Nhỏ</SelectItem>
              <SelectItem value="medium">Trung bình</SelectItem>
              <SelectItem value="large">Lớn</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            type="text"
            placeholder="Địa chỉ"
            value={"TP. Hồ Chí Minh"}
            readOnly
          />
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={"swork@gmail.com"}
            readOnly
          />
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            type="text"
            placeholder="Số điện thoại"
            value={"0987654321"}
            readOnly
          />
        </div>
      </div>
      <div className="col-span-3 flex flex-col gap-2 items-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">Trạng thái</h2>
        <Badge className="bg-green-500 text-white">Đã xác thực</Badge>
      </div>
    </div>
  );
};

const tabItems = [
  {
    title: "Thông tin tài khoản",
    value: "account",
    render: <AccountTab />,
  },
  {
    title: "Thông tin công ty",
    value: "company",
    render: <CompanyTab />,
  },
];

export default async function DashBoard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <TypographyH2 className="">Lam Tien Hung</TypographyH2>
        <Badge className="bg-green-500 text-white">HR</Badge>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="data-[state=active]:bg-green-300"
              value={tab.value}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabItems.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.render}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
