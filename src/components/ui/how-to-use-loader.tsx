"use client";

import React from "react";
import { MultiStepLoader } from "./multi-step-loader";
import { Button } from "./button";
import { X } from "lucide-react";

const loadingStates = [
  {
    text: "Tạo tài khoản ứng viên",
  },
  {
    text: "Cập nhật hồ sơ cá nhân",
  },
  {
    text: "Tìm kiếm công việc phù hợp",
  },
  {
    text: "Nộp hồ sơ ứng tuyển",
  },
  {
    text: "Theo dõi trạng thái ứng tuyển",
  },
  {
    text: "Đi làm ngay thôi ❤️",
  },
];
export default function HowToUseLoader() {
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
      />
      <Button variant="outline" onClick={() => setLoading((prev) => !prev)}>
        Hướng dẫn
      </Button>

      {loading && (
        <Button
          className="fixed top-4 right-4 z-[120]"
          onClick={() => setLoading(false)}
        >
          <X className="h-10 w-10" />
        </Button>
      )}
    </>
  );
}
