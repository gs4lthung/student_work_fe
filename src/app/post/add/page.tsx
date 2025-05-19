import type React from "react";
import { Check, Circle, Hexagon, Square, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    label: "Cơ bản",
    value: "standard",
    icon: <Circle className="h-8 w-8 text-blue-500 dark:text-blue-400" />,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    accentColor: "text-blue-600 dark:text-blue-400",
    price: "600.000đ",
    tagline: "Dành cho nhà tuyển dụng cá nhân",
    descriptions: [
      "Hiển thị tin tuyển dụng 14 ngày.",
      "Tiếp cận tối đa 100 hồ sơ ứng viên.",
      "Được làm mới 3 lần/tuần.",
    ],
    buttonClass:
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-500",
  },
  {
    label: "Nâng cao",
    value: "premium",
    icon: <Triangle className="h-8 w-8 text-green-500 dark:text-green-400" />,
    iconBg: "bg-green-100 dark:bg-green-950",
    accentColor: "text-green-600 dark:text-green-400",
    price: "1.000.000đ",
    popular: true,
    tagline: "Lựa chọn phổ biến nhất",
    descriptions: [
      "Hiển thị 30 ngày, tin được ưu tiên trên danh sách.",
      "Tiếp cận không giới hạn hồ sơ. ",
      "Được làm mới mỗi ngày.",
      "Nhận báo cáo hiệu suất tin tuyển dụng.",
    ],
    buttonClass:
      "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-500",
    ribbonClass: "bg-green-600 dark:bg-green-500",
  },
  {
    label: "Nổi bật",
    value: "featured",
    icon: <Square className="h-8 w-8 text-purple-500 dark:text-purple-400" />,
    iconBg: "bg-purple-100 dark:bg-purple-950",
    accentColor: "text-purple-600 dark:text-purple-400",
    price: "2.000.000đ",
    tagline: "Dành cho doanh nghiệp vừa",
    descriptions: [
      'Hiển thị trên mục "Việc làm nổi bật".',
      "Làm mới mỗi giờ.",
      "Được làm mới mỗi ngày.",
      "Nhận hỗ trợ cá nhân từ đội ngũ tuyển dụng.",
    ],
    buttonClass:
      "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 dark:from-purple-600 dark:to-purple-500",
  },
  {
    label: "Doanh nghiệp",
    value: "kimcuong",
    icon: <Hexagon className="h-8 w-8 text-cyan-500 dark:text-cyan-400" />,
    iconBg: "bg-cyan-100 dark:bg-cyan-950",
    accentColor: "text-cyan-600 dark:text-cyan-400",
    price: "3.500.000đ",
    tagline: "Giải pháp toàn diện",
    descriptions: [
      "Quản lý tuyển dụng toàn diện.",
      "Đăng không giới hạn số lượng tin tuyển dụng.",
      "Hỗ trợ phân tích dữ liệu tuyển dụng.",
      "Dịch vụ tìm kiếm ứng viên cao cấp (headhunting).",
    ],
    buttonClass:
      "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 dark:from-cyan-600 dark:to-cyan-500",
  },
];

type Service = {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  accentColor: string;
  price: string;
  popular?: boolean;
  tagline: string;
  descriptions: string[];
  buttonClass: string;
  ribbonClass?: string;
};

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card
      className={cn(
        "relative h-full flex flex-col overflow-hidden transition-all duration-300",
        service.popular
          ? "shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.2)] border-green-500 dark:border-green-500"
          : "hover:shadow-md border-gray-200 dark:border-gray-800"
      )}
    >
         {service.popular && (
        <div className="absolute -right-12 top-6 rotate-45 bg-green-500 text-white py-1 w-40 text-center text-sm font-semibold shadow-md z-10">
          Phổ biến
        </div>
      )}
      <CardHeader className="pt-2 text-center">
        <div className="flex justify-center mb-4">
          <div
            className={cn(
              "rounded-full p-3 flex items-center justify-center",
              service.iconBg
            )}
          >
            {service.icon}
          </div>
        </div>
        <h3 className={cn("text-lg font-bold mb-1", service.accentColor)}>
          {service.label}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {service.tagline}
        </p>
        <div className="text-3xl font-bold">{service.price}</div>
      </CardHeader>
      <CardContent className="flex-1 pt-6">
        <ul className="space-y-4">
          {service.descriptions.map((desc: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <Check
                className={cn(
                  "h-5 w-5 mt-0.5 flex-shrink-0",
                  service.accentColor
                )}
              />
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-2 pb-2">
        <Button
          className={cn(
            "w-full py-6 font-medium text-white transition-all duration-300 hover:shadow-lg hover:opacity-90",
            service.buttonClass
          )}
        >
          Chọn dịch vụ
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function AddNewPostPage() {
  return (
    <div className="bg-gray-50 dark:bg-[#0A0F1C] text-gray-900 dark:text-white py-16 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
