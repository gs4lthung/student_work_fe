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
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";

const services = [
  {
    label: "Standard",
    value: "standard",
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
    price: "3.500.000đ",
    descriptions: [
      "Quản lý tuyển dụng toàn diện.",
      "Đăng không giới hạn số lượng tin tuyển dụng.",
      "Hỗ trợ phân tích dữ liệu tuyển dụng.",
      "Dịch vụ tìm kiếm ứng viên cao cấp (headhunting).",
    ],
  },
];

export default function DashboardService() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <TypographyH2 className="">Danh sách</TypographyH2>
        <Button variant={"outline"} className="hover:bg-green-300">
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
          {services.map((service, index) => (
            <TableRow
              key={index}
            >
              <TableCell className="font-semibold">
                {index + 1}
              </TableCell>
              <TableCell>{service.label}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>
                {service.descriptions.map((des, index) => (
                  <p key={index} className="text-sm mb-2">
                    {des}
                  </p>
                ))}
              </TableCell>
              <TableCell className="flex gap-2">
              <Button variant={"outline"}>
                  <Eye />
                </Button>
                <Button variant={"outline"} className="hover:bg-blue-500">
                  <Pencil />
                </Button>
                <Button variant={"outline"} className="hover:bg-red-500">
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
