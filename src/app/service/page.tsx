import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH2 } from "@/components/ui/typography";
import React from "react";

const services = [
  {
    label: "Standard",
    value: "standard",
    color: "#A1887F",
    price: "600.000đ",
    descriptions: [
      "Hiển thị tin tuyển dụng 14 ngày.",
      "Tiếp cận tối đa 100 hồ sơ ứng viên.",
      "Được làm mới 3 lần/tuần.",
    ],
  },
  {
    label: "Premium",
    value: "premium",
    color: "#FFD700",
    price: "1.000.000đ",
    descriptions: [
      "Hiển thị 30 ngày, tin được ưu tiên trên danh sách.",
      "Tiếp cận không giới hạn hồ sơ. ",
      "Được làm mới mỗi ngày.",
      "Nhận báo cáo hiệu suất tin tuyển dụng.",
    ],
  },
  {
    label: "Featured",
    value: "featured",
    color: "#3F7D58",
    price: "2.000.000đ",
    descriptions: [
      'Hiển thị trên mục "Việc làm nổi bật".',
      "Làm mới mỗi giờ.",
      "Được làm mới mỗi ngày.",
      "Nhận hỗ trợ cá nhân từ đội ngũ tuyển dụng.",
    ],
  },
  {
    label: "Enterprise",
    value: "kimcuong",
    color: "#00BFFF",
    price: "3.500.000đ",
    descriptions: [
      "Quản lý tuyển dụng toàn diện.",
      "Đăng không giới hạn số lượng tin tuyển dụng.",
      "Hỗ trợ phân tích dữ liệu tuyển dụng.",
      "Dịch vụ tìm kiếm ứng viên cao cấp (headhunting).",
    ],
  },
];

const ServiceCard = ({ service }) => {
  return (
    <Card className="w-1/4 h-[400px] flex flex-col gap-2 p-4 border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle
          className="text-xl font-bold"
          style={{ color: service.color }}
        >
          {service.label}
        </CardTitle>
        <CardDescription className="text-lg font-semibold">
          {service.price}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 h-full">
        <ul className="list-disc list-inside">
          {service.descriptions.map((desc: string, index: number) => (
            <li key={index} className="text-gray-700">
              {desc}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Chọn dịch vụ
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function ServicePage() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <TypographyH2 className="mb-4">Danh sách dịch vụ</TypographyH2>
      <div className="flex flex-row gap-2 p-4">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
}
