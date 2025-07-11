"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./breadcrumb";

const breadcrumbLabelMap: Record<string, string> = {
  dashboard: "Dashboard",
  profile: "Hồ sơ",
  settings: "Cài đặt",
  users: "Người dùng",
  post: "Tin đăng",
  service: "Dịch vụ",
  "my-cv": "CV của tôi",
  "saved-jobs": "Việc làm đã lưu",
  "applied-jobs": "Việc làm đã ứng tuyển",
  interview: "Phỏng vấn",
  // Add more mappings here
};

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList>
        <div className="flex items-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </div>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const label = breadcrumbLabelMap[segment] || segment;

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbItem>
                <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
              </BreadcrumbItem>
              {index < segments.length - 1 && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
